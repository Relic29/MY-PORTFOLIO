// ============================================================
// RELIC — SOC Console (v2) — interactions
// ============================================================

// ---- mobile sidebar toggle ----
const sidebar = document.getElementById('sidebar');
const mobileToggle = document.getElementById('mobileToggle');
if(mobileToggle && sidebar){
  mobileToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  sidebar.querySelectorAll('.side-link').forEach(a => a.addEventListener('click', () => sidebar.classList.remove('open')));
}

// ---- scroll-spy: highlight active sidebar link ----
const panels = document.querySelectorAll('.panel[id]');
const sideLinks = document.querySelectorAll('.side-link');

const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = entry.target.getAttribute('id');
      sideLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.target === id);
      });
    }
  });
}, { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' });

panels.forEach(p => spy.observe(p));

// ---- scroll reveal ----
const revealTargets = document.querySelectorAll('.panel-body > *');
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => io.observe(el));

// ---- message form: opens the visitor's email client with the message pre-filled ----
const messageForm = document.getElementById('messageForm');
const messageNote = document.getElementById('messageNote');
if(messageForm){
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = messageForm.name.value.trim();
    const email = messageForm.email.value.trim();
    const body = messageForm.message.value.trim();

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const fullBody = encodeURIComponent(`${body}\n\n— ${name} (${email})`);
    window.location.href = `mailto:relic@isix.ai?subject=${subject}&body=${fullBody}`;

    if(messageNote){
      messageNote.textContent = 'Opening your email app now — just hit send there.';
    }
  });
}
