'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageSlider = function () {
    function ImageSlider(imageSliderElement) {
        _classCallCheck(this, ImageSlider);

        this.time = 0; //rotation time
        this.timeout = null; //timer
        this.sloganTimeout = null; //timer for the logo fading
        this.images = $(imageSliderElement).find('.image-slider-image');
        this.indices = $(imageSliderElement).find('.image-slider-index');

        this.slogan = $(imageSliderElement).find('.image-slider-slogan');
        if (this.slogan.length > 0) {
            this.slogan = this.slogan[0];
        }

        if (this.images.length > 0) {
            this.currentIndex = 0;
        }
        this.changeImageToIndex(this.currentIndex);
        this.setupListeners(imageSliderElement);
    }

    _createClass(ImageSlider, [{
        key: 'setupListeners',
        value: function setupListeners(imageSliderElement) {
            var _this = this;

            //Side buttons
            $(imageSliderElement).find('.image-slider-button-right').click(function (event) {
                event.preventDefault();
                _this.handleRightButton();
            });
            $(imageSliderElement).find('.image-slider-button-left').click(function (event) {
                event.preventDefault();
                _this.handleLeftButton();
            });

            //Indices
            $(this.indices).click(function (event) {
                event.preventDefault();
                _this.handleIndexClicked(event);
            });
        }
    }, {
        key: 'handleIndexClicked',
        value: function handleIndexClicked(event) {
            this.timedSloganHide();
            this.clearClock();
            var index = $(event.target).attr('imageIndex');
            this.changeImageToIndex(index);
        }
    }, {
        key: 'handleRightButton',
        value: function handleRightButton() {
            this.timedSloganHide();
            this.clearClock();
            this.nextImage();
        }
    }, {
        key: 'handleLeftButton',
        value: function handleLeftButton() {
            this.timedSloganHide();
            this.clearClock();
            this.prevImage();
        }

        //hides the logo for a set amount of time

    }, {
        key: 'timedSloganHide',
        value: function timedSloganHide() {
            var _this2 = this;

            this.hideSlogan();
            //if we haven't made a timer yet, make one
            //otherwise, reset a previous timer
            if (this.sloganTimeout != null) {
                clearTimeout(this.sloganTimeout);
            }
            this.sloganTimeout = setTimeout(function () {
                _this2.showSlogan();
            }, this.time);
        }
    }, {
        key: 'hideSlogan',
        value: function hideSlogan() {
            if (this.slogan) {
                $(this.slogan).addClass('image-slider-slogan-hidden');
                $(this.images).addClass('image-slider-image-bright');
            }
        }
    }, {
        key: 'showSlogan',
        value: function showSlogan() {
            if (this.slogan) {
                $(this.slogan).removeClass('image-slider-slogan-hidden');
                $(this.images).removeClass('image-slider-image-bright');
            }
        }

        //Clears the clock and restarts the rotation if there is one

    }, {
        key: 'clearClock',
        value: function clearClock() {
            if (typeof this.timeout !== 'undefined') {
                clearTimeout(this.timout);
                this.rotate(this.time);
            }
        }

        //Change the image to the index specified

    }, {
        key: 'changeImageToIndex',
        value: function changeImageToIndex(index) {
            if (typeof index != 'undefined' && index >= 0) {
                if (index < this.images.length) {
                    $(this.images).removeClass('image-slider-image-active');
                    $(this.images[index]).addClass('image-slider-image-active');
                }
                if (index < this.indices.length) {
                    $(this.indices).removeClass('image-slider-index-active');
                    $(this.indices[index]).addClass('image-slider-index-active');
                }
                this.currentIndex = index;
            }
        }

        //Go to the next image

    }, {
        key: 'nextImage',
        value: function nextImage() {
            if (typeof this.currentIndex === 'undefined') {
                return;
            }

            var nextIndex = parseInt(this.currentIndex) + 1;
            if (nextIndex > this.images.length) {
                this.currentIndex = 0;
            } else {
                this.currentIndex = nextIndex;
            }
            this.changeImageToIndex(this.currentIndex);
        }

        //Go to the previous image

    }, {
        key: 'prevImage',
        value: function prevImage() {
            if (typeof this.currentIndex === 'undefined') {
                return;
            }
            var prevIndex = parseInt(this.currentIndex) - 1;
            if (prevIndex < 0) {
                this.currentIndex = this.images.length - 1;
            } else {
                this.currentIndex = prevIndex;
            }
            this.changeImageToIndex(this.currentIndex);
        }

        //Rotate through the images given a specific amount of time

    }, {
        key: 'rotate',
        value: function rotate(time) {
            var _this3 = this;

            this.time = time;
            this.timout = setTimeout(function () {
                _this3.nextImage();
                _this3.rotate(time);
            }, time);
        }
    }]);

    return ImageSlider;
}();

//Easy way to handle multiple sliders on the same page


function createSliders() {
    $('.image-slider').each(function () {
        var slider = new ImageSlider($(this));
        slider.rotate(5000);
    });
}

//When the document has loaded, let's create our sliders
$(document).ready(function () {
    createSliders();
});