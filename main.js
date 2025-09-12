class Slider {
    constructor() {
        this.track = document.getElementById('sliderTrack');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dots = document.querySelectorAll('.dot');
        this.slides = document.querySelectorAll('.slide'); // Добавляем получение всех слайдов
        this.currentSlide = 0;
        this.totalSlides = 3;

        this.init();
    }

    init() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        this.dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                this.currentSlide = parseInt(e.target.dataset.slide);
                this.updateSlider();
            });
        });

        // Устанавливаем активный слайд при инициализации
        this.updateSlider();
    }

    updateSlider() {
        // const translateX = -this.currentSlide * 100;
        // this.track.style.transform = `translateX(${translateX}%)`;

        // Обновляем активные точки
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });

        // Обновляем активные слайды
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
    }

    prevSlide() {
        this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
        this.updateSlider();
    }
}

// Инициализируем слайдер после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    new Slider();
});

class AdvancedTicker {
    constructor(containerId, textId) {
        this.container = document.getElementById(containerId);
        this.textElement = document.getElementById(textId);
        this.speed = 7;
        this.currentPosition = 0;
        this.textWidth = 0;
        this.containerWidth = 0;
        this.animationId = null;

        this.init();
    }

    init() {
        this.updateDimensions();
        // Начинаем с правого края контейнера (не экрана!)
        this.currentPosition = this.containerWidth;
        this.animate();

        window.addEventListener('resize', () => this.updateDimensions());
    }

    updateDimensions() {
        this.containerWidth = this.container.offsetWidth;
        this.textWidth = this.textElement.offsetWidth;

        if (this.textWidth === 0) {
            setTimeout(() => this.updateDimensions(), 10);
        }
    }

    animate() {
        this.currentPosition -= this.speed;

        // Когда текст полностью исчез слева, возвращаем справа
        if (this.currentPosition <= -this.textWidth) {
            this.currentPosition = this.containerWidth;
        }

        this.textElement.style.transform = `translateX(${this.currentPosition}px)`;
        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

// Запускаем JS версию
window.addEventListener('load', () => {
    new AdvancedTicker('ticker-js', 'ticker-text-js');
});