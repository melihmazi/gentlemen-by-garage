const origin = 'https://gentlemen-by-garage.ddgrup.com.tr/b/gentlemen-by-garage';
const services = [
  { id: 'kesim', category: 'SAÇ & SAKAL', title: 'Yüz yapına uygun kesim', description: 'Yüz yapına, saç tipine ve günlük kullanımına özel saç & sakal tasarımı.', price: '2.500', from: true, path: '/hizmet/yuz-yapiniza-uygun-sac-sakal-kesimi', details: '<ul><li>Yüz ve kafa yapısına özel analiz</li><li>Saç tipi ve yoğunluğuna uygun tasarım</li><li>Kişiye özel şekillendirme eğitimi</li></ul><p>Ekip üyesi: saç kesimi 2.500 TL / saç & sakal 3.000 TL<br>Batuhan Sincer: 4.500 TL</p>' },
  { id: 'danismanlik', category: 'BATUHAN SİNCER DANIŞMANLIĞI', title: 'Danışmanlık & kişiye özel kesim', description: 'Batuhan Sincer’in analizi ve yönlendirmesi, profesyonel ekip üyesinin uygulaması.', price: '3.000', from: false, path: '/hizmet/batuhan-sincer-danismanliginda-randevu-hizmeti-prof-ekip-uye', details: '<ul><li>Batuhan Sincer tarafından yüz, kafa ve saç yapısı analizi</li><li>Size uygun saç ve sakal formunun belirlenmesi</li><li>Profesyonel ekip üyesi tarafından kesim</li></ul><p>Batuhan Sincer bu hizmette kesim uygulaması gerçekleştirmez.</p>' },
  { id: 'vip', category: 'VIP ROOM', title: 'VIP Room saç & sakal', description: 'Özel odada, birebir hizmetle sana ayrılan bir saat.', price: '5.000', from: true, path: '/hizmet/vip-room-sac-sakal-kesim-hizmeti', details: '<ul><li>Yüz ve saç yapısına özel analiz</li><li>Kişiye özel kesim ve şekillendirme</li><li>Özel VIP odada birebir hizmet</li><li>Bir konuğunuz size eşlik edebilir</li></ul><p>Ekip üyesi: 5.000 TL<br>Batuhan Sincer: 6.000 TL</p>' }
];
let selected = services[0].id;
const options = document.querySelector('#service-options');
options.innerHTML = services.map(s => `<div class="booking-option" data-service="${s.id}"><label class="option-label"><input type="radio" name="service" value="${s.id}"><span><span class="eyebrow">${s.category}</span><strong>${s.title}</strong><p>${s.description}</p></span><span class="option-price">${s.price} TL<small>${s.from ? 'başlangıç fiyatı · ' : ''}60 dk</small></span></label><details><summary>İçerik ve fiyat detayları <span aria-hidden="true">+</span></summary><div class="detail-content">${s.details}</div></details></div>`).join('');
function updateSelection(id) {
  const service = services.find(s => s.id === id) || services[0];
  selected = service.id;
  options.querySelectorAll('.booking-option').forEach(option => {
    const active = option.dataset.service === selected;
    option.classList.toggle('selected', active);
    option.querySelector('input').checked = active;
  });
  document.querySelector('#summary-content').innerHTML = `<p class="summary-service">${service.title}</p><div class="summary-row"><span>Süre</span><strong>60 dakika</strong></div><div class="summary-row"><span>Uzman & tarih</span><strong>Sonraki adımda</strong></div><div class="summary-row summary-price"><span>${service.from ? 'Başlangıç fiyatı' : 'Hizmet bedeli'}</span><strong>${service.price} TL${service.from ? '<small>Tercih edilen uzmana göre değişir</small>' : ''}</strong></div>`;
  document.querySelector('#continue-booking').href = origin + service.path;
}
options.addEventListener('change', event => {
  if (event.target.name === 'service') updateSelection(event.target.value);
});
function route() {
  const hash = window.location.hash;
  const booking = hash.startsWith('#randevu');
  document.querySelector('#home-view').hidden = booking;
  document.querySelector('#booking-view').hidden = !booking;
  document.body.classList.toggle('is-booking', booking);
  document.title = booking ? 'Randevu — Gentlemen by Garage' : 'Gentlemen by Garage — Saç, Sakal & Karakter';
  if (booking) {
    const serviceId = hash.split('/')[1];
    if (serviceId) updateSelection(serviceId);
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.querySelector('#booking-title').setAttribute('tabindex', '-1');
    document.querySelector('#booking-title').focus({ preventScroll: true });
  } else if (hash && hash !== '#') {
    requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}
window.addEventListener('hashchange', route);
updateSelection(selected);
route();
