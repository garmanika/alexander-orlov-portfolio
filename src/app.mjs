import { projects, wrapIndex, contact } from './projects.mjs';

const $ = (selector) => document.querySelector(selector);
const track = $('#slider-track');
const slider = $('.project-slider');
const markers = [...document.querySelectorAll('[data-slide]')];
let current = 0;
let touchStart = null;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function createCard(project, index) {
  const card = element('article', 'project-card');
  card.dataset.project = project.id;
  card.setAttribute('role', 'group');
  card.setAttribute('aria-roledescription', 'слайд');
  card.setAttribute('aria-label', `${index + 1} из ${projects.length}: ${project.name}`);
  const dots = element('div', 'browser-dots');
  dots.setAttribute('aria-hidden', 'true');
  dots.append(...Array.from({ length: 3 }, () => element('i')));
  const nav = element('div', 'preview-nav');
  nav.setAttribute('aria-hidden', 'true');
  nav.append(element('span', 'preview-logo', project.name), ...['Проекты', 'Услуги', 'О студии', 'Контакты', 'Обсудить проект →'].map(label => element('span', '', label)));
  const body = element('div', 'preview-body');
  const copy = element('div', 'preview-copy');
  copy.append(element('h4', '', project.headline), element('p', '', project.subtitle), element('span', 'preview-cta', `${project.action} →`));
  const image = element('img');
  image.src = project.image; image.alt = project.alt; image.width = 1400; image.height = 950; image.decoding = 'async';
  body.append(copy, image);
  const footer = element('div', 'preview-footer');
  footer.setAttribute('aria-hidden', 'true');
  footer.append(element('span', '', '01 / 06'), element('span', '', project.note));
  card.append(dots, nav, body, footer);
  card.addEventListener('click', () => { if (current !== index) showSlide(index); else openProject(); });
  return card;
}

track.append(...projects.map(createCard));
const cards = [...track.children];

function positionTrack() {
  const step = cards[1].offsetLeft - cards[0].offsetLeft;
  track.style.transform = `translateX(${-current * step}px)`;
}

function showSlide(index, announce = true) {
  current = wrapIndex(index);
  const project = projects[current];
  $('#current-index').textContent = String(current + 1).padStart(2, '0');
  $('#project-category').textContent = project.category;
  $('#project-title').textContent = project.name;
  $('#project-description').textContent = project.description;
  markers.forEach((marker, i) => {
    marker.classList.toggle('active', i === current);
    if (i === current) marker.setAttribute('aria-current', 'true');
    else marker.removeAttribute('aria-current');
  });
  cards.forEach((card, i) => card.setAttribute('aria-hidden', String(i !== current)));
  positionTrack();
  if (announce) $('#slider-announcement').textContent = `Проект ${current + 1} из ${projects.length}: ${project.name}`;
}

$('#previous').addEventListener('click', () => showSlide(current - 1));
$('#next').addEventListener('click', () => showSlide(current + 1));
markers.forEach(marker => marker.addEventListener('click', () => showSlide(Number(marker.dataset.slide))));
slider.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault(); showSlide(current + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
$('.slider-viewport').addEventListener('touchstart', event => { touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }, { passive: true });
$('.slider-viewport').addEventListener('touchend', event => {
  if (!touchStart) return;
  const dx = event.changedTouches[0].clientX - touchStart.x;
  const dy = event.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) showSlide(current + (dx < 0 ? 1 : -1));
  touchStart = null;
}, { passive: true });
$('.slider-viewport').addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });
new ResizeObserver(positionTrack).observe($('.slider-viewport'));
showSlide(0, false);

let previousFocus = null;
function openDialog(dialog) {
  previousFocus = document.activeElement;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; previousFocus?.focus(); });
});

document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => openDialog($('#contact-dialog'))));
if (contact.email || contact.telegram) {
  $('#contact-message').textContent = 'Расскажите, какой сайт вам нужен. Обсудим задачу, подход и следующие шаги.';
  $('#contact-dialog .dialog-note').textContent = 'Напишите в удобном мессенджере или на почту — сообщение отправите вы сами.';
  if (contact.telegram && /^@[a-zA-Z0-9_]{5,32}$/.test(contact.telegram)) {
    const link = element('a', '', `Telegram ${contact.telegram} ↗`);
    link.href = `https://t.me/${contact.telegram.slice(1)}`; link.target = '_blank'; link.rel = 'noopener noreferrer'; $('#contact-links').append(link);
  }
  if (contact.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
    const link = element('a', '', `${contact.email} ↗`);
    link.href = `mailto:${encodeURIComponent(contact.email)}?subject=${encodeURIComponent('Обсудить создание сайта')}`; $('#contact-links').append(link);
  }
}

function openProject() {
  const project = projects[current];
  $('#detail-title').textContent = project.name;
  $('#detail-description').textContent = project.description;
  $('#detail-image').src = project.image;
  $('#detail-image').alt = project.alt;
  openDialog($('#project-dialog'));
}
$('#project-open').addEventListener('click', openProject);
