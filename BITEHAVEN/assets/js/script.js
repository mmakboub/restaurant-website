"use strict";

/**
 * PRELOAD
 *
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
};

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
};

heroSliderPrevBtn.addEventListener("click", slidePrev);
document.addEventListener("DOMContentLoaded", function() {
  const menuFilters = document.querySelectorAll("#menu-flters li");
  const menuItems = document.querySelectorAll(".menu-item");

  menuFilters.forEach(filter => {
    filter.addEventListener("click", function() {
      const filterValue = this.getAttribute("data-filter");
      console.log(filterValue, menuItems);
      menuFilters.forEach(f => f.classList.remove("filter-active"));
      this.classList.add("filter-active");
      menuItems.forEach(item => {
        if (filterValue === "*") {
          item.classList.remove("hidden");
        } else {
          if (item.classList.contains(filterValue.slice(1))) {
            item.classList.remove("hidden");
          } else {
            item.classList.add("hidden");
          }
        }
      });
    });
  });
});

document.getElementById('reservationForm').addEventListener('submit', function(event) {
  // Get form elements
  var name = document.getElementById('name').value.trim();
  var phone = document.getElementById('phone').value.trim();
  var message = document.getElementById('message').value.trim();

  // Regular expression for phone validation
  var phonePattern = /^\+?[0-9]{10,15}$/;

  // Clear previous error messages
  document.querySelectorAll('.error-message').forEach(function(errorMsg) {
    errorMsg.remove();
  });

  // Initialize error flag
  var hasError = false;

  // Validate name
  if (name === '') {
    displayError('name', 'Name is required.');
    hasError = true;
  }

  // Validate phone
  if (phone === '') {
    displayError('phone', 'Phone number is required.');
    hasError = true;
  } else if (!phonePattern.test(phone)) {
    displayError('phone', 'Please enter a valid phone number.');
    hasError = true;
  }

  // Validate message
  if (message === '') {
    displayError('message', 'Message is required.');
    hasError = true;
  }

  // If there's any error, prevent form submission
  if (hasError) {
    event.preventDefault();
    return; // Exit the function if there's an error
  }

  const formData = new FormData(document.getElementById("reservationForm"));

  fetch("https://formspree.io/f/mayrarzp", {
    method: "POST",
    body: formData,
    headers: {
      "Accept": "application/json"
    }
  })
  .then(response => {
    if (response.ok) {
      alert("Reservation sent successfully!");
      document.getElementById("reservationForm").reset(); // Reset form fields
    } else {
      alert("Error submitting form. Please try again later.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Error submitting form. Please try again later.");
  });
});

function displayError(inputId, message) {
  var inputElement = document.getElementById(inputId);
  var errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  inputElement.parentElement.appendChild(errorElement);
}
