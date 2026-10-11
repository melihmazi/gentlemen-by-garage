const origin = 'https://gentlemen-by-garage.ddgrup.com.tr/b/gentlemen-by-garage';
const services = [
  { id: 'kesim', label: 'Kesim & tasarım', category: 'SAÇ & SAKAL', title: 'Yüzüne uygun. Sana ait.', summary: 'Kesim & kişisel tasarım', description: 'Yüz ve kafa yapını analiz ederek saçının doğal yapısına ve günlük kullanımına uygun bir form tasarlıyoruz.', tags: ['Yüz & saç analizi', 'Kişisel tasarım', 'Şekillendirme rehberi'], path: '/hizmet/yuz-yapiniza-uygun-sac-sakal-kesimi', variants: [{label:'Ekip üyesi · Saç kesimi', price:2500}, {label:'Ekip üyesi · Saç & sakal', price:3000}, {label:'Batuhan Sincer', price:4500}], details: '<ul><li>Yüz ve kafa yapısına özel analiz</li><li>Saç tipi ve yoğunluğuna uygun tasarım</li><li>Saç ve sakal formunun belirlenmesi</li><li>Kişiye özel şekillendirme eğitimi</li></ul>' },
  { id: 'danismanlik', label: 'Uzman bakışı', category: 'BATUHAN SİNCER DANIŞMANLIĞI', title: 'Önce bakış açısı. Sonra yeni bir stil.', summary: 'Danışmanlık & tasarım', description: 'Batuhan Sincer yüz, kafa ve saç yapını analiz eder. Kesimini onun yönlendirmesiyle profesyonel ekip üyesi gerçekleştirir.', tags: ['Batuhan Sincer analizi', 'Ekip üyesi ile kesim', 'Kişisel yönlendirme'], path: '/hizmet/batuhan-sincer-danismanliginda-randevu-hizmeti-prof-ekip-uye', variants: [{label:'Batuhan Sincer danışmanlığı', note:'Kesim uygulaması: profesyonel ekip üyesi',price:3000}], details: '<ul><li>Batuhan Sincer tarafından yüz, kafa ve saç yapısı analizi</li><li>Size uygun saç ve sakal formunun belirlenmesi</li><li>Profesyonel ekip üyesi tarafından kesim</li></ul><p>Batuhan Sincer bu hizmette danışmanlık verir; kesim uygulaması yapmaz.</p>' },
  { id: 'vip', label: 'VIP Room', category: 'ÖZEL ALAN / BİREBİR HİZMET', title: 'Kendi alanın. Kendi zamanın.', summary: 'VIP Room saç & sakal', description: 'Özel VIP odada birebir saç ve sakal tasarımı. Sana ayrılan bu saate bir konuğun da eşlik edebilir.', tags: ['Özel VIP oda', 'Saç & sakal tasarımı', 'Bir konuk hakkı'], path: '/hizmet/vip-room-sac-sakal-kesim-hizmeti', variants: [{label:'Ekip üyesi · VIP Room',price:5000},{label:'Batuhan Sincer · VIP Room',price:6000}], details:'<ul><li>Yüz ve saç yapısına özel analiz</li><li>Kişiye özel kesim ve şekillendirme</li><li>Özel VIP odada birebir hizmet</li><li>Bir konuğunuz size eşlik edebilir</li></ul>' }
];
const money = value => new Intl.NumberFormat('tr-TR').format(value) + ' TL';
const actionIcon = '<svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-arrow-right"></use></svg>';
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const pointerPreference = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 761px)');
const runningAnimations = new Map();
const motionEase = 'cubic-bezier(.22,1,.36,1)';
function animateElement(element, keyframes, timing = {}) {
  if (!element || motionPreference.matches || !element.animate) return;
  runningAnimations.get(element)?.cancel();
  const animation = element.animate(keyframes, {duration:600, easing:motionEase, fill:'backwards', ...timing});
  runningAnimations.set(element, animation);
  animation.finished.then(() => {
    if (runningAnimations.get(element) === animation) runningAnimations.delete(element);
  }).catch(() => {});
}
let selected = null;
let variantIndex = 0;
const options = document.querySelector('#service-options');
const variants = document.querySelector('#variant-options');
const continueBooking = document.querySelector('#continue-booking');
const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const tabs = [...document.querySelectorAll('[data-experience]')];
const panel = document.querySelector('#experience-panel');

function showExperience(id, focus = false) {
  const service = services.find(s => s.id === id);
  if (!service) return;
  tabs.forEach(tab => {
    const active = tab.dataset.experience === id;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focus) tab.focus();
  });
  panel.setAttribute('aria-labelledby', 'tab-' + id);
  panel.innerHTML = '<div class="panel-top"><span>' + service.category + '</span><span class="panel-duration">60 DK</span></div><h3>' + service.title + '</h3><p class="panel-description">' + service.description + '</p><div class="panel-features">' + service.tags.map(tag => '<span>' + tag + '</span>').join('') + '</div><div class="panel-bottom"><div class="panel-price"><strong>' + money(service.variants[0].price) + '</strong><small>' + (service.variants.length > 1 ? 'başlangıç fiyatı' : 'danışmanlık + ekip uygulaması') + '</small></div><a class="button dark" href="#randevu/' + id + '">Bu deneyimi seç <span aria-hidden="true">' + actionIcon + '</span></a></div><p class="price-note">Uzman ve hizmet tercihine göre fiyat seçeneklerini sonraki ekranda görebilirsin. Güncel ücret randevu sisteminde teyit edilir.</p>';
  [...panel.children].forEach((child, index) => animateElement(child, [{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}], {duration:420,delay:index * 35}));
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showExperience(tab.dataset.experience));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); showExperience(tabs[next].dataset.experience, true); }
  });
});
options.innerHTML = services.map((s, index) => '<label class="booking-option"><input type="radio" name="service" value="' + s.id + '"><span>0' + (index + 1) + '</span><strong>' + s.label + '</strong><small>60 dakika</small></label>').join('');
function updateSummary() {
  const service = services.find(s => s.id === selected);
  if (!service) {
    document.querySelector('#summary-content').innerHTML = '<p class="empty-summary">Bir saat.<br>Senin tercihin.<small>Deneyimini seçtiğinde hizmet ve fiyat özeti burada görünecek.</small></p>';
    continueBooking.removeAttribute('href');
    continueBooking.setAttribute('aria-disabled', 'true');
    continueBooking.setAttribute('tabindex', '-1');
    return;
  }
  const variant = service.variants[variantIndex];
  document.querySelector('#summary-content').innerHTML = '<h2 class="summary-service">' + service.summary + '</h2><p class="summary-variant">' + variant.label + (variant.note ? '<br>' + variant.note : '') + '</p><div class="summary-row summary-time"><span>SANA AYRILAN SÜRE</span><strong>60 dk</strong></div><div class="summary-row summary-price"><span>Hizmet bedeli</span><strong>' + money(variant.price) + '</strong></div>';
  continueBooking.href = origin + service.path;
  continueBooking.removeAttribute('aria-disabled');
  continueBooking.removeAttribute('tabindex');
  animateElement(document.querySelector('.summary-price strong'), [{opacity:.35,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}], {duration:300});
}
function selectService(id) {
  const service = services.find(s => s.id === id);
  selected = service?.id || null;
  variantIndex = 0;
  options.querySelectorAll('input').forEach(input => { input.checked = input.value === selected; });
  document.querySelector('#preference-section').hidden = !service;
  if (service) {
    variants.innerHTML = service.variants.map((v, index) => '<label class="variant-option"><input type="radio" name="variant" value="' + index + '"' + (index === 0 ? ' checked' : '') + '><span>' + v.label + (v.note ? '<small>' + v.note + '</small>' : '') + '</span><strong>' + money(v.price) + '</strong></label>').join('');
    document.querySelector('#booking-details').innerHTML = '<h3>Bu deneyime dahil</h3>' + service.details;
  }
  updateSummary();
  animateElement(document.querySelector('#preference-section'), [{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}], {duration:400});
}
options.addEventListener('change', event => { if (event.target.name === 'service') selectService(event.target.value); });
variants.addEventListener('change', event => { if (event.target.name === 'variant') { variantIndex = Number(event.target.value); updateSummary(); } });
continueBooking.addEventListener('click', event => { if (!selected) event.preventDefault(); });
function closeMenu() { header.classList.remove('menu-open'); menuToggle.setAttribute('aria-expanded', 'false'); }
menuToggle.addEventListener('click', () => { const open = header.classList.toggle('menu-open'); menuToggle.setAttribute('aria-expanded', String(open)); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && header.classList.contains('menu-open')) { closeMenu(); menuToggle.focus(); } });
document.addEventListener('click', event => { if (!header.contains(event.target)) closeMenu(); });
function route() {
  closeMenu();
  const hash = window.location.hash;
  const booking = hash === '#randevu' || hash.startsWith('#randevu/');
  document.querySelector('#home-view').hidden = booking;
  document.querySelector('#booking-view').hidden = !booking;
  document.body.classList.toggle('is-booking', booking);
  document.title = booking ? 'Randevu — Gentlemen by Garage' : 'Gentlemen by Garage — Kendi çizgini bul.';
  if (booking) {
    const serviceId = hash.split('/')[1];
    if (serviceId) selectService(serviceId);
    window.scrollTo({top:0,behavior:'instant'});
    document.querySelector('#booking-title').setAttribute('tabindex','-1');
    document.querySelector('#booking-title').focus({preventScroll:true});
  } else if (hash && hash !== '#') {
    requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
  } else { window.scrollTo({top:0,behavior:'instant'}); }
  if (booking) {
    animateElement(document.querySelector('.booking-intro'), [{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}], {duration:500});
    animateElement(document.querySelector('.booking-layout'), [{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}], {duration:550,delay:100});
  }
  requestScrollUpdate();
}
const gallery = [
  {image:'./assets/style-transformation.jpg',alt:'Batuhan Sincer’ın paylaştığı saç ve sakal tasarımının önce ve sonraki görünümü',source:'https://www.instagram.com/batuhansincer_/reel/DeUdq9jsVJn/'},
  {image:'./assets/profile-transformation.jpg',alt:'Batuhan Sincer’ın paylaştığı saç formunun önce ve sonraki profilden görünümü',source:'https://www.instagram.com/batuhansincer_/reel/DcbcWoysJGn/'}
];
const dialog = document.querySelector('#gallery-dialog');
let galleryTrigger;
document.querySelectorAll('[data-gallery]').forEach(button => button.addEventListener('click', () => {
  const item = gallery[Number(button.dataset.gallery)];
  galleryTrigger = button;
  document.querySelector('#gallery-image').src = item.image;
  document.querySelector('#gallery-image').alt = item.alt;
  document.querySelector('#gallery-source').href = item.source;
  dialog.showModal();
  animateElement(dialog, [{opacity:0,transform:'translateY(20px) scale(.96)'},{opacity:1,transform:'translateY(0) scale(1)'}], {duration:400});
  document.body.classList.add('gallery-open');
}));
document.querySelector('#close-gallery').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.classList.remove('gallery-open'); galleryTrigger?.focus(); });
let scrollFrame = null;
function requestScrollUpdate() {
  if (scrollFrame !== null) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = null;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    document.documentElement.style.setProperty('--scroll-progress', String(maxScroll > 0 ? Math.min(1,Math.max(0,window.scrollY / maxScroll)) : 0));
    const photo = document.querySelector('.hero-photo');
    const canMove = pointerPreference.matches && !motionPreference.matches && !document.body.classList.contains('is-booking');
    photo.style.setProperty('--photo-shift', canMove ? Math.min(18,window.scrollY * .055) + 'px' : '0px');
  });
}
window.addEventListener('scroll', requestScrollUpdate, {passive:true});
window.addEventListener('resize', requestScrollUpdate, {passive:true});
const photo = document.querySelector('.hero-photo');
let pointerFrame = null;
let photoBounds;
let pointerPosition;
function resetPhotoTilt() {
  if (pointerFrame !== null) cancelAnimationFrame(pointerFrame);
  pointerFrame = null;
  photo.style.setProperty('--photo-x','0deg');
  photo.style.setProperty('--photo-y','0deg');
}
photo.addEventListener('pointerenter', () => { photoBounds = photo.getBoundingClientRect(); });
photo.addEventListener('pointermove', event => {
  if (!pointerPreference.matches || motionPreference.matches || !photoBounds) return;
  pointerPosition = {x:event.clientX,y:event.clientY};
  if (pointerFrame !== null) return;
  pointerFrame = requestAnimationFrame(() => {
    pointerFrame = null;
    const x = Math.max(-.5,Math.min(.5,(pointerPosition.x - photoBounds.left) / photoBounds.width - .5));
    const y = Math.max(-.5,Math.min(.5,(pointerPosition.y - photoBounds.top) / photoBounds.height - .5));
    photo.style.setProperty('--photo-x',(-y * 4) + 'deg');
    photo.style.setProperty('--photo-y',(x * 4) + 'deg');
  });
});
photo.addEventListener('pointerleave', resetPhotoTilt);
photo.addEventListener('pointercancel', resetPhotoTilt);
pointerPreference.addEventListener('change', () => { resetPhotoTilt(); requestScrollUpdate(); });

function playHeroEntrance() {
  document.querySelectorAll('.hero-word').forEach((word,index) => animateElement(word, [{transform:'translateY(115%)'},{transform:'translateY(0)'}], {duration:950,delay:index * 110}));
  animateElement(document.querySelector('.hero-top'), [{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}], {duration:600});
  animateElement(document.querySelector('.hero-stage'), [{opacity:0,transform:'translateY(28px) scale(.97)'},{opacity:1,transform:'translateY(0) scale(1)'}], {duration:1000,delay:180});
  animateElement(document.querySelector('.hero-bottom'), [{opacity:0,transform:'translateY(15px)'},{opacity:1,transform:'translateY(0)'}], {duration:750,delay:380});
}
let revealObserver;
const revealed = new WeakSet();
const revealGroups = [
  ['.hero', 0], ['.section-heading',0], ['.experience-tabs',0], ['.experience-panel',100],
  ['.studio-heading',0], ['.gallery-main',0], ['.studio-manifesto',100], ['.gallery-secondary',180],
  ['.faq-heading',0], ['.faq-list',100], ['.visit-top',0], ['.visit-cta',100], ['.visit-bottom',180]
];
function observeSections() {
  revealObserver?.disconnect();
  if (motionPreference.matches || !('IntersectionObserver' in window)) return;
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      revealObserver.unobserve(element);
      if (revealed.has(element)) return;
      revealed.add(element);
      if (element.classList.contains('hero')) { playHeroEntrance(); return; }
      const delay = revealGroups.find(([selector]) => element.matches(selector))?.[1] || 0;
      animateElement(element, [{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}], {duration:750,delay});
    });
  }, {threshold:.08,rootMargin:'0px 0px -35px 0px'});
  revealGroups.forEach(([selector]) => document.querySelectorAll(selector).forEach(element => {
    if (!revealed.has(element)) revealObserver.observe(element);
  }));
}
motionPreference.addEventListener('change', () => {
  runningAnimations.forEach(animation => animation.cancel());
  runningAnimations.clear();
  resetPhotoTilt();
  requestScrollUpdate();
  observeSections();
});
window.addEventListener('hashchange', route);
showExperience('kesim');
selectService(null);
route();
observeSections();
