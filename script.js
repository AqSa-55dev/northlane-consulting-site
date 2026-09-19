// Northlane Consulting — shared behavior
document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  // One orchestrated scroll-reveal pass
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // 3D tilt-on-hover (subtle) — respects reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    document.querySelectorAll('.tilt-card').forEach(card => {
      const inner = card.querySelector('.tilt-inner');
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        inner.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
      });
      card.addEventListener('mouseleave', () => { inner.style.transform = 'rotateY(0) rotateX(0)'; });
    });
  }

  // Contact form (client-side only — no backend)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const data = new FormData(form);
      if (!data.get('name') || !data.get('email') || !data.get('message')) {
        status.textContent = 'Please fill in your name, email, and message.';
        status.style.color = '#A85327';
        return;
      }
      status.style.color = '#2F5D53';
      status.textContent = `Thanks, ${data.get('name').split(' ')[0]} — we'll reply within one business day.`;
      form.reset();
    });
  }
});
