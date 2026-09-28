import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
async function walk(dir) { const result=[]; for(const entry of await readdir(dir,{withFileTypes:true})){ const file=path.join(dir,entry.name); if(entry.isDirectory()) result.push(...await walk(file)); else result.push(file); } return result; }
const files = await walk(root);
const pages = files.filter(f=>f.endsWith('.html'));
const contents = new Map(await Promise.all(pages.map(async f=>[f,await readFile(f,'utf8')])));

test('all four sites and three interior stories are built',()=>{
  for(const page of ['index.html','demos/bakery/index.html','demos/fitness/index.html','demos/interiors/index.html','demos/interiors/projects/the-city-residence/index.html','demos/interiors/projects/the-gathering-place/index.html','demos/interiors/projects/the-daily-ritual/index.html','thank-you/index.html','privacy/index.html']) assert.ok(contents.has(path.join(root,page)),page);
});
test('internal page and media references resolve in the deployment',async()=>{
  for(const [file,html] of contents){
    for(const match of html.matchAll(/(?:href|src)="([^"\s]+)"/g)){
      const value=match[1];if(!value.startsWith('/')||value.startsWith('//'))continue;
      const url=new URL(value,'https://example.test');
      let dest=path.join(root,decodeURIComponent(url.pathname));
      if(url.pathname.endsWith('/'))dest=path.join(dest,'index.html');
      assert.ok(await stat(dest).catch(()=>false),`${path.relative(root,file)} -> ${value}`);
      if(url.hash && dest.endsWith('.html')) assert.match(contents.get(dest)||'',new RegExp(`id="${url.hash.slice(1)}"`),value);
    }
    const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,`Duplicate IDs: ${file}`);
    for(const m of html.matchAll(/href="#([^"]*)"/g)){assert.ok(m[1],`Placeholder link: ${file}`);assert.ok(ids.includes(m[1]),`Missing #${m[1]} in ${file}`);}
  }
});
test('fictional concepts are noindex and use non-transmitting demo forms',()=>{
  for(const [file,html] of contents){if(!file.includes(`${path.sep}demos${path.sep}`))continue;
    assert.match(html,/<meta name="robots" content="noindex, follow"/);assert.match(html,/fictional/i);
    for(const form of html.matchAll(/<form\b([^>]*)>/g)){assert.match(form[1],/data-demo-form/);assert.doesNotMatch(form[1],/action=/);}
    assert.doesNotMatch(html,/href="#"/);
  }
});
test('real enquiry keeps concept attribution and safe return URL',()=>{
  const html=contents.get(path.join(root,'index.html'));
  assert.match(html,/action="https:\/\/formsubmit.co\/info@violetmedia.org"/);
  assert.match(html,/name="concept"/);assert.match(html,/name="_next" value="https:\/\/web.violetmedia.org\/thank-you\/"/);
  assert.match(html,/id="email"[^>]*required/);assert.match(html,/id="message"[^>]*required/);
});
test('existing demo addresses have explicit permanent redirects',async()=>{
  const config=await readFile('netlify.toml','utf8');
  for(const slug of ['starter','standard','premium'])for(const ext of ['','.html'])assert.ok(config.includes(`from = "/demos/${slug}${ext}"`));
  assert.match(config,/publish = "dist"/);
});
test('responsive assets stay within image and video budgets',async()=>{
  const media=files.filter(f=>f.endsWith('.webp'));assert.equal(media.length,35, "17 photographs in two sizes plus the brand mark");
  for(const file of media){const size=(await stat(file)).size;assert.ok(size<500000,`${file} is ${size} bytes`);}
  const videos=files.filter(f=>f.endsWith('.mp4'));
  assert.deepEqual(videos.map(f=>path.basename(f)).sort(),['noir-hero-1080.mp4','noir-hero-720.mp4']);
  for(const file of videos) assert.ok((await stat(file)).size < (file.includes('720')?3000000:8000000),file);
  const html=contents.get(path.join(root,'demos/interiors/index.html'));
  const video=html.match(/<video\b[^>]*>/)?.[0];
  assert.ok(video);
  assert.match(video,/muted/);assert.match(video,/playsinline/);assert.match(video,/preload="none"/);
  assert.doesNotMatch(video,/\ssrc=/);
  for(const name of videos.map(f=>path.basename(f))) assert.ok(video.includes(`/media/${name}`));
  assert.match(video,/poster="\/media\/premium-portfolio-1-1280.webp"/);
});
