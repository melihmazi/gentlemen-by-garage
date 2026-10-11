# Gentlemen by Garage

Bağımlılık gerektirmeyen HTML, CSS ve JavaScript ile hazırlanmış hizmet ve randevu sayfası.

`node server.mjs` komutuyla yerel olarak http://127.0.0.1:4173 adresinde açılır. Yayınlanan dosyalar `dist/` klasöründedir.

Hizmet, ücret, süre ve çalışma saatleri 11 Ekim 2026 tarihinde https://gentlemen-by-garage.ddgrup.com.tr sayfasından doğrulandı. Fiyatlar canlı olarak senkronize edilmez.

Ana sayfada klavyeyle de kullanılabilen hizmet sekmeleri ve büyütülebilen gerçek Instagram dönüşüm fotoğrafları bulunur. Randevu ekranında hizmet ve uygulama/uzman tercihi seçilerek fiyat özeti güncellenir. Tercihler rezervasyon sistemine otomatik aktarılmaz. Devam düğmesi seçilen hizmetin mevcut Dükkan Defteri sayfasına yönlendirir; personel, müsaitlik, iletişim ve kayıt işlemleri o sistemde tamamlanır. Mevcut sistemin kaynak kodu ve yönetim erişimi bu çalışma kapsamında bulunmadığından orijinal site değiştirilmemiştir.

Animasyonlar tarayıcının Web Animations API ve IntersectionObserver özellikleriyle, ek kütüphane olmadan çalışır: sıralı başlık açılışı, bir kez oynayan bölüm girişleri, hizmet/fiyat ve galeri geçişleri. Masaüstünde fotoğrafa hafif imleç eğimi ve kaydırma paralaksı uygulanır. Kaydırma ve imleç güncellemeleri requestAnimationFrame ile sınırlanır. prefers-reduced-motion ayarı başlangıçta ve değiştiğinde dikkate alınır; JavaScript veya animasyon desteği olmadan içerik görünür kalır.

Fotoğraflar kullanıcının talebiyle Batuhan Sincer’ın herkese açık Instagram profilinden alındı. Kaynak paylaşımlar:

- https://www.instagram.com/batuhansincer_/p/DeKMvd-DCc3/ — ana sayfa
- https://www.instagram.com/batuhansincer_/p/DS5cqddDJZ1/ — salon bölümü
- https://www.instagram.com/batuhansincer_/reel/DeUdq9jsVJn/ — saç ve sakal dönüşümü
- https://www.instagram.com/batuhansincer_/reel/DcbcWoysJGn/ — saç formu dönüşümü

Fotoğraf dosyaları yerel olarak saklanır; süresi dolabilen Instagram CDN adreslerine bağlı değildir. Paylaşımlara sayfadan ulaşılabilir.

Yeni tasarımda Manrope fontu yerel sunulur. SIL Open Font License metinleri `dist/assets/fonts/` içinde bulunur.

## Ücretsiz yayın

GitHub deposu: https://github.com/melihmazi/gentlemen-by-garage

GitHub Pages: https://melihmazi.github.io/gentlemen-by-garage/

`.github/workflows/pages.yml`, `master` veya `main` dalına her push işleminde `dist/` klasörünü GitHub Pages’e yayınlar. Pages kaynağı GitHub Actions olarak ayarlanır. Kurulum veya derleme bağımlılığı yoktur.

Varlık yolları görecelidir; GitHub Pages proje alt dizininde ve kök alan adında çalışır. Yerel Pages kontrolü için http://127.0.0.1:4173/gentlemen-by-garage/ adresi de kullanılabilir.

Doğrulama: JavaScript sözdizimi; masaüstü ve mobil görünüm; yatay taşma; hizmet seçimi, boş özet ve fiyat güncellemesi; mobil menü; açılır hizmet ve soru detayları; GitHub Pages alt dizininde fotoğraf, font ve dosya yolları.
