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

//affichage des projets
let X = []
let Y = []
let xpos = []
let ypos = []
let x1 = []
let y1 = []

let foundAspot = true


//get data from html
let heightless = document.querySelector("footer").getBoundingClientRect().height
let heightPage = document.body.offsetHeight
let larg, haut

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


function preload() {
    loadJSON("works/data.json", displayData)
}


function displayData(data) {
    jsonData = data;
    let el2 = select('.zonecentrale')
    larg = el2.size().width
    haut = el2.size().height
    //console.log(larg + "  " + haut)
    console.log("data.length = " + jsonData.projets.length)

    for (let i = 0; i < jsonData.projets.length; i++) {
        let imgSrc = data.projets[i].img
        console.log("image source = " + imgSrc)
        let imgAlt = data.projets[i].alt
        let title = data.projets[i].title
        let resume = data.projets[i].resume
        let link = data.projets[i].link
        work = createDiv('')
        workLink = createA(link, '')
        titleLink = createA(link, '')
        workImg = createImg(imgSrc)
        workTitle = createElement('h4', title) //j'ai une fin de div en trop qui n'est pas comptabilisée dans le flux apparement...doublement étrange
        workResume = createP(resume)
        workArticle = createElement('div')

        //intégration des élèments dans leurs parents
        el2.child(work) // on range ma div dans la zone centrale
        work.child(workArticle)
        work.child(workLink)
        workArticle.child(titleLink)
        titleLink.child(workTitle)
        workArticle.child(workResume)
        workLink.child(workImg)

        work.addClass('workfloating')

        //foundAspot = false
        displayProjects(i)
    }
}

function displayProjects(i) {
    //taille random
    let size = random(80, 150)

    workImg.size(size, size)
    console.log("width = " + windowWidth)
    console.log("size =" + size)

    //encadrement de la zone de pop
    let borderTop = select('header').size().height
    let borderRight = select('.hamburger').position().x
    let borderBottom = select('.copyr').position().y
    // console.log(borderRight) valeurs ici ok

    //positionnement alétoire dans la fenêtre 
    //verification in order to avoid superposition
    while (foundAspot == false) {
    X[i] = random(20 + (size / 2), borderRight - (20 + (size / 2)))
    Y[i] = random(borderTop + 20 + (size / 2), borderBottom - (20 + (size / 2)))
        //compare à toutes les positions des rectangles déjà affichés
        overlapping = false
        for (let j = 0; j < X.length; j++) {
            if (abs(X[i] - X[j]) < size + 5 && abs(Y[i] - Y[j]) < size + 5) {
                overlapping = true
            }
        }
        //reverify with new coordinates
        if (!overlapping) {
            foundAspot = true
        }
    }

    // console.log("****" + X + "  " + Y +"****") valeurs ici ok aussi
    //ça devient tricky : xpos,ypos centre du cercle, pour retrouver x1,y1 pos de l'article
    xpos[i] = X[i] + (size / 2)
    ypos[i] = Y[i] + (size / 2)
    let widthArticle = workArticle.size().width
    let heightArticle = workArticle.size().height
    //and add class to put content on the good side
    let side = (int(random(0, 2)) == 0) ? 1 : -1
    if (side == 1) {
        x1[i] = xpos
        y1[i] = ypos - heightArticle
        workArticle.addClass('sideright')
    } else {
        workArticle.addClass('sideleft')
        x1[i] = xpos - widthArticle
        y1[i] = ypos - heightArticle
    }

    console.log("position work =" + X[i] + "  " + Y[i] + "\n" + "position article = " + x1[i], "  " + y1[i])
    work.position(X[i], Y[i])
    workArticle.position(x1[i], y1[i])
}

function windowResized() {
    //canvas on all page
    //    heightPage = document.body.offsetHeight
    //    console.log(heightPage)
    resizeCanvas(windowWidth, windowHeight)
    typoSize = (300 / 1600) * width
    displayProjects()
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
    typoSize = (300 / 1600) * width

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

//en attente d'une version stable du pop des projets
/*
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
*/
