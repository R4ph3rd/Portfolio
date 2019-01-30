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
let nbproj = 0

//for home page typo event
var font
let typoSize
let index

//get scroll position
let scrollPos = 0
let val

addEventListener("load", function () {
    document.addEventListener("wheel", wheele, false);
});


function preload() {
    loadJSON("works/data.json", displayData)
}

function displayData(data) {
    jsonData = data;
    let el = document.getElementById("zonecentraleW")

    for (let i = 0 ; i < 1; i++) {
        let radiusMax = 0.4 * width
        let radiusMin = 0.15 * width
        let imgSrc = data.projets[0].img
        console.log("image source = " + imgSrc)
        let imgAlt = data.projets[0].alt
        let title = data.projets[0].title
        let resume = data.projets[0].resume
        let work = createDiv('')
        work.position(500,500)
        let workImg = createImg('works/Reveille_la_rue/reveillelarue_logo.png',).size(radiusMin, radiusMax)
        workImg.id(0)
        workImg.position(500,500)
        let workTitle = createElement('h3', title)
        workImg.id('img0')
        console.log("workkimg"+workImg.position().Object)
        nbproj += 1

        //console.log("position work = " + work.position)
    }
}


//typo
let coordFixed = []
let pnts = []

function windowResized() {
    //canvas on all page
    //    heightPage = document.body.offsetHeight
    //    console.log(heightPage)
    resizeCanvas(windowWidth, windowHeight)
    typoSize = (300/1600)*width
    //    typoSize = (width * 0.8) /7
    //    console.log("size = " + typoSize)

    //reinitialize paticles
    for (i = 0; i < particulesmax; i++) {
        particules[i] = new Particle(random(0, width), //x
            random(0, height), //y
            random(2, 50), //mass
            random(1, 4), //size
            random(100, 150)); //seuil
    }

    if (el == workpage) {}
    //  heightless = document.querySelector("footer").getBoundingClientRect().height

}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    //pixelDensity(1)
    background(30);
    //set typo caracteristics
    //        typoSize = (width * 0.8) /7
    //        console.log("size = " + typoSize)
    typoSize = (300/1600)*width

    centralPoint = createVector(mouseX, mouseY)
    //create gravitation points centered on differents objects depeding on the current page

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
}



function draw() {
    noStroke();
    //background
    fill(30, 20);
    rect(0, 0, width, height);


    centralPoint = createVector(mouseX, mouseY)
    fps = frameRate()
    //adapter le nombre de particules en fonction des fps & taille de l'écran
   // if(frameCount%50 ==0) console.log(fps)
    displayedparticules = width / 1.6
    if (fps < 18) displayedparticules -= 100;
    if (fps < 25) displayedparticules -= 20;
    if ((fps > 40) && (displayedparticules < 1000)) displayedparticules += 10

    //particles

        //just update particles
        for (i = 0; i < displayedparticules; i++) {
            particules[i].update()
            particules[i].display();
    }
} //draw
