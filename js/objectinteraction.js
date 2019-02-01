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
let Page,heightPage
//what page are we reading ?
const el = location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
const workpage = "work.html"
const aboutpage = "about.html"
const homepage = "index.html"
const contactpage = "contact.html"

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

//typo
let coordFixed = []
let pnts = []

function windowResized() {
    //canvas on all page
    //    heightPage = document.body.offsetHeight
    //    console.log(heightPage)
    heightPage = Page.size().height
    if (el == homepage || el == workpage) heightPage = windowHeight
        if (el ==  aboutpage && windowWidth >1000) heightPage = windowHeight
    resizeCanvas(windowWidth, heightPage)
    typoSize = (300 / 1600) * width
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
    //redefine position of the center of gravitation for fixed objects
    if (el == aboutpage) {
        position = document.querySelector(".taillezone").getBoundingClientRect()
        largeur = position.width
        hauteur = position.height
        xpos = position.x
        ypos = position.y

        centralPoint = createVector(xpos + (largeur * 0.5), ypos + (hauteur * 0.5))
    }
}

function wheele(e) {
    // Je supprime le comportement par défaut
    e.preventDefault();
    var delta = e.deltaY; //scroll variable
    //launch handle function if this happens
    handle(delta);
}



function setup() {
    Page = select('.bourin')
    heightPage = Page.size().height
        if (el == homepage || el == workpage) heightPage = windowHeight
    if (el ==  aboutpage && windowWidth >1000) heightPage = windowHeight
   // console.log("taille page = " + heightPage)
    canvas = createCanvas(windowWidth, heightPage);
    //pixelDensity(1)
    background(30);
    typoSize = (300 / 1600) * width

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
                pnts = getPoints("Raphael Perraud");
                for (let i = 0; i < pnts.length; i++) {
                    coordFixed[i] = pnts[i]
                }
                loop();
            }
        })
    }
}

//reset data of typography
function handle(delta) {
    scrollPos += delta;
    if (el == homepage) {
        pnts = getPoints("Raphael Perraud");
        for (let i = 0; i < pnts.length; i++) {
            coordFixed[i] = pnts[i]
        }
    }
}

//loaded only on home page 
function getPoints(fontPath) {
    let centerPointY = (height / 2) + (2 * typoSize / 5)
    let centerPointX = (width - (typoSize * 4)) / 2 //calculate approximatively the margin to put 
    let name = "Raphaël   "
    fontPath = font.getPath(name, centerPointX, centerPointY, typoSize); //why do I have to enter two characters more that aren't displayed ?
    var path = new g.Path(fontPath.commands);
    path = g.resampleByLength(path, 2); //quantity of points
    textW = path.bounds().width;
    //let min = 1600
    //let max = 0
    // remove all commands without a coordinate
    for (let i = path.commands.length - 1; i >= 0; i--) {
        if (path.commands[i].x == undefined) {
            path.commands.splice(i, 1);
        }
    }
    return path.commands;
    //  console.log("min= " + min + "  max =" + max)
}

function draw() {
    noStroke();
    //background
    fill(30, 20);
    rect(0, 0, width, height);

    if ((el == homepage) || (el == contactpage)) centralPoint = createVector(mouseX, mouseY)

    fps = frameRate()
    //adapter le nombre de particules en fonction des fps & taille de l'écran
    // if(frameCount%50 ==0) console.log(fps)
    displayedparticules = width / 1.6
    if (fps < 18) displayedparticules -= 100;
    if (fps < 25) displayedparticules -= 20;
    if ((fps > 40) && (displayedparticules < 1000)) displayedparticules += 10


    if (el == aboutpage) {
        centralPoint = createVector(xpos + (largeur * 0.5), ypos + (hauteur * 0.5))
        if (displayedparticules > (width / 1.6) * 0.6) displayedparticules = (width / 1.6) * 0.6
    }

    //particles

    //verify : are we ovrpass the limit of scroll ?
    if ((scrollPos > 50) && (el == homepage)) {
        overPassed = 1
        //set new positions of points (typography) if we want to draw the text
        G = 0.03125 * width // change attraction, yes, but proportionnaly to screen size to avoid some particles in this new attraction
        if (pnts.length > 0) {
            // let the points dance
            for (let i = 0; i < pnts.length; i++) {
                pnts[i].x += random(-1, 1) * 1
                constrain(pnts[i].x, coordFixed[i].x - 1, coordFixed[i].x + 1)
                pnts[i].y += random(-1, 1) * 1
                constrain(pnts[i].y, coordFixed[i].y - 1, coordFixed[i].y + 1)
            }
        }
        //then update particules
        //use the loop to draw a form between particles
        push()
        noFill()
        stroke(23, 175, 135)
        strokeWeight(2)
        beginShape()
        for (let i = 0; i < displayedparticules; i++) {
            index = int(map(i, 0, 1000, 0, pnts.length)) //faire correspondre une particule à un point de typo
            particules[i].update(index, G)
            particules[i].display();
            push()
            vertex(pnts[index].x, pnts[index].y)
            pop()
        }
        endShape()
        pop()
    } else {
        //reset G value & pnts value
        G = 15
        pnts = []
        //just update particles
        
        for (let p = 0; p < displayedparticules; p++) {
            index = -1
            
            particules[p].update(index, G)
            particules[p].display();
        }
    } //else
} //draw
