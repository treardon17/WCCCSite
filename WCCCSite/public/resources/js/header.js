'use strict';

function handleHeaderScroll() {
    var top = window.pageYOffset || document.documentElement.scrollTop; //top of the window
    if (top > 0) {
        $('.header-background').addClass('header-background-active');
    } else {
        $('.header-background').removeClass('header-background-active');
    }
}

var throttledUpdate = _.throttle(handleHeaderScroll, 100);

$(document).ready(function () {
    handleHeaderScroll();
    $(window).scroll(function () {
        throttledUpdate();
    });
});