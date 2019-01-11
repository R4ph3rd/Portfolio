var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;
 
var bodyElement = document.querySelector("body");
var back = document.querySelector("#back");
 
 
var currentScrollPosition;
var iteration;
var start = false;
 
function setup() {
    // do something when the up arrow is clicked
    back.addEventListener("click", animateToTopOfPage, false);
     
    bodyElement.addEventListener("mousewheel", stopEverything, false);
    bodyElement.addEventListener("DOMMouseScroll", stopEverything, false);
     
    // ouuuuuuuuuuuiiiiiiiiiiiiiiiii!
    animationLoop();
}
setup();
 

function animateToTopOfPage(e) {
    currentScrollPosition = getScrollPosition();
     
    start ^= true;
    iteration = 0;
}
 
//
// stop the animation and reset start and iteration
//
function stopEverything() {
    start = false;
}
 

function getScrollPosition() {
    if (document.documentElement.scrollTop == 0) {
        return document.body.scrollTop;
    } else {
        return document.documentElement.scrollTop;
    }
}
 

function animationLoop() {
    if (start) {                           
        window.scrollTo(0, easeOutCubic(iteration, 
                                        currentScrollPosition,
                                        -currentScrollPosition, 
                                        50));
         
        iteration++;
         
        //if reach the top of the document, stop the scrolling
        if (getScrollPosition() <= 0) {
            stopEverything();
        }
    }
    requestAnimationFrame(animationLoop);
}