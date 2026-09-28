for (const hero of document.querySelectorAll('[data-motion-hero]')) {
  const video = hero.querySelector('video');
  const button = hero.querySelector('[data-film-toggle], .motion-toggle');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  let wantsPlayback = !reduceMotion.matches && !connection?.saveData;
  let inView = false;
  let failed = false;
  const label = () => {
    button.textContent = wantsPlayback ? 'Pause film Ⅱ' : 'Play film ▷';
    button.setAttribute('aria-label', wantsPlayback ? 'Pause architectural film' : 'Play architectural film');
  };
  const play = async () => {
    if (failed) return;
    if (!video.getAttribute('src')) {
      video.src = matchMedia('(max-width: 700px)').matches ? video.dataset.mobile : video.dataset.desktop;
      video.load();
    }
    video.muted = true;
    try { await video.play(); } catch (error) { if (error.name !== 'AbortError') wantsPlayback = false; label(); }
  };
  const sync = () => {
    if (wantsPlayback && inView && !document.hidden) play();
    else video.pause();
  };
  button.hidden = false;
  label();
  button.addEventListener('click', () => {
    wantsPlayback = !wantsPlayback;
    if (wantsPlayback) play(); else video.pause();
    label();
  });
  video.addEventListener('playing', () => { hero.classList.add('film-ready'); label(); });
  video.addEventListener('pause', label);
  video.addEventListener('error', () => { failed = true; hero.classList.remove('film-ready'); button.hidden = true; });
  const observer = new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    sync();
  }, { threshold: 0.15 });
  observer.observe(hero);
  document.addEventListener('visibilitychange', sync);
  reduceMotion.addEventListener('change', () => { if (reduceMotion.matches) { wantsPlayback = false; video.pause(); } });
  connection?.addEventListener('change', () => { if (connection.saveData) { wantsPlayback = false; video.pause(); } });
}
