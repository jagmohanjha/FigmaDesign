const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const navLinks = document.querySelectorAll(".menu a");

menuToggle.addEventListener("click", function () {
    menu.classList.toggle("active");

    const isOpen = menu.classList.contains("active");
    menuToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        menu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

const hireButton = document.getElementById("hire-btn");

hireButton.addEventListener("click", function () {
    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });
});

const track = document.querySelector(".recommendations-track");
const cards = document.querySelectorAll(".review-card");
const nextButton = document.querySelector(".next-btn");
const prevButton = document.querySelector(".prev-btn");

let currentIndex = 0;

function getVisibleCards() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const carouselWidth = document.querySelector(".Carousel").clientWidth;
    const visibleWidth = carouselWidth - 196;

    return Math.max(
        1,
        Math.floor((visibleWidth + gap) / (cardWidth + gap))
    );
}

function updateCarousel() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;

    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, cards.length - visibleCards);

    currentIndex = Math.min(currentIndex, maxIndex);

    track.style.transform =
        `translateX(-${currentIndex * (cardWidth + gap)}px)`;

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= maxIndex;
}

nextButton.addEventListener("click", function () {
    const maxIndex = Math.max(0, cards.length - getVisibleCards());

    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
    }
});

prevButton.addEventListener("click", function () {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

window.addEventListener("resize", updateCarousel);

updateCarousel();

const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "" || email === "") {
        alert("Please enter your name and email.");
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    alert("Your form has been validated successfully!");

    contactForm.reset();
});

const revealElements = document.querySelectorAll(
    ".project-card1, .project-card2, .contact-info-card"
);

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(function (element) {
    element.classList.add("reveal");
    observer.observe(element);
});