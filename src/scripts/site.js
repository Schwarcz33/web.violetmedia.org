const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
if (toggle && nav) {
  const close = () => { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation'); nav.classList.remove('open'); };
  toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); nav.classList.toggle('open', open); });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { close(); toggle.focus(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.site-header')) close(); });
  matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches) close(); });
}

// Concept forms deliberately do not transmit, store or book anything.
document.querySelectorAll('[data-demo-form]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const status = form.querySelector('[role="status"]');
    status.hidden = false;
    status.textContent = form.dataset.success || 'Demo complete. Nothing was sent, booked or stored. Want this experience for your business? Follow the Violet Media link above.';
    status.focus();
  });
});

const conceptField = document.querySelector('#concept');
if (conceptField) {
  const concepts = { bakery: 'Bella’s Bakery', fitness: 'Apex Fitness', interiors: 'Noir & Co.' };
  const params = new URLSearchParams(location.search);
  const concept = concepts[params.get('concept')];
  if (concept) { conceptField.value = concept; const note = document.querySelector('#concept-note'); note.textContent = `Inspired by ${concept.replace(/\.$/, "")}. We’ll include this with your brief.`; note.hidden = false; }
  const packageField = document.querySelector('#package');
  document.querySelectorAll('[data-package]').forEach(a => a.addEventListener('click', () => { packageField.value = a.dataset.package; }));
}

const enquiry = document.querySelector('#project-form');
if (enquiry) {
  enquiry.addEventListener('submit', () => { enquiry.querySelector('[role="status"]').textContent = 'Opening the secure form service. Complete any verification there to send your enquiry.'; });
}

document.querySelectorAll('[data-filter-group]').forEach(group => {
  const target = group.dataset.filterGroup;
  group.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    group.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    let visible = 0;
    document.querySelectorAll(`[data-filter-item="${target}"]`).forEach(item => {
      item.hidden = button.dataset.filter !== 'all' && item.dataset.category !== button.dataset.filter;
      if (!item.hidden) visible++;
    });
    const status = document.querySelector(`[data-filter-status="${target}"]`);
    if (status) status.textContent = `${visible} ${target === 'menu' ? 'items' : 'classes'} shown`;
  }));
});

document.querySelectorAll('[data-class-name]').forEach(button => button.addEventListener('click', () => {
  const field = document.querySelector('#trial-class');
  if (field) { field.value = button.dataset.className; document.querySelector('#trial').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); field.focus({ preventScroll: true }); }
}));

document.querySelectorAll('[data-plan]').forEach(a => a.addEventListener('click', () => {
  const field = document.querySelector('#trial-plan');
  if (field) field.value = a.dataset.plan;
}));
