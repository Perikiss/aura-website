/* AURA Skincare — Assignment 5
   JavaScript behavior is kept separate from HTML and CSS. */

document.addEventListener("DOMContentLoaded", () => {
    // Product data: objects stored in an array.
    const products = [
        { id: 1, name: "Daily Cream", category: "moisturizer", description: "A soft cream for daily skin hydration.", price: 18, image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80", alt: "Daily face cream" },
        { id: 2, name: "Glow Serum", category: "serum", description: "A lightweight serum for a fresh look.", price: 22, image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80", alt: "Glow serum bottle" },
        { id: 3, name: "Soft Cleanser", category: "cleanser", description: "A gentle cleanser for everyday use.", price: 16, image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80", alt: "Soft facial cleanser" },
        { id: 4, name: "Calm Moisturizer", category: "moisturizer", description: "A comfortable moisturizer for a soft finish.", price: 20, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80", alt: "Moisturizing skincare product" },
        { id: 5, name: "Fresh Cleanser", category: "cleanser", description: "A simple first step for your daily routine.", price: 14, image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800&q=80", alt: "Cleanser and skincare products" },
        { id: 6, name: "Dew Serum", category: "serum", description: "A light serum for a fresh-looking complexion.", price: 24, image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&q=80", alt: "Serum skincare bottle" }
    ];

    const translations = {
        en: {
            navHome:"Home", navAbout:"About", navCollection:"Collection", navContact:"Contact", languageLabel:"Language",
            themeButton:"Day / Night", colorButton:"Change background", timeButton:"Show time", hideTimeButton:"Hide time", soundButton:"Play sound",
            heroEyebrow:"YOUR DAILY SKINCARE RITUAL", heroTitle:"Simple care for healthy skin", heroDescription:"Discover gentle skincare products for your everyday routine.", viewCollection:"View Collection", readMore:"Read more", readLess:"Read less", moreAbout:"AURA believes that skincare should feel simple, calm and personal. Build a routine that works for you, one gentle step at a time.",
            whyAura:"Why choose AURA?", gentleFormulas:"Gentle formulas", gentleText:"Our products are made for comfortable everyday skincare.", simpleRoutine:"Simple routine", routineText:"Easy steps that help you care for your skin every day.", freshFeeling:"Fresh feeling", freshText:"Light textures and a clean, fresh skincare experience.", faqTitle:"Frequently Asked Questions", faqQ1:"How do I start a skincare routine?", faqA1:"Start with a gentle cleanser, moisturizer, and sunscreen in the morning. Add new products slowly.", faqQ2:"How often should I use serum?", faqA2:"Follow the product instructions. Many serums can be used once or twice a day, depending on the formula.", faqQ3:"Can I use several products together?", faqA3:"Yes, but introduce products gradually and stop using anything that causes irritation.",
            aboutTitle:"About Us", aboutSubtitle:"Small steps, healthy skin, natural confidence.", ourStory:"Our story", storyP1:"AURA was created for people who want a simple and pleasant skincare routine.", storyP2:"We believe skincare should be easy, calm and enjoyable.", ourValues:"Our values", value1:"Care for your skin", value2:"Choose simple products", value3:"Be consistent every day", ourTeam:"Our team",
            collectionTitle:"Our Collection", collectionSubtitle:"Products for a simple daily routine.", filterTitle:"Find your skincare", filterHelp:"Choose a category to filter the products.", filterAll:"All products", filterCleanser:"Cleansers", filterSerum:"Serums", filterMoisturizer:"Moisturizers", ratingTitle:"Rate a product", ratingHelp:"Click the stars on any product card to choose your rating.", dailyRoutine:"Daily routine table", tableProduct:"Product", tableTime:"Time", tablePurpose:"Purpose",
            contactTitle:"Contact Us", contactSubtitle:"Have a question? Send us a message.", contactFormTitle:"Send us a message", nameLabel:"Name", emailLabel:"Email", favoriteProduct:"Favorite product", chooseColor:"Choose a color", newsQuestion:"Would you like to receive news?", yesLabel:"Yes", noLabel:"No", messageLabel:"Message", sendMessage:"Send Message", resetForm:"Reset form", formDemoNote:"Demo form: this assignment shows a success message but does not send data to a real server."
        },
        ru: {
            navHome:"Главная", navAbout:"О нас", navCollection:"Коллекция", navContact:"Контакты", languageLabel:"Язык",
            themeButton:"День / ночь", colorButton:"Изменить фон", timeButton:"Показать время", hideTimeButton:"Скрыть время", soundButton:"Звук",
            heroEyebrow:"ВАШ ЕЖЕДНЕВНЫЙ УХОД", heroTitle:"Простой уход для здоровой кожи", heroDescription:"Откройте для себя мягкие средства для ежедневного ухода.", viewCollection:"Смотреть коллекцию", readMore:"Подробнее", readLess:"Скрыть", moreAbout:"AURA считает, что уход должен быть простым, спокойным и индивидуальным. Создайте подходящую вам рутину — шаг за шагом.",
            whyAura:"Почему AURA?", gentleFormulas:"Мягкие формулы", gentleText:"Наши продукты подходят для комфортного ежедневного ухода.", simpleRoutine:"Простой уход", routineText:"Несложные шаги для заботы о коже каждый день.", freshFeeling:"Свежесть", freshText:"Лёгкие текстуры и ощущение чистоты.", faqTitle:"Частые вопросы", faqQ1:"Как начать уход за кожей?", faqA1:"Начните с мягкого очищения, увлажняющего крема и SPF утром. Новые средства добавляйте постепенно.", faqQ2:"Как часто использовать сыворотку?", faqA2:"Следуйте инструкции. Многие сыворотки можно использовать один или два раза в день в зависимости от состава.", faqQ3:"Можно ли сочетать несколько средств?", faqA3:"Да, но вводите продукты постепенно и прекращайте использование при раздражении.",
            aboutTitle:"О нас", aboutSubtitle:"Маленькие шаги, здоровая кожа, уверенность в себе.", ourStory:"Наша история", storyP1:"AURA создана для тех, кто хочет простой и приятный уход за кожей.", storyP2:"Мы верим, что уход должен быть лёгким, спокойным и приятным.", ourValues:"Наши ценности", value1:"Забота о коже", value2:"Простые средства", value3:"Регулярность каждый день", ourTeam:"Наша команда",
            collectionTitle:"Наша коллекция", collectionSubtitle:"Средства для простого ежедневного ухода.", filterTitle:"Найдите свой уход", filterHelp:"Выберите категорию для фильтрации продуктов.", filterAll:"Все продукты", filterCleanser:"Очищение", filterSerum:"Сыворотки", filterMoisturizer:"Увлажнение", ratingTitle:"Оцените продукт", ratingHelp:"Нажмите на звёзды в карточке продукта, чтобы поставить оценку.", dailyRoutine:"Ежедневная рутина", tableProduct:"Продукт", tableTime:"Время", tablePurpose:"Назначение",
            contactTitle:"Связаться с нами", contactSubtitle:"Есть вопрос? Отправьте нам сообщение.", contactFormTitle:"Напишите нам", nameLabel:"Имя", emailLabel:"Электронная почта", favoriteProduct:"Любимый продукт", chooseColor:"Выберите цвет", newsQuestion:"Хотите получать новости?", yesLabel:"Да", noLabel:"Нет", messageLabel:"Сообщение", sendMessage:"Отправить", resetForm:"Очистить форму", formDemoNote:"Демонстрационная форма: показывается сообщение об успехе, данные не отправляются на реальный сервер."
        },
        kk: {
            navHome:"Басты бет", navAbout:"Біз туралы", navCollection:"Өнімдер", navContact:"Байланыс", languageLabel:"Тіл",
            themeButton:"Күн / түн", colorButton:"Фонды өзгерту", timeButton:"Уақытты көрсету", hideTimeButton:"Уақытты жасыру", soundButton:"Дыбыс",
            heroEyebrow:"КҮНДЕЛІКТІ КҮТІМ", heroTitle:"Сау теріге арналған қарапайым күтім", heroDescription:"Күнделікті күтімге арналған жұмсақ өнімдерді табыңыз.", viewCollection:"Өнімдерді көру", readMore:"Толығырақ", readLess:"Жасыру", moreAbout:"AURA тері күтімі қарапайым әрі жеке болуы керек деп санайды. Өзіңізге сай күтім тәртібін біртіндеп құрыңыз.",
            whyAura:"Неліктен AURA?", gentleFormulas:"Жұмсақ құрам", gentleText:"Өнімдер күнделікті күтімге арналған.", simpleRoutine:"Қарапайым күтім", routineText:"Күн сайын теріңізге күтім жасауға арналған жеңіл қадамдар.", freshFeeling:"Балғындық", freshText:"Жеңіл текстура және тазалық сезімі.", faqTitle:"Жиі қойылатын сұрақтар", faqQ1:"Тері күтімін неден бастау керек?", faqA1:"Таңертең жұмсақ тазартқыштан, ылғалдандырғыштан және SPF-тен бастаңыз. Жаңа өнімдерді біртіндеп қосыңыз.", faqQ2:"Сарысуды қаншалықты жиі қолдану керек?", faqA2:"Өнім нұсқаулығын орындаңыз. Құрамына қарай кейбір сарысулар күніне бір немесе екі рет қолданылады.", faqQ3:"Бірнеше өнімді бірге қолдануға бола ма?", faqA3:"Иә, бірақ өнімдерді біртіндеп енгізіңіз және тітіркену болса қолдануды тоқтатыңыз.",
            aboutTitle:"Біз туралы", aboutSubtitle:"Кішкентай қадамдар, сау тері, табиғи сенімділік.", ourStory:"Біздің тарихымыз", storyP1:"AURA қарапайым әрі жағымды тері күтімін қалайтын адамдар үшін жасалды.", storyP2:"Күтім жеңіл, тыныш және жағымды болуы керек деп сенеміз.", ourValues:"Құндылықтарымыз", value1:"Теріңізге қамқор болыңыз", value2:"Қарапайым өнімдерді таңдаңыз", value3:"Күн сайын тұрақты күтім жасаңыз", ourTeam:"Біздің команда",
            collectionTitle:"Біздің өнімдер", collectionSubtitle:"Күнделікті қарапайым күтімге арналған өнімдер.", filterTitle:"Өзіңізге сай күтімді табыңыз", filterHelp:"Өнімдерді сүзу үшін санатты таңдаңыз.", filterAll:"Барлық өнім", filterCleanser:"Тазартқыштар", filterSerum:"Сарысулар", filterMoisturizer:"Ылғалдандырғыштар", ratingTitle:"Өнімді бағалау", ratingHelp:"Баға беру үшін өнім карточкасындағы жұлдыздарды басыңыз.", dailyRoutine:"Күнделікті күтім кестесі", tableProduct:"Өнім", tableTime:"Уақыт", tablePurpose:"Мақсаты",
            contactTitle:"Бізбен байланыс", contactSubtitle:"Сұрағыңыз бар ма? Бізге хабарлама жіберіңіз.", contactFormTitle:"Хабарлама жіберу", nameLabel:"Аты", emailLabel:"Электрондық пошта", favoriteProduct:"Сүйікті өнім", chooseColor:"Түсті таңдаңыз", newsQuestion:"Жаңалықтарды алғыңыз келе ме?", yesLabel:"Иә", noLabel:"Жоқ", messageLabel:"Хабарлама", sendMessage:"Жіберу", resetForm:"Пішінді тазалау", formDemoNote:"Демо-пішін: сәттілік туралы хабар көрсетіледі, бірақ деректер нақты серверге жіберілмейді."
        }
    };

    // Apply translations with a switch statement.
    function setLanguage(language) {
        let dictionary;
        switch (language) {
            case "ru": dictionary = translations.ru; break;
            case "kk": dictionary = translations.kk; break;
            default: dictionary = translations.en; language = "en";
        }
        document.documentElement.lang = language;
        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.dataset.i18n;
            if (dictionary[key]) element.textContent = dictionary[key];
        });
        const showTimeButton = document.getElementById("show-time-btn");
        const timeOutput = document.getElementById("current-time");
        if (showTimeButton && timeOutput) {
            showTimeButton.textContent = timeOutput.textContent ? dictionary.hideTimeButton : dictionary.timeButton;
        }
        const readMoreButton = document.getElementById("read-more-btn");
        if (readMoreButton) {
            const expanded = readMoreButton.getAttribute("aria-expanded") === "true";
            readMoreButton.textContent = expanded ? dictionary.readLess : dictionary.readMore;
        }
        const status = document.getElementById("filter-status");
        if (status && !status.dataset.custom) status.textContent = language === "ru" ? "Показаны все продукты." : language === "kk" ? "Барлық өнім көрсетілген." : "Showing all products.";
        const ratingMessage = document.getElementById("rating-message");
        if (ratingMessage && !ratingMessage.dataset.custom) ratingMessage.textContent = language === "ru" ? "Оценка ещё не выбрана." : language === "kk" ? "Баға әлі таңдалмады." : "No rating selected yet.";
        // Re-render the product list so its status message follows the selected language.
        if (typeof currentFilter !== "undefined") renderProducts(currentFilter);
    }

    const languageSelect = document.getElementById("language-select");
    if (languageSelect) {
        languageSelect.addEventListener("change", (event) => setLanguage(event.target.value));
    }

    // Day/night theme: a CSS class keeps visual styling separate from behavior.
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("night-theme");
            document.body.style.removeProperty("--bg");
            document.body.style.backgroundColor = "";
            themeToggle.setAttribute("aria-pressed", String(document.body.classList.contains("night-theme")));
            playClickSound(520);
        });
    }

    // Direct dynamic styling: cycle through background colors.
    const colorButton = document.getElementById("color-btn");
    const backgroundColors = ["#fffaf7", "#f8e9e2", "#f1e7dc", "#e8e8dd", "#f5e6e8"];
    let currentColorIndex = 0;
    if (colorButton) {
        colorButton.addEventListener("click", () => {
            currentColorIndex = (currentColorIndex + 1) % backgroundColors.length;
            // Change the page background without switching off night mode.
            document.body.style.setProperty("--bg", backgroundColors[currentColorIndex]);
            playClickSound(620);
        });
    }

    // Button event: show current local time on demand.
    const showTimeButton = document.getElementById("show-time-btn");
    const timeOutput = document.getElementById("current-time");
    if (showTimeButton && timeOutput) {
        showTimeButton.addEventListener("click", () => {
            const language = languageSelect ? languageSelect.value : "en";
            const dictionary = translations[language] || translations.en;
            if (timeOutput.textContent) {
                timeOutput.textContent = "";
                showTimeButton.textContent = dictionary.timeButton;
                timeOutput.classList.remove("pulse");
            } else {
                timeOutput.textContent = new Date().toLocaleTimeString();
                showTimeButton.textContent = dictionary.hideTimeButton;
                timeOutput.classList.remove("pulse");
                void timeOutput.offsetWidth;
                timeOutput.classList.add("pulse");
            }
        });
    }

    // Sound effect made with Web Audio API; audio starts only after a user click.
    function playClickSound(frequency = 660) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        try {
            const audioContext = new AudioContextClass();
            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();
            oscillator.type = "sine";
            oscillator.frequency.value = frequency;
            gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.18);
            oscillator.connect(gain);
            gain.connect(audioContext.destination);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
            oscillator.onended = () => audioContext.close();
        } catch (error) {
            console.info("Audio is not available in this browser.", error);
        }
    }
    const soundButton = document.getElementById("play-sound-btn");
    if (soundButton) soundButton.addEventListener("click", () => playClickSound(740));

    // Read More toggles the extra text by changing the hidden attribute.
    const readMoreButton = document.getElementById("read-more-btn");
    const moreContent = document.getElementById("more-about-aura");
    if (readMoreButton && moreContent) {
        readMoreButton.addEventListener("click", () => {
            const willOpen = moreContent.hidden;
            moreContent.hidden = !willOpen;
            readMoreButton.setAttribute("aria-expanded", String(willOpen));
            const language = languageSelect ? languageSelect.value : "en";
            readMoreButton.textContent = willOpen ? translations[language].readLess : translations[language].readMore;
            if (willOpen) moreContent.classList.add("content-pop");
            playClickSound(580);
        });
    }

    // Keyboard navigation: use Left/Right or Up/Down arrows while a nav link is focused.
    const navLinks = Array.from(document.querySelectorAll(".nav-menu a"));
    navLinks.forEach((link, index) => {
        link.addEventListener("keydown", (event) => {
            let nextIndex = index;
            if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % navLinks.length;
            else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + navLinks.length) % navLinks.length;
            else return;
            event.preventDefault();
            navLinks[nextIndex].focus();
        });
    });

    // Contact form: asynchronous demo callback, no page reload and no real server request.
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            if (!contactForm.reportValidity()) return;
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            formStatus.textContent = "Sending your message...";
            await new Promise((resolve) => window.setTimeout(resolve, 500));
            const name = document.getElementById("name").value.trim();
            formStatus.textContent = `Thank you, ${name}! Your demo message was submitted successfully.`;
            formStatus.classList.add("success-message");
            submitButton.disabled = false;
            playClickSound(700);
        });
    }

    // Reset form button uses querySelectorAll and a loop to clear controls.
    const resetFormButton = document.getElementById("reset-form-btn");
    if (resetFormButton && contactForm) {
        resetFormButton.addEventListener("click", () => {
            contactForm.querySelectorAll("input, textarea, select").forEach((field) => {
                if (field.type === "radio" || field.type === "checkbox") field.checked = false;
                else if (field.type === "color") field.value = "#c98f80";
                else field.value = "";
            });
            formStatus.textContent = "";
            formStatus.classList.remove("success-message");
            playClickSound(460);
        });
    }

    // Higher-order functions: filter() selects products and map() creates card markup.
    const productGrid = document.getElementById("product-grid");
    const filterButtons = document.querySelectorAll("[data-filter]");
    const filterStatus = document.getElementById("filter-status");
    const ratingMessage = document.getElementById("rating-message");
    let currentFilter = "all";

    function renderProducts(category = "all") {
        if (!productGrid) return;
        const visibleProducts = products.filter((product) => category === "all" || product.category === category);
        // A classic for loop demonstrates array iteration and calculates the visible product value.
        let visibleProductValue = 0;
        for (let index = 0; index < visibleProducts.length; index += 1) {
            visibleProductValue += visibleProducts[index].price;
        }
        productGrid.innerHTML = visibleProducts.map((product) => `
            <article class="product-card product-flip-card reveal-on-scroll" data-product-id="${product.id}">
                <div class="product-flip-inner">
                    <div class="product-face product-front">
                        <img src="${product.image}" alt="${product.alt}" loading="lazy">
                        <p class="product-category">${product.category}</p>
                        <h3>${product.name}</h3>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                        <button type="button" class="flip-toggle" aria-expanded="false">Discover product ✨</button>
                    </div>
                    <div class="product-face product-back">
                        <p class="eyebrow">AURA DETAILS</p>
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p class="product-category">Category: ${product.category}</p>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                        <p class="product-rating-label">No rating yet</p>
                        <div class="star-rating" role="group" aria-label="Rate ${product.name}">
                            ${[1,2,3,4,5].map((star) => `<button type="button" class="rating-star" data-rating="${star}" aria-label="Rate ${star} out of 5">★</button>`).join("")}
                        </div>
                        <button type="button" class="flip-toggle flip-back-button" aria-expanded="true">Back to product ↩</button>
                    </div>
                </div>
            </article>`).join("");
        productGrid.querySelectorAll(".flip-toggle").forEach((button) => {
            button.addEventListener("click", () => {
                const card = button.closest(".product-flip-card");
                const flipped = card.classList.toggle("is-flipped");
                card.querySelectorAll(".flip-toggle").forEach((toggle) => toggle.setAttribute("aria-expanded", String(flipped)));
                playClickSound(flipped ? 680 : 520);
            });
        });
        attachRatingHandlers();
        observeRevealElements();
        if (filterStatus) {
            filterStatus.dataset.custom = "true";
            const language = languageSelect ? languageSelect.value : "en";
            const categoryLabels = { en: { all:"Showing all products", cleanser:"Showing cleansers", serum:"Showing serums", moisturizer:"Showing moisturizers" }, ru: { all:"Показаны все продукты", cleanser:"Показаны средства для очищения", serum:"Показаны сыворотки", moisturizer:"Показаны увлажняющие средства" }, kk: { all:"Барлық өнім көрсетілген", cleanser:"Тазартқыштар көрсетілген", serum:"Сарысулар көрсетілген", moisturizer:"Ылғалдандырғыштар көрсетілген" } };
            const categoryText = (categoryLabels[language] || categoryLabels.en)[category];
            const summary = language === "ru" ? `Количество: ${visibleProducts.length}. Сумма цен: $${visibleProductValue.toFixed(2)}.` : language === "kk" ? `Өнім саны: ${visibleProducts.length}. Бағалар сомасы: $${visibleProductValue.toFixed(2)}.` : `${visibleProducts.length} products. Total listed value: $${visibleProductValue.toFixed(2)}.`;
            filterStatus.textContent = `${categoryText}. ${summary}`;
        }
    }

    function attachRatingHandlers() {
        // querySelectorAll targets all stars; forEach attaches a click callback to each one.
        document.querySelectorAll(".rating-star").forEach((starButton) => {
            starButton.addEventListener("click", () => {
                const card = starButton.closest(".product-card");
                const selectedRating = Number(starButton.dataset.rating);
                card.dataset.selectedRating = String(selectedRating);
                card.querySelectorAll(".rating-star").forEach((star) => {
                    star.classList.toggle("selected", Number(star.dataset.rating) <= selectedRating);
                });
                card.querySelector(".product-rating-label").textContent = `${selectedRating} / 5 stars`;
                if (ratingMessage) {
                    ratingMessage.dataset.custom = "true";
                    ratingMessage.textContent = `You rated ${card.querySelector("h3").textContent}: ${selectedRating} out of 5 stars.`;
                }
                card.classList.remove("card-bounce");
                void card.offsetWidth;
                card.classList.add("card-bounce");
                playClickSound(500 + selectedRating * 60);
            });
        });
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            currentFilter = button.dataset.filter;
            filterButtons.forEach((filterButton) => filterButton.classList.toggle("active", filterButton === button));
            renderProducts(currentFilter);
            playClickSound(560);
        });
    });
    renderProducts(currentFilter);

    // Scroll-triggered reveal animations; graceful fallback if IntersectionObserver is unavailable.
    function observeRevealElements() {
        const elements = document.querySelectorAll(".reveal-on-scroll:not(.is-visible)");
        if (!("IntersectionObserver" in window)) {
            elements.forEach((element) => element.classList.add("is-visible"));
            return;
        }
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        elements.forEach((element) => observer.observe(element));
    }
    observeRevealElements();

    // Short branded loading screen on each page. It respects reduced-motion settings in CSS.
    const auraLoader = document.getElementById("aura-loader");
    if (auraLoader) {
        window.setTimeout(() => {
            auraLoader.classList.add("loader-hidden");
            window.setTimeout(() => auraLoader.remove(), 500);
        }, 950);
    }

    // Digital unboxing: reveal a surprise product from the collection.
    const giftModal = document.getElementById("gift-modal");
    const giftResult = document.getElementById("gift-result");
    const openGiftButtons = [document.getElementById("open-gift-btn"), document.getElementById("gift-box")].filter(Boolean);
    const closeGiftButton = document.getElementById("close-gift-btn");
    function openSurpriseGift() {
        if (!giftModal || !giftResult) return;
        const surprise = products[Math.floor(Math.random() * products.length)];
        giftResult.innerHTML = `<img src="${surprise.image}" alt="${surprise.alt}"><h3>${surprise.name}</h3><p>${surprise.description}</p><p class="product-price">$${surprise.price.toFixed(2)}</p><p class="gift-note">A little inspiration for your next skincare ritual ✨</p>`;
        giftModal.hidden = false;
        document.body.classList.add("gift-modal-open");
        const giftBox = document.getElementById("gift-box");
        if (giftBox) giftBox.classList.add("gift-opened");
        if (closeGiftButton) closeGiftButton.focus();
        playClickSound(760);
    }
    function closeSurpriseGift() {
        if (!giftModal) return;
        giftModal.hidden = true;
        document.body.classList.remove("gift-modal-open");
        const giftBox = document.getElementById("gift-box");
        if (giftBox) giftBox.classList.remove("gift-opened");
    }
    openGiftButtons.forEach((button) => button.addEventListener("click", openSurpriseGift));
    if (closeGiftButton) closeGiftButton.addEventListener("click", closeSurpriseGift);
    if (giftModal) giftModal.addEventListener("click", (event) => { if (event.target === giftModal) closeSurpriseGift(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && giftModal && !giftModal.hidden) closeSurpriseGift(); });

    // Keep the first page in English until the user chooses another language.
    if (languageSelect) setLanguage(languageSelect.value);
});
