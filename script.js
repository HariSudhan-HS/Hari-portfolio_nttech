/* ===========================
   HARISUDHAN M — Portfolio JS
   =========================== */

/* ---- LOADER ---- */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    animateReveal();
  }, 1900);
});

/* ---- PARTICLES (hero background) ---- */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
    alpha: Math.random() * 0.5 + 0.1,
    color: Math.random() > 0.5 ? '0,245,255' : '168,85,247'
  };
}

for (let i = 0; i < 80; i++) particles.push(createParticle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.dx; p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
    ctx.fill();
  });
  // draw connecting lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0,245,255,${0.06 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ---- TYPING EFFECT ---- */
const phrases = [
  'Building Responsive Interfaces',
  'Crafting Clean HTML & CSS',
  'Bringing Ideas to Life',
  'Passionate About UI/UX',
  'Exploring AI-based Frontend'
];
let pIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typed');

function typeLoop() {
  const phrase = phrases[pIdx];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++cIdx);
    if (cIdx === phrase.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  } else {
    typedEl.textContent = phrase.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
  }
  setTimeout(typeLoop, deleting ? 55 : 85);
}
setTimeout(typeLoop, 2200);

/* ---- NAVBAR SCROLL ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 50
    ? 'rgba(3,5,15,0.97)'
    : 'rgba(3,5,15,0.85)';
});

/* ---- ACTIVE NAV ON SCROLL ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let cur = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) cur = sec.getAttribute('id');
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
  });
}
window.addEventListener('scroll', updateActiveNav);

/* ---- HAMBURGER / DRAWER ---- */
const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerClose = document.getElementById('drawerClose');

function openDrawer() {
  drawer.classList.add('open');
  drawerOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  drawerClose.classList.add('red');
  setTimeout(() => drawerClose.classList.remove('red'), 500);
  drawer.classList.remove('open');
  drawerOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);

document.querySelectorAll('.drawer-link').forEach(link => {
  link.addEventListener('click', closeDrawer);
});

/* ---- SCROLL REVEAL ---- */
function animateReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
          // animate progress bars inside
          const bars = entry.target.querySelectorAll('.progress-fill');
          bars.forEach(bar => {
            bar.style.width = bar.dataset.w + '%';
          });
        }, 60 * (Array.from(entry.target.parentElement?.children || []).indexOf(entry.target)));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* Also run reveal if DOM is already loaded */
if (document.readyState === 'complete') {
  setTimeout(animateReveal, 200);
}

/* ---- BACK TO TOP ---- */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 400);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---- CARD TILT EFFECT ---- */
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ---- CONTACT FORM ---- */
const contactForm = document.getElementById('contactForm');
const successPopup = document.getElementById('successPopup');
const popupClose = document.getElementById('popupClose');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const msg = document.getElementById('cMsg').value.trim();
  if (!name || !email || !msg) return;
  
  successPopup.classList.add('show');
  contactForm.reset();
  
  // Voice message after form submit
  speakText('Thank you for contacting me. I will connect with you soon.');
});

popupClose.addEventListener('click', () => successPopup.classList.remove('show'));
successPopup.addEventListener('click', e => {
  if (e.target === successPopup) successPopup.classList.remove('show');
});

/* ---- VOICE ASSISTANT ---- */
const voiceBtn = document.getElementById('voiceBtn');
let isSpeaking = false;

function speakText(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.92;
  utterance.pitch = 1.1;
  utterance.volume = 1;

  // Try to pick a pleasant voice
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    v.name.includes('Google UK English Female') ||
    v.name.includes('Samantha') ||
    v.name.includes('Karen') ||
    v.name.includes('Zira') ||
    (v.lang === 'en-US' && v.name.toLowerCase().includes('female'))
  ) || voices.find(v => v.lang.startsWith('en')) || voices[0];
  if (preferred) utterance.voice = preferred;

  utterance.onstart = () => { isSpeaking = true; voiceBtn.classList.add('speaking'); };
  utterance.onend = () => { isSpeaking = false; voiceBtn.classList.remove('speaking'); };
  window.speechSynthesis.speak(utterance);
}

voiceBtn.addEventListener('click', () => {
  if (isSpeaking) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    voiceBtn.classList.remove('speaking');
    return;
  }
  const introText =
    "Welcome to my portfolio. " +
    "I am HariSudhan, a passionate Frontend Developer skilled in HTML, CSS and JavaScript. " +
    "I enjoy building responsive and user-friendly websites. " +
    "If you would like to say something or contact me, please go to the contact section and send me a message. " +
    "Thank you for visiting my portfolio.";
  speakText(introText);
});

// Load voices (some browsers need this)
window.speechSynthesis.onvoiceschanged = () => {};
