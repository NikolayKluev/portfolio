let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const slidesWrapper = document.querySelector('.slides');

// Функция перемещения слайдов
function moveSlide(direction) {
  currentSlide += direction;

  // Зацикливание: после последнего слайда — первый, перед первым — последний
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  updateSlider();
}

// Функция перехода к конкретному слайду
function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

// Обновление отображения слайдера
function updateSlider() {
  // Сдвигаем контейнер слайдов
  slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Обновляем индикаторы
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentSlide);
  });
}

// Автопрокрутка (опционально)
function startAutoSlide() {
  setInterval(() => {
    moveSlide(1);
  }, 5000); // Смена каждые 5 секунд
}

// Инициализация
updateSlider();
startAutoSlide();
