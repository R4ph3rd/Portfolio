//fps & screen size
let fps;
let displayedparticules
//values for gravitation equation
let vitessemax = 4;
let frictioncoef = 0.8; //coefficient of friction;
let particulesmax; //will change depending on screen size
let particules = [900];
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
/*
let xpos = []
let ypos = []
let x1 = []
let y1 = []*/
let xpos, ypos, x1, y1
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
let jsonData
let worksContent = []


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
    // console.log("data.length = " + jsonData.projets.length)

    for (let i = 0; i < jsonData.projets.length; i++) {
        let imgSrc = data.projets[i].img
        //console.log("image source = " + imgSrc)
        let imgAlt = data.projets[i].alt
        let title = data.projets[i].title
        let resume = data.projets[i].resume
        let link = data.projets[i].link
        work = createDiv('')
        workLink = createA(link, '')
        titleLink = createA(link, '')
        workImg = createImg(imgSrc)
        workTitle = createElement('h4', title)
        workResume = createP(resume)
        workArticle = createElement('div')

        //intégration des élèments dans leurs parents
        el2.child(work) // on range ma div dans la zone centrale
        work.child(workLink)
        workLink.child(workImg)
        work.child(workArticle)
        workArticle.child(titleLink)
        titleLink.child(workTitle)
        workArticle.child(workResume)


        work.addClass('workfloating')
        if ((title = "Patitap") || (title = "void_review") || (title = "What's the France ?")) workImg.id('resize')

        //taille random
        let siz = random(100, 140)
        workImg.size(siz, siz)

        //positionnement dans la fenetre
        Page = select('.zonecentrale')
        let X = Page.size().width / 2
        let Y = Page.size().height / 2
        let posx = X + 50
        let posy = Y - 50


        worksContent.push({
            div: work,
            a: workLink,
            img: workImg,
            divchild: workArticle,
            title: workTitle,
            aTitle: titleLink,
            resume: workResume,
            syze: siz,
            x: X,
            y: Y,
            Ax: posx,
            Ay: posy


        })

        //foundAspot = false
        displayProjects()
    }
}


function displayProjects() {

    for (let i = 0; i < worksContent.length; i++) {

        let sizi = worksContent[i].syze

        //encadrement de la zone de pop
        Page = select('.zonecentrale')
        let borderTop = (select('header').size().height) + 20
        let borderRight = Page.position().x + Page.size().width - (sizi + 20)
        let borderBottom = Page.size().height - (sizi + 20)
        let borderLeft = Page.position().x + 20

        if (windowWidth < 650) {
            //update new size
            worksContent[i].syze = windowWidth / 4
            sizi = worksContent[i].syze
            let borderFoot = select('footer').size().height
            // force the page height
            Page.height = 6 * (sizi + 50) + borderTop + borderFoot + 100
        }

        //défine new coordinates
        let foundAspot = false
        while (foundAspot == false) {
            //  console.log("new values")
            worksContent[i].x = random(borderLeft, borderRight)
            worksContent[i].y = random(borderTop, borderBottom)

            let overlapping = false

            //compare à toutes les positions des biscottes déjà affichées
            for (let j = 0; j < i; j++) {
                let sizj = worksContent[j].syze
                let distanceImg = dist(worksContent[i].x + (sizi / 2), worksContent[i].y + (sizi / 2), worksContent[j].x + (sizj / 2), worksContent[j].y + (sizj / 2))

                if (distanceImg < (sizi / 2) + (sizj / 2) + 50) { //si dist inférieur au seuil, alors on relance une tournée
                    overlapping = true
                }
            }
            //reverify with new coordinates
            if (overlapping == false) {
                foundAspot = true
            }
        }

        let posX = worksContent[i].x
        let posY = worksContent[i].y

        //ça devient tricky : x,y centre du cercle, pour retrouver x1,y1 pos de l'article
        worksContent[i].Ax = posX + (sizi / 2)
        worksContent[i].Ay = posY + (sizi / 2)
        let x = worksContent[i].Ax
        let y = worksContent[i].Ay
        let x1,y1

        let widthArticle = workArticle.size().width
        let heightArticle = workArticle.size().height
        //and add class to put content on the good side
        let side = (int(random(0, 2)) == 0) ? 1 : -1

        //vérifier qu'il déborde pas de l'écran en x
        //widthArticle pas fiable pour l'instant (voir encadré qui couvre pas tout ce qu'il devrait), donc jouons sur des valeurs absolues en attendant
        if (posX + widthArticle > windowWidth - 50 || posX - widthArticle < 0) side = side * -1
        //placer l'article
        if (side == 1 && workArticle.class() != 'sideright') {
            if (workArticle.class() == "sideleft") workArticle.removeClass('sideleft')
            x1 = xpos + sizi + sizi
            y1 = ypos - heightArticle
            workArticle.addClass('sideright')
        } else if (workArticle.class() != 'sideleft') { 
            if (workArticle.class() == "sideright") workArticle.removeClass('sideright')
            workArticle.addClass('sideleft')
            x1 = xpos - (widthArticle + sizi)
            y1 = ypos - heightArticle
        }
        //ne pas sortir en y
        if (posY - heightArticle < 0) y1 = posY

        // console.log("position work =" + X + "  " + Y + "\n" + "position article = " + x1, "  " + y1)
        worksContent[i].div.position(posX, posY)
        worksContent[i].divchild.position(x1, y1)
    }
}

function windowResized() {
    Page = select('.bourin')
    heightPage = Page.size().height
    if (windowWidth > 1000) heightPage = windowHeight

    if (windowWidth < 650) {
        //update new size
        let bulleSize = windowWidth / 6
        let borderTop = (select('header').size().height) + 20
        let borderFoot = select('footer').size().height
        // force the page height
        Page.size().height = (6 * (bulleSize + 50)) + borderTop + borderFoot + 100
    }

    resizeCanvas(windowWidth, heightPage)

    //reinitialize paticles
    for (i = 0; i < particulesmax; i++) {
        particules[i] = new Particle(random(0, width), //x
            random(0, height), //y
            random(2, 50), //mass
            random(1, 4), //size
            random(100, 150)); //seuil
    }

    for (let p = 0; p < 6; p++) displayProjects()
}

function setup() {
        Page = select('.bourin')
    heightPage = Page.size().height
    if (windowWidth > 1000) heightPage = windowHeight
    canvas = createCanvas(windowWidth, heightPage);
    //pixelDensity(1)
    background(30);
    typoSize = (300 / 1600) * width
    //create gravitation points centered on differents objects depeding on the current page
    /*  console.log("------------------- SETUP ----------------------------------------------")
      for (let i = 0 ; i <worksContent.length ; i ++) {
          console.log("x = " + worksContent[i].x)
          console.log("y = " + worksContent[i].y)
      }*/

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

    for (let p = 0; p < worksContent.length; p++) {
        console.log("size = " + worksContent[p].syze)
    /*    let yu = document.querySelector(".slipou").getBoundingClientRect()
        console.log(yu.width + "   " + yu.height)*/
    }
}



function draw() {
    noStroke();
    //background
    fill(30, 20);
    rect(0, 0, width, height);

    fps = frameRate()
    //adapter le nombre de particules en fonction des fps & taille de l'écran
    displayedparticules = width / 1.6
    if (fps < 18) displayedparticules -= 100;
    if (fps < 25) displayedparticules -= 20;
    if ((fps > 40) && (displayedparticules < 1000)) displayedparticules += 10


    //particles
    let G = 0.05 * width
       for (i = 0; i < displayedparticules; i++) {
           // console.log("centralpoint =" + centralPoint.x + "  " + centralPoint.y)
           particules[i].update()
           particules[i].display();
       }
    
    /*
        for (let i = 0; i < worksContent.length; i++) {
            push()
            fill(255, 0, 0)
            ellipse(worksContent[i].x + worksContent[i].syze / 2, worksContent[i].y + worksContent[i].syze / 2, 10, 10)
            fill(0, 0, 255)
            ellipse(worksContent[i].x, worksContent[i].y + worksContent[i].syze / 2, 10, 10)
            pop()
        }*/
} //draw
