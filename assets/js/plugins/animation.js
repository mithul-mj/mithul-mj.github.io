/*
 * RBT Animation JS
 * (c) 2024 Sabbir Hossen
 * Released under the RBT license
 */

// Class names for different scroll and animation states
const RBT_SCROLL_ACTIVATION = "tmp-scroll-trigger";
    RBT_SCROLL_OFFSCREEN_ACTIVATION = "tmp-scroll-trigger--offscreen",
    RBT_SCROLL_ZOOM_IN_ACTIVATION = "animate--zoom-in",
    RBT_SCROLL_CANCEL_ACTIVATION = "tmp-scroll-trigger--cancel";


// Handle intersection events for scroll animations
function onIntersection(entries, observer) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const elementTarget = entry.target;
            if ($(elementTarget).hasClass(RBT_SCROLL_OFFSCREEN_ACTIVATION)) {
                $(elementTarget).removeClass(RBT_SCROLL_OFFSCREEN_ACTIVATION);
                if ($(elementTarget).attr("data-cascade")) {
                    $(elementTarget).css("--animation-order", index);
                }
            }
            observer.unobserve(elementTarget);
        } else {
            $(entry.target).addClass(RBT_SCROLL_OFFSCREEN_ACTIVATION);
            $(entry.target).removeClass(RBT_SCROLL_CANCEL_ACTIVATION);
        }
    });
}

// Initialize scroll animation triggers
function initializeScrollAnimationTrigger(rootEl = document, isDesignModeEvent = false) {
    const animationTriggerElements = $(rootEl).find(`.${RBT_SCROLL_ACTIVATION}`);
    if (animationTriggerElements.length === 0) return;

    if (isDesignModeEvent) {
        animationTriggerElements.each(function() {
            $(this).addClass("tmp-scroll-trigger--design-mode");
        });
        return;
    }

    const observer = new IntersectionObserver(onIntersection, {
        rootMargin: "0px 0px -50px 0px"
    });
    animationTriggerElements.each(function() {
        observer.observe(this);
    });
}

// Initialize zoom-in animation triggers
function initializeScrollZoomAnimationTrigger() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animationTriggerElements = $(`.${RBT_SCROLL_ZOOM_IN_ACTIVATION}`);
    if (animationTriggerElements.length === 0) return;

    const scaleAmount = 0.2 / 100;
    animationTriggerElements.each(function() {
        const element = this;
        let elementIsVisible = false;

        new IntersectionObserver(entries => {
            entries.forEach(entry => {
                elementIsVisible = entry.isIntersecting;
            });
        }).observe(element);

        $(element).css("--zoom-in-ratio", 1 + scaleAmount * percentageSeen(element));
        $(window).on("scroll", throttle(() => {
            if (elementIsVisible) {
                $(element).css("--zoom-in-ratio", 1 + scaleAmount * percentageSeen(element));
            }
        }, 100), {
            passive: true
        });
    });
}

// Calculate the percentage of the element that is visible
function percentageSeen(element) {
    const viewportHeight = window.innerHeight,
        scrollY = window.scrollY,
        elementPositionY = $(element).offset().top,
        elementHeight = $(element).outerHeight();

    if (elementPositionY > scrollY + viewportHeight) return 0;
    if (elementPositionY + elementHeight < scrollY) return 100;

    let percentage = (scrollY + viewportHeight - elementPositionY) / ((viewportHeight + elementHeight) / 100);
    return Math.round(percentage);
}

// Initialize animations and remove initial opacity class from swiper slides
$(document).ready(() => {
    $(".swiper-slide.opacity-0").each(function() {
        $(this).removeClass("opacity-0");
    });
    initializeScrollAnimationTrigger();
    initializeScrollZoomAnimationTrigger();
});

// Throttle the scroll event to improve performance
function throttle(fn, wait) {
    let time = Date.now();
    return function() {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}
