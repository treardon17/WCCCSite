class ParallaxPage{
    constructor(){
        this.previousTop = window.pageYOffset || document.documentElement.scrollTop;
        this.parallaxContainers = [];
        let parallaxContainers = $('.parallax-container');
        for(let i = 0; i < parallaxContainers.length; i++){
            let parallaxElements = $(parallaxContainers[i]).find('.parallax-element');
            this.parallaxContainers.push({container: parallaxContainers[i], elements: parallaxElements})
        }
    }

    handleScroll(){
        if(this.parallaxContainers.length == 0) { return; };
        for(let i = 0; i < this.parallaxContainers.length; i++){
            let container = this.parallaxContainers[i].container;
            let elements = this.parallaxContainers[i].elements;
            this.checkElementInView(container, ()=>{
                //above
            }, (percentComplete, direction)=>{
                //middle
                this.moveElements(elements, -percentComplete*100);
            }, ()=>{
                //below
            })
        }
    }

    moveElements(elements, margin){
        for(let i = 0; i < elements.length; i++){
            $(elements[i]).css({'bottom': margin + 'px'});
        }
    }

    //Checks to see if an element is above, within, or below the current scroll offset
    checkElementInView(elementSelector, aboveCallback, middleCallback, belowCallback){
        var top  = window.pageYOffset || document.documentElement.scrollTop;
        var element = $(elementSelector);
        var height = $(element).outerHeight();
        var offset = $(element).offset().top;
        var direction = (this.previousTop < top) ? -1 : 1; //will be -1 if scrolling down, 1 if scrolling up
        
        if(top >= offset && top < offset + height){
            //if the top of the viewport is in the middle of the element
            if(typeof middleCallback === 'function'){
                var percentComplete = (top - offset)/height;
                middleCallback(percentComplete, direction);
            }
        } else if(top - offset < height){
            //if the viewport is above the view
            if(typeof aboveCallback === 'function'){
                aboveCallback();
            }
        }else if (top > offset + height){
            //if the viewport is below the view
            if(typeof belowCallback === 'function'){
                belowCallback();
            }
        }
        this.previousTop = top;
    }
}

$(document).ready(()=>{
    let parallax = new ParallaxPage();
    $(window).scroll(()=>{ 
        parallax.handleScroll(); 
    });
});