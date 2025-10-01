let currentSlide = 0;
const slides = document.querySelectorAll(".banner");
const dots = document.querySelectorAll(".dot");
let autoSlideInterval;

// Показать слайд
function showSlide(index) {
  // Вычисляем индекс
  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }

  // Убираем active у всех слайдов и точек
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // Сразу показываем новый слайд (кроссфейд)
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

// Переход по точкам
function goToSlide(index) {
  showSlide(index);
  resetAutoSlide();
}

// Автосмена каждые 5 секунд
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 8000);
}

// Сброс таймера
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Старт
startAutoSlide();

// Пауза при наведении
const sliderContainer = document.querySelector(".slider-container");
sliderContainer.addEventListener("mouseenter", () => {
  clearInterval(autoSlideInterval);
});

sliderContainer.addEventListener("mouseleave", () => {
  startAutoSlide();
});

// Свайпы на мобильных
let touchStartX = 0;
let touchEndX = 0;

sliderContainer.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

sliderContainer.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;

  // Свайп влево (следующий слайд)
  if (touchStartX - touchEndX > 50) {
    showSlide(currentSlide + 1);
    resetAutoSlide();
  }

  // Свайп вправо (предыдущий слайд)
  if (touchEndX - touchStartX > 50) {
    showSlide(currentSlide - 1);
    resetAutoSlide();
  }
});
