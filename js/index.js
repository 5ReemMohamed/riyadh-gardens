document.addEventListener("DOMContentLoaded", function () {
  const marqueeBar = document.querySelector(".marquee-bar");

  if (marqueeBar) {
    const marqueeTrack = marqueeBar.querySelector(".marquee-track");

    if (marqueeTrack) {
      marqueeBar.addEventListener("mouseenter", function () {
        marqueeTrack.style.animationPlayState = "paused";
      });

      marqueeBar.addEventListener("mouseleave", function () {
        marqueeTrack.style.animationPlayState = "running";
      });
    }
  }

     const menuBtn = document.querySelector(".mobile-menu-btn");
    const navbarLinks = document.querySelector(".navbar-links");
    const heroNavbar = document.querySelector(".riyadh-navbar");

    if (menuBtn && navbarLinks) {

        menuBtn.addEventListener("click", () => {

            navbarLinks.classList.toggle("show");

            const icon = menuBtn.querySelector("i");

            if (navbarLinks.classList.contains("show")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });


        navbarLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navbarLinks.classList.remove("show");

                const icon = menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    window.addEventListener("scroll", () => {

        if (!heroNavbar) return;

        if (window.scrollY > 40) {

            heroNavbar.classList.add("navbar-scrolled");

        } else {

            heroNavbar.classList.remove("navbar-scrolled");

        }

    });


    const counters = document.querySelectorAll(".hero-stat strong");

    const animateCounter = (element) => {

        const targetText = element.textContent.trim();

        const number = parseInt(targetText.replace(/\D/g, ""));

        if (isNaN(number)) return;

        const suffix = targetText.replace(/[0-9]/g, "");

        let current = 0;

        const duration = 1500;

        const start = performance.now();

        const update = (time) => {

            const progress = Math.min(
                (time - start) / duration,
                1
            );

            const ease = 1 - Math.pow(1 - progress, 3);

            current = Math.floor(number * ease);

            element.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = targetText;
            }

        };

        requestAnimationFrame(update);

    };


    const statsObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    counters.forEach(counter => {
                        animateCounter(counter);
                    });

                    statsObserver.disconnect();

                }

            });

        },
        {
            threshold: 0.5
        }
    );


    const stats = document.querySelector(".hero-stats");

    if (stats) {
        statsObserver.observe(stats);
    }
const features = document.querySelectorAll(".about-feature");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    features.forEach((feature, index) => {
        feature.style.opacity = "0";
        feature.style.transform = "translateY(25px)";
        feature.style.transition = `opacity .6s ease ${index * 0.1}s, transform .6s ease ${index * 0.1}s`;
        observer.observe(feature);
    });

    const visual = document.querySelector(".about-visual");

    if (visual) {
        visual.addEventListener("mousemove", function (e) {
            const rect = visual.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const image = visual.querySelector(".main-image-wrapper");
            const card = visual.querySelector(".plants-card");

            if (window.innerWidth > 991) {
                image.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
                card.style.transform = `translate(${x * -10}px, ${y * -10}px)`;
            }
        });

        visual.addEventListener("mouseleave", function () {
            const image = visual.querySelector(".main-image-wrapper");
            const card = visual.querySelector(".plants-card");

            image.style.transform = "";
            card.style.transform = "";
        });
    }

    const counters2 = document.querySelectorAll(".garden-counter");

    const counterObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.target);
            const duration = 1800;
            const start = performance.now();

            function update(currentTime) {

                const progress = Math.min(
                    (currentTime - start) / duration,
                    1
                );

                const eased = 1 - Math.pow(1 - progress, 3);

                counter.textContent =
                    Math.floor(target * eased).toLocaleString("en-US");

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent =
                        target.toLocaleString("en-US");
                }
            }

            requestAnimationFrame(update);
            observer.unobserve(counter);

        });

    }, {
        threshold: 0.5
    });

    counters2.forEach(counter => {
        counterObserver.observe(counter);
    });


    const animatedElements = document.querySelectorAll(
        ".garden-service-main, .garden-small-card, .garden-stats-wrapper, .garden-contact-banner"
    );

    animatedElements.forEach((element, index) => {

        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition =
            `opacity .7s ease ${index * .08}s,
             transform .7s ease ${index * .08}s`;

    });


    const animationObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

            observer.unobserve(entry.target);

        });

    }, {
        threshold: 0.12
    });


    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });

    const processSection = document.querySelector(".riyadh-process-section");
    const processCards = document.querySelectorAll(".process-card");
    const progressLine = document.querySelector(".process-line-progress");

    if (!processSection) return;

    const processObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    processCards.forEach(function (card, index) {
                        setTimeout(function () {
                            card.classList.add("visible");
                        }, index * 160);
                    });

                    setTimeout(function () {
                        if (progressLine) {
                            progressLine.classList.add("active");
                        }
                    }, 350);

                    processObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.18
        }
    );

    processObserver.observe(processSection);

    processCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            processCards.forEach(function (item) {
                item.classList.remove("process-active");
            });

            card.classList.add("process-active");

        });

    });

    const filterButtons = document.querySelectorAll(".riyadh-filter-btn");
    const galleryItems = document.querySelectorAll(".riyadh-gallery-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {

            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const filter = this.dataset.filter;

            galleryItems.forEach(item => {
                const category = item.dataset.category;

                if (filter === "all" || category === filter) {
                    item.classList.remove("riyadh-hidden");
                } else {
                    item.classList.add("riyadh-hidden");
                }
            });
        });
    });

    const lightbox = document.getElementById("riyadhLightbox");
    const lightboxImage = document.getElementById("riyadhLightboxImage");
    const lightboxCaption = document.getElementById("riyadhLightboxCaption");
    const closeButton = document.getElementById("riyadhLightboxClose");
    const prevButton = document.getElementById("riyadhLightboxPrev");
    const nextButton = document.getElementById("riyadhLightboxNext");

    const galleryButtons = Array.from(
        document.querySelectorAll(".riyadh-gallery-view")
    );

    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;

        const button = galleryButtons[currentIndex];

        lightboxImage.src = button.dataset.image;
        lightboxImage.alt = button.dataset.title;
        lightboxCaption.textContent = button.dataset.title;

        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % galleryButtons.length;
        openLightbox(currentIndex);
    }

    function showPrevious() {
        currentIndex =
            (currentIndex - 1 + galleryButtons.length) %
            galleryButtons.length;

        openLightbox(currentIndex);
    }

    galleryButtons.forEach((button, index) => {
        button.addEventListener("click", function (event) {
            event.stopPropagation();
            openLightbox(index);
        });
    });

    closeButton.addEventListener("click", closeLightbox);
    nextButton.addEventListener("click", showNext);
    prevButton.addEventListener("click", showPrevious);

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (event) {

        if (!lightbox.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            showNext();
        }

        if (event.key === "ArrowRight") {
            showPrevious();
        }
    });

    const modal = document.getElementById("riyadhVideoModal");
    const video = document.getElementById("riyadhModalVideo");
    const source = document.getElementById("riyadhModalSource");
    const buttons = document.querySelectorAll(".riyadh-video-play");

    if (!modal || !video || !source || !buttons.length) return;

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            const videoSrc = this.dataset.video;
            const posterSrc = this.dataset.poster;

            if (!videoSrc) return;

            source.src = videoSrc;
            video.poster = posterSrc || "";

            video.load();

        });

    });

    modal.addEventListener("shown.bs.modal", function () {

        video.currentTime = 0;

        video.play().catch(() => {});

    });

    modal.addEventListener("hidden.bs.modal", function () {

        video.pause();
        video.currentTime = 0;

        source.src = "";
        video.load();

    });
   
    const videoObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                const video = entry.target.querySelector(".riyadh-project-video");

                if (!entry.isIntersecting && !video.paused) {
                    video.pause();

                    const icon = entry.target.querySelector(".riyadh-video-play i");

                    icon.classList.remove("fa-pause");
                    icon.classList.add("fa-play");

                    entry.target.classList.remove("is-playing");
                }
            });
        },
        {
            threshold: 0.25
        }
    );

     const faqItems = document.querySelectorAll(".ry-faq-item");
    const contactForm = document.getElementById("ryContactForm");
    const formError = document.getElementById("ryFormError");
    const currentYear = document.getElementById("ryCurrentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    faqItems.forEach(function (item) {
        const button = item.querySelector(".ry-faq-question");

        button.addEventListener("click", function () {
            const shouldOpen = !item.classList.contains("active");

            faqItems.forEach(function (faqItem) {
                faqItem.classList.remove("active");

                const faqButton = faqItem.querySelector(".ry-faq-question");
                faqButton.setAttribute("aria-expanded", "false");
            });

            if (shouldOpen) {
                item.classList.add("active");
                button.setAttribute("aria-expanded", "true");
            }
        });
    });

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (formError) {
                formError.hidden = true;
                formError.textContent = "";
            }

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const name = document.getElementById("ryName").value.trim();
            const phone = document.getElementById("ryPhone").value.trim();
            const service = document.getElementById("ryService").value;
            const area = document.getElementById("ryArea").value;
            const message = document.getElementById("ryMessage").value.trim();

            const phoneDigits = phone.replace(/[^\d+]/g, "");

            if (name.length < 2) {
                showFormError("يرجى كتابة الاسم بشكل صحيح.");
                return;
            }

            if (!/^[+]?[\d]{8,15}$/.test(phoneDigits)) {
                showFormError("يرجى إدخال رقم جوال صحيح مع رمز الدولة عند الحاجة.");
                return;
            }

            const whatsappMessage = [
                "السلام عليكم، أرغب في التواصل مع مشتل الرياض.",
                "",
                "الاسم: " + name,
                "رقم الجوال: " + phone,
                "الخدمة المطلوبة: " + service,
                "مساحة الحديقة: " + area,
                "تفاصيل الطلب: " + (message || "لم تتم إضافة تفاصيل"),
                "",
                "الموقع: الرياض، المملكة العربية السعودية"
            ].join("\n");

            const whatsappUrl =
                "https://wa.me/966549356309?text=" +
                encodeURIComponent(whatsappMessage);

            const whatsappWindow = window.open(
                whatsappUrl,
                "_blank",
                "noopener,noreferrer"
            );

            if (!whatsappWindow && formError) {
                formError.textContent =
                    "تعذر فتح واتساب تلقائيًا. يرجى السماح بالنوافذ المنبثقة أو التواصل مباشرة على الرقم 0549356309.";
                formError.hidden = false;
            }
        });
    }

    function showFormError(message) {
        if (formError) {
            formError.textContent = message;
            formError.hidden = false;
        }
    }
});
