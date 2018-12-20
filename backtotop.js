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
     
    // deal with the mouse wheel
    bodyElement.addEventListener("mousewheel", stopEverything, false);
    bodyElement.addEventListener("DOMMouseScroll", stopEverything, false);
     
    // wheeeeeeee!
    animationLoop();
}
setup();
 
//
// kick of the animation to scroll your window back to the top
//
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
 
//
// a cross-browser (minus Opera) way of getting the current scroll position
//
function getScrollPosition() {
    if (document.documentElement.scrollTop == 0) {
        return document.body.scrollTop;
    } else {
        return document.documentElement.scrollTop;
    }
}
 
//
// kicks into high gear only when the start variable is true
//
function animationLoop() {
    // start is true when you click on the up arrow
    if (start) {
        // where the magic happens                           
        window.scrollTo(0, easeOutCubic(iteration, 
                                        currentScrollPosition,
                                        -currentScrollPosition, 
                                        50));
         
        iteration++;
         
        // once you reach the top of the document, stop the scrolling
        if (getScrollPosition() <= 0) {
            stopEverything();
        }
    }
    requestAnimationFrame(animationLoop);
}