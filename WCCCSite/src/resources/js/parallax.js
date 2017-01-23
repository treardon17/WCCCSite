class ParallaxPage{
    constructor(){
        this.previousTop = window.pageYOffset || document.documentElement.scrollTop;
        this.parallaxContainers = [];
        let parallaxContainers = $('.parallax-container');
        for(let i = 0; i < parallaxContainers.length; i++){
            let parallaxElements = $(parallaxContainers[i]).find('.parallax-element');
            let titleHeadings = $(parallaxContainers[i]).find('.title-heading');
            this.parallaxContainers.push({container: parallaxContainers[i], elements: parallaxElements, titleHeadings: titleHeadings})
        }
        //set initial position of elements
        this.handleScroll();
        this.currentScrollDirection = 0;
    }

    handleScroll(){
        if(this.parallaxContainers.length == 0) { return; };
        for(let i = 0; i < this.parallaxContainers.length; i++){
            let container = this.parallaxContainers[i].container;
            let elements = this.parallaxContainers[i].elements;

            this.checkElementInView(container,{
                middleCallback: (percentComplete)=>{
                    this.moveElements(elements, -percentComplete*250);
                    this.opacityElements(elements, 1-percentComplete);
                },
                bottomProgressCallback: (percentComplete)=>{
                    
                }
            })
        }
    }

    moveElements(elements, margin){
        for(let i = 0; i < elements.length; i++){
            $(elements[i]).css({'bottom': margin + 'px'});
        }
    }

    opacityElements(elements, opacity){
        for(let i = 0; i < elements.length; i++){
            $(elements[i]).css({'opacity': opacity});
        }
    }

    //Checks to see if an element is above, within, or below the current scroll offset
    checkElementInView(elementSelector, cbObject){
        var top  = window.pageYOffset || document.documentElement.scrollTop;
        var bottom = top + $(window).height();

        var element = $(elementSelector);       //div being observed
        var height = $(element).outerHeight();  //height of the element
        var offset = $(element).offset().top;   //the top of the element

        if(top % 2 == 0){
            //will be -1 if scrolling down, 1 if scrolling up
            if(this.previousTop < top){
                this.currentScrollDirection = -1;
            }else if(this.previousTop > top){
                this.currentScrollDirection = 1
            }
        }

        this.previousTop = top;

        if(top >= offset && top < offset + height){
            //if the top of the viewport is in the middle of the element
            if(typeof cbObject.middleCallback === 'function'){
                let percentComplete = (top - offset)/height;
                cbObject.middleCallback(percentComplete);
            }
        }else if(top - offset < height){
            //if the viewport is above the view
            if(typeof cbObject.aboveCallback === 'function'){
                cbObject.aboveCallback();
            }
        }else if (top > offset + height){
            //if the viewport is below the view
            if(typeof cbObject.belowCallback === 'function'){
                cbObject.belowCallback();
            }
        }

        if(bottom >= offset && bottom < offset+height){
            if(typeof cbObject.bottomProgressCallback === 'function'){
                let percentComplete = (bottom - offset)/height
                cbObject.bottomProgressCallback(percentComplete);
            }
        }
    }
}

$(document).ready(()=>{
    let parallax = new ParallaxPage();
    $(window).scroll(()=>{ 
        parallax.handleScroll(); 
    });
});