// Улучшенный параллакс эффект + параллакс от мыши
let mouseX = 0;
let mouseY = 0;

// Отслеживание мыши
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('.content-section');


    // Эффект для hero секции
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const heroRate = scrolled * 0.5;
        heroSection.style.transform = `translateY(${heroRate}px)`;
    }
});

// // Параллакс от мыши для UI элементов
// function updateMouseParallax() {
//     const uiElements = document.querySelectorAll('.ui-element');
//
//     uiElements.forEach((element, index) => {
//         // Проверяем, что элемент видим на экране (не на мобильных)
//         if (window.innerWidth > 768) {
//             const moveX = mouseX * (10 + index * 3);
//             const moveY = mouseY * (8 + index * 2);
//
//             element.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
//         }
//     });
//
//     requestAnimationFrame(updateMouseParallax);
// }
//
// // Запускаем параллакс от мыши
// updateMouseParallax();

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдение за элементами контента
document.addEventListener('DOMContentLoaded', () => {
    const contentElements = document.querySelectorAll('.content-text, .content-image');

    contentElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.25, 0.25, 1)';
        observer.observe(el);
    });
});
