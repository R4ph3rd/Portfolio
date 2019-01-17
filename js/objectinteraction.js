//fps & screen size
let fps;
let displayedparticules
//values for gravitation equation
let vitessemax = 4;
let frictioncoef = 0.8; //coefficient of friction;
let particulesmax; //will change depending on screen size
let particules = [particulesmax];
let centralPoint;
let G = 9; //constant of gravitation
let massPoint = 400; // will change depeing on screen size
//pour le portrait dans about
let position
let largeur
let hauteur
let xpos
let ypos

//get data from html
let heightless = document.querySelector("footer").getBoundingClientRect().height
let heightPage = document.body.offsetHeight
//what page are we reading ?
const el = location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
const workpage = "work.html"
const aboutpage = "about.html"
const homepage = "index.html"
const contactpage = "contact.html"

//for home page typo event
var font

//get scroll position
let scrollPos = 0
//var scrollEvent = new WheelEvent("scrollWheel",{"deltaX": 0,"deltaY": 0, "deltaMode": 1});
//let scrollEvent = function (evt){ }
//window.addEventListener("scroll", scrollEvent);


function windowResized() {
    //canvas on all page
    //    heightPage = document.body.offsetHeight
    //    console.log(heightPage)
    resizeCanvas(windowWidth, windowHeight)

    //reinitialize paticles
    for (i = 0; i < particulesmax; i++) {
        particules[i] = new Particle(random(0, width), //x
            random(0, height), //y
            random(2, 50), //mass
            random(1, 4), //size
            random(100, 150)); //seuil
    }
    //redefine position of the center of gravitation for fixed objects
    if (el == aboutpage) {
        position = document.querySelector(".taillezone").getBoundingClientRect()
        largeur = position.width
        hauteur = position.height
        xpos = position.x
        ypos = position.y

        centralPoint = createVector(xpos + (largeur * 0.5), ypos + (hauteur * 0.5))
    }

    if (el == workpage) {}
    //  heightless = document.querySelector("footer").getBoundingClientRect().height

}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    //pixelDensity(1)
    background(30);
    centralPoint = createVector(mouseX, mouseY)
    //create gravitation points centered on differents objects depeding on the current page
    if ((el == homepage) || (el == contactpage)) centralPoint = createVector(mouseX, mouseY)

    if (el == aboutpage) {
        position = document.querySelector(".taillezone").getBoundingClientRect()
        largeur = position.width
        hauteur = position.height
        xpos = position.x
        ypos = position.y

        centralPoint = createVector(xpos + (largeur * 0.5), ypos + (hauteur * 0.5));
    }

    if (el == workpage) {}

    particulesmax = 1000;
    displayedparticules = particulesmax
    massPoint = width / 3

    //reset balls positions
    for (i = 0; i < particulesmax; i++) {
        particules[i] = new Particle(random(0, width), //x
            random(0, height), //y
            random(2, 50), //mass
            random(1, 4), //size
            random(100, 150)); //seuil 
    }
    //charge typo only if we are on home page
    if (el == homepage) {
        opentype.load('fonts/FreeSansNoPunch.otf', function (err, f) {
            if (err) {
                print(err);
            } else {
                font = f;
                pnts = getPoints(typedKey);
                loop();
            }
        })
    }
}

function mouseWheel(event) {
    scrollPos += event.delta;
    console.log(scrollPos)
}

function draw() {
    noStroke();
    //background
    fill(30, 20);
    rect(0, 0, width, height);

    if ((el == homepage) || (el == contactpage)) centralPoint = createVector(mouseX, mouseY)

    if (el == workpage) {}

    fps = frameRate()
    //adapter le nombre de particules en fonction des fps & taille de l'écran
    displayedparticules = width / 1.6
    if (fps < 25) displayedparticules -= 10;
    if ((fps > 40) && (displayedparticules < 1000)) displayedparticules += 10

    //particles
    fill(23, 175, 135);
    for (i = 0; i < displayedparticules; i++) {
        if ((scrollPos > 1000) && (el == homepage)) particules[i].updateToTypo()
        else particules[i].update()

        particules[i].display();
    }
}
