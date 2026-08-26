(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.querySelector(".mobile-nav");

  function closeNav() {
    mobileNav.classList.remove("open");
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function openNav() {
    mobileNav.classList.add("open");
    document.body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    var firstLink = mobileNav.querySelector("a");
    if (firstLink) firstLink.focus();
  }

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      if (mobileNav.classList.contains("open")) {
        closeNav();
      } else {
        openNav();
      }
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileNav.classList.contains("open")) {
        closeNav();
        toggle.focus();
      }
    });
  }

  // Contact form: mailto fallback (backend TBD)
  var form = document.querySelector("#enquiry-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var firstName = form.querySelector("#firstName").value.trim();
      var lastName = form.querySelector("#lastName").value.trim();
      var email = form.querySelector("#email").value.trim();
      var phone = form.querySelector("#phone").value.trim();
      var message = form.querySelector("#message").value.trim();

      var subject = "Website enquiry from " + firstName + " " + lastName;
      var bodyLines = [
        "Name: " + firstName + " " + lastName,
        "Email: " + email,
        "Phone: " + (phone || "-"),
        "",
        message
      ];

      var mailto =
        "mailto:office@rdortho.com.au" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));

      window.location.href = mailto;

      var status = form.querySelector(".form-status");
      if (status) {
        status.textContent = "Opening your email app to send this enquiry to office@rdortho.com.au…";
        status.classList.add("visible");
        status.setAttribute("role", "status");
      }
    });
  }
})();
