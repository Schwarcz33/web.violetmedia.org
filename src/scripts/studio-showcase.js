const showcase = document.querySelector('[data-showcase]');
if (showcase) {
  const stage = showcase.querySelector('.showcase-stage');
  const plane = showcase.querySelector('.showcase-plane');
  const button = showcase.querySelector('[data-depth-toggle]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  let expanded = false;
  const reset = () => { plane.style.setProperty('--turn-x', '0deg'); plane.style.setProperty('--turn-y', '0deg'); };
  button.hidden = false;
  button.addEventListener('click', () => {
    expanded = !expanded;
    showcase.classList.toggle('depth-expanded', expanded);
    button.setAttribute('aria-pressed', String(expanded));
    button.textContent = expanded ? 'Reset view ↙' : 'Explore depth ↗';
  });
  stage.addEventListener('pointermove', event => {
    if (reduced.matches || !pointer.matches) return;
    const box = stage.getBoundingClientRect();
    plane.style.setProperty('--turn-x', `${-((event.clientY-box.top)/box.height-.5)*6}deg`);
    plane.style.setProperty('--turn-y', `${((event.clientX-box.left)/box.width-.5)*8}deg`);
  });
  stage.addEventListener('pointerleave', reset);
  stage.addEventListener('focusin', reset);
  reduced.addEventListener('change', reset);
}
