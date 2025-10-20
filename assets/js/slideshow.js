document.addEventListener("DOMContentLoaded", function() {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      slides[index].classList.add('active');
      dots[index].classList.add('active');
    }

    function _changeSlide(n) {
      currentIndex = (currentIndex + n + slides.length) % slides.length;
      showSlide(currentIndex);
    }

    function _currentSlide(n) {
      currentIndex = n;
      showSlide(currentIndex);
    }

    window.changeSlide = _changeSlide;
    window.currentSlide = _currentSlide;

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => window.currentSlide(i));
    });

    setInterval(() => window.changeSlide(1), 4000);
});