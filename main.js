// Reveal-on-scroll for sections
const revealObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  }
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Active section highlight in navbar while scrolling
const navLinks = document.querySelectorAll('.nav-links a');
const sectionIds = Array.from(navLinks)
  .map(a => a.getAttribute('href'))
  .filter(h => h && h.startsWith('#') && h.length > 1)
  .map(h => h.slice(1));

const sections = sectionIds
  .map(id => document.getElementById(id))
  .filter(Boolean);

const setActive = (id) => {
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
  });
};

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter(e => e.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
  if (visible.length > 0) setActive(visible[0].target.id);
}, { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });

sections.forEach(s => sectionObserver.observe(s));
