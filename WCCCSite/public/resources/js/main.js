'use strict';

function currentYear() {
    var currentYear = new Date().getFullYear();
    $('.current-year').text(' ' + currentYear + '. ');
}

$(document).ready(function () {
    currentYear();
});