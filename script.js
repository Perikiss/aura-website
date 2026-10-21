
document.addEventListener("DOMContentLoaded", function () {

    // TASK 1: FORM 
    const registrationForm = document.getElementById("registration-form");

    if (registrationForm) {
        const nameInput = document.getElementById("full-name");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const confirmPasswordInput =
            document.getElementById("confirm-password");
        const registrationMessage =
            document.getElementById("registration-message");

        function showError(input, errorId, message) {
            const errorElement = document.getElementById(errorId);

            errorElement.textContent = message;
            input.classList.toggle("input-invalid", message !== "");
            input.setAttribute("aria-invalid", message ? "true" : "false");
        }

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        registrationForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let isValid = true;

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            showError(nameInput, "name-error", "");
            showError(emailInput, "email-error", "");
            showError(passwordInput, "password-error", "");
            showError(
                confirmPasswordInput,
                "confirm-password-error",
                ""
            );

            registrationMessage.textContent = "";
            registrationMessage.className = "form-message";

            if (name.length < 2) {
                showError(
                    nameInput,
                    "name-error",
                    "Please enter your name (at least 2 characters)."
                );
                isValid = false;
            }

            if (!isValidEmail(email)) {
                showError(
                    emailInput,
                    "email-error",
                    "Please enter a valid email address."
                );
                isValid = false;
            }

            if (password.length < 8) {
                showError(
                    passwordInput,
                    "password-error",
                    "Password must contain at least 8 characters."
                );
                isValid = false;
            }

            if (confirmPassword === "") {
                showError(
                    confirmPasswordInput,
                    "confirm-password-error",
                    "Please confirm your password."
                );
                isValid = false;
            } else if (password !== confirmPassword) {
                showError(
                    confirmPasswordInput,
                    "confirm-password-error",
                    "Passwords do not match."
                );
                isValid = false;
            }

            if (isValid) {
                registrationMessage.textContent =
                    "Success! All fields have been validated.";
                registrationMessage.classList.add("success-message");

                registrationForm.reset();

                [
                    nameInput,
                    emailInput,
                    passwordInput,
                    confirmPasswordInput
                ].forEach(function (input) {
                    input.classList.remove("input-invalid");
                    input.removeAttribute("aria-invalid");
                });
            } else {
                registrationMessage.textContent =
                    "Please correct the errors above and try again.";
                registrationMessage.classList.add("error-message");
            }
        });

        // Clear an error when the user edits the relevant field.
        [
            nameInput,
            emailInput,
            passwordInput,
            confirmPasswordInput
        ].forEach(function (input) {
            input.addEventListener("input", function () {
                const errorId = {
                    "full-name": "name-error",
                    "email": "email-error",
                    "password": "password-error",
                    "confirm-password": "confirm-password-error"
                }[input.id];

                if (errorId) {
                    showError(input, errorId, "");
                }

                registrationMessage.textContent = "";
                registrationMessage.className = "form-message";
            });
        });
    }

    // TASK 2

    const accordionQuestions =
        document.querySelectorAll(".accordion-question");

    accordionQuestions.forEach(function (question) {
        question.addEventListener("click", function () {
            const answer = question.nextElementSibling;
            const icon = question.querySelector(".accordion-icon");
            const isOpen = question.getAttribute("aria-expanded") === "true";

            question.setAttribute("aria-expanded", String(!isOpen));

            if (isOpen) {
                answer.style.maxHeight = answer.scrollHeight + "px";

                requestAnimationFrame(function () {
                    answer.style.maxHeight = "0px";
                });

                if (icon) {
                    icon.textContent = "+";
                }

                answer.addEventListener("transitionend", function handler() {
                    if (question.getAttribute("aria-expanded") === "false") {
                        answer.hidden = true;
                    }

                    answer.removeEventListener("transitionend", handler);
                });
            } else {
                answer.hidden = false;
                answer.style.maxHeight = "0px";

                requestAnimationFrame(function () {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                });

                if (icon) {
                    icon.textContent = "−";
                }
            }
        });
    });

    // TASK 3

    const modal = document.getElementById("subscription-modal");
    const openPopupButtons = [
        document.getElementById("open-popup-btn"),
        document.getElementById("open-popup-bottom")
    ].filter(Boolean);

    const closePopupButton =
        document.getElementById("close-popup-btn");

    function openModal() {
        if (!modal) return;

        modal.hidden = false;
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        const firstInput = modal.querySelector("input");

        if (firstInput) {
            firstInput.focus();
        }
    }

    function closeModal() {
        if (!modal) return;

        modal.setAttribute("aria-hidden", "true");
        modal.hidden = true;
        document.body.classList.remove("modal-open");
    }

    openPopupButtons.forEach(function (button) {
        button.addEventListener("click", openModal);
    });

    if (closePopupButton) {
        closePopupButton.addEventListener("click", closeModal);
    }

    if (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal && !modal.hidden) {
            closeModal();
        }
    });

    // Validate the popup subscription form.
    const subscriptionForm =
        document.getElementById("subscription-form");

    if (subscriptionForm) {
        const subscriberName =
            document.getElementById("subscriber-name");
        const subscriberEmail =
            document.getElementById("subscriber-email");
        const subscriptionMessage =
            document.getElementById("subscription-message");

        subscriptionForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = subscriberName.value.trim();
            const email = subscriberEmail.value.trim();

            document.getElementById("subscriber-name-error").textContent = "";
            document.getElementById("subscriber-email-error").textContent = "";
            subscriptionMessage.textContent = "";
            subscriptionMessage.className = "form-message";

            let valid = true;

            if (name.length < 2) {
                document.getElementById("subscriber-name-error").textContent =
                    "Please enter your name.";
                valid = false;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById("subscriber-email-error").textContent =
                    "Please enter a valid email address.";
                valid = false;
            }

            if (valid) {
                subscriptionMessage.textContent =
                    "Thank you! Your form has been validated.";
                subscriptionMessage.classList.add("success-message");
                subscriptionForm.reset();
            } else {
                subscriptionMessage.textContent =
                    "Please check the information you entered.";
                subscriptionMessage.classList.add("error-message");
            }
        });
    }


    // TASk 4

    const colorButton = document.getElementById("color-btn");

    const backgroundColors = [
        "#F8F3EE",
        "#F1E2D5",
        "#E8D7C8",
        "#E8E8DD",
        "#F5E6E8"
    ];

    let currentColorIndex = 0;

    if (colorButton) {
        colorButton.addEventListener("click", function () {
            currentColorIndex =
                (currentColorIndex + 1) % backgroundColors.length;

            document.body.style.backgroundColor =
                backgroundColors[currentColorIndex];
        });
    }


    // TASK 5: 
    const dateElement = document.getElementById("current-date");
    const timeElement = document.getElementById("current-time");

    function updateDateTime() {
        const now = new Date();

        if (dateElement) {
            dateElement.textContent = now.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });
        }

        if (timeElement) {
            timeElement.textContent = now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            });
        }
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

});
