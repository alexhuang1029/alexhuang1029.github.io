document.addEventListener("DOMContentLoaded", function() {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    // captions must match the slide order in the about page
    // Updated to match new slide order: vlareplica, robometer, theta, smishsmashing, neurotrace, shtem, microbots
    const captions = [
      "VLA-REPLICA: A Low-Cost, Reproducible Benchmark for Real-World Evaluation of Vision-Language-Action Models",
      "Robometer: Scaling General-Purpose Robotic Reward Models via Trajectory Comparisons",
      "THETA: Triangulated Hand-State Estimation for Teleoperation and Automation in Robotic Hand Control",
      "SmishSmashing: A System Software Utilizing LLMs to Detect SMS Phishing Scams",
      "NeuroTrace: Detect Neurodegeneration through Handwriting Kinematics Analysis",
      "Optimizing Large Language Models: Learning from Mistakes in Gameplay",
      "Hamilton Microbots / Microbots event post"
    ];

    const captionEl = document.querySelector('#slideshow-caption');

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      if (captionEl) captionEl.textContent = captions[index] || '';
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

    // Show the initial slide on load so the first image is visible
    showSlide(currentIndex);

    setInterval(() => window.changeSlide(1), 4000);
});