class ImageSlider{
    constructor(imageSliderElement){
        this.time = 0; //rotation time
        this.timeout = null; //timer
        this.images = $(imageSliderElement).find('.image-slider-image');
        this.indices = $(imageSliderElement).find('.image-slider-index');
        if(this.images.length > 0){
            this.currentIndex = 0;
        }
        this.changeImageToIndex(this.currentIndex);
        this.setupListeners(imageSliderElement);
    }

    setupListeners(imageSliderElement){
        //Side buttons
        $(imageSliderElement).find('.image-slider-button-right').click((event)=>{
            this.handleRightButton();
        });
        $(imageSliderElement).find('.image-slider-button-left').click((event)=>{
            this.handleLeftButton();
        });

        //Indices
        $(imageSliderElement).find('.image-slider-index').click((event)=>{
            this.handleIndexClicked(event);
        });
    }

    handleIndexClicked(event){
        this.clearClock();
        let index = $(event.target).attr('imageIndex');
        this.changeImageToIndex(index);
    }

    handleRightButton(){
        this.clearClock();
        this.nextImage();
    }

    handleLeftButton(){
        this.clearClock();
        this.prevImage();
    }

    //Clears the clock and restarts the rotation if there is one
    clearClock(){
        if(typeof this.timeout !== 'undefined'){
            clearTimeout(this.timout);
            this.rotate(this.time);
        }
    }

    //Change the image to the index specified
    changeImageToIndex(index){
        if(typeof index != 'undefined' && index >= 0){
            if(index < this.images.length){
                $(this.images).removeClass('image-slider-image-active');
                $(this.images[index]).addClass('image-slider-image-active');
            }
            if(index < this.indices.length){
                $(this.indices).removeClass('image-slider-index-active');
                $(this.indices[index]).addClass('image-slider-index-active');
            }
            this.currentIndex = index;
        }
    }

    //Go to the next image
    nextImage(){
        if(typeof this.currentIndex === 'undefined') { return; }

        let nextIndex = parseInt(this.currentIndex) + 1
        if(nextIndex > this.images.length){
            this.currentIndex = 0;
        }else{
            this.currentIndex = nextIndex;
        }
        this.changeImageToIndex(this.currentIndex);
    }

    //Go to the previous image
    prevImage(){
        if(typeof this.currentIndex === 'undefined') { return; }
        let prevIndex = parseInt(this.currentIndex) - 1;
        if(prevIndex < 0){
            this.currentIndex = this.images.length - 1;
        }else{
            this.currentIndex = prevIndex;
        }
        this.changeImageToIndex(this.currentIndex);
    }

    //Rotate through the images given a specific amount of time
    rotate(time){
        this.time = time;
        this.timout = setTimeout(()=>{
            this.nextImage();
            this.rotate(time);
        }, time);
    }
}

//Easy way to handle multiple sliders on the same page
function createSliders(){
    $('.image-slider').each(function(){
        let slider = new ImageSlider($(this));
        slider.rotate(5000);
    });
}

//When the document has loaded, let's create our sliders
$(document).ready(()=>{
    createSliders();
});