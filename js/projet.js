// Navigation entre les images
document.addEventListener('DOMContentLoaded', function () {

  const mainImg = document.getElementById('carrousel-main');
  const thumbsNodeList = document.querySelectorAll('#carrousel-thumbs img');
  const thumbs = Array.from(thumbsNodeList);
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCloseBtn = document.getElementById('lightbox-close');

  let currentIndex = 0;

  function findInitialIndex() {
    const src = mainImg.getAttribute('src');
    const idx = thumbs.findIndex(t => (t.dataset.full || t.src) === src);
    return idx >= 0 ? idx : 0;
  }

  function updateImage(index) {
    if (thumbs.length === 0) return;
    index = (index + thumbs.length) % thumbs.length;
    const thumb = thumbs[index];
    const full = thumb.dataset.full || thumb.src;

    mainImg.src = full;
    mainImg.alt = thumb.alt || mainImg.alt || '';
    lightboxImg.src = full;
    lightboxImg.alt = thumb.alt || '';

    thumbs.forEach((t, i) => {
      t.classList.toggle('ring-2', i === index);
      t.classList.toggle('ring-white', i === index);
      t.classList.toggle('opacity-100', i === index);
    });

    currentIndex = index;
  }

  function openLightbox() {
    lightbox.classList.remove('hidden');
    lightboxCloseBtn.focus();
    
  }

  function closeLightbox() {
    lightbox.classList.add('hidden');
  }

  currentIndex = findInitialIndex();
  updateImage(currentIndex);

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', function (e) {
      updateImage(i);
      e.stopPropagation();
    });
  });

  btnNext.addEventListener('click', function (e) {
    e.stopPropagation();
    updateImage(currentIndex + 1);
  });

  btnPrev.addEventListener('click', function (e) {
    e.stopPropagation();
    updateImage(currentIndex - 1);
  });

  mainImg.addEventListener('click', function (e) {
    openLightbox();
  });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target === lightboxCloseBtn) {
      closeLightbox();
    }
  });

  lightboxCloseBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (!lightbox.classList.contains('hidden')) {
        closeLightbox();
      }
    } else if (e.key === 'ArrowRight') {
      updateImage(currentIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      updateImage(currentIndex - 1);
    }
  });

});