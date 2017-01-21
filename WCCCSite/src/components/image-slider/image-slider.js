class ImageSlider{
    constructor(){
        this.images = $('.image-slider-image');
        if(this.images.length > 0){
            this.currentIndex = 0;
        }
    }

    //Change the image to the index specified
    changeImageToIndex(index){
        if(typeof index != 'undefined' && index < this.images.length && index > 0){
            $(this.images).removeClass('image-slider-image-active');
            $(this.images[index]).addClass('image-slider-image-active');
        }
    }

    //Go to the next image
    nextImage(){
        if(typeof this.currentIndex === 'undefined')
            return;
        if(this.currentIndex + 1 > this.images.length){
            this.currentIndex = 0;
        }else{
            this.currentIndex += 1;
        }
    }

    //Go to the previous image
    prevImage(){
        if(typeof this.currentIndex === 'undefined')
            return;
        if(this.currentIndex - 1 < 0){
            this.currentIndex = this.images.length - 1;
        }else{
            this.currentIndex -= 1;
        }
    }
}

$(document).ready(()=>{
    let images = $('.image-slider-image');
})