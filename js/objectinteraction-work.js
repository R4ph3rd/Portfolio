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
        if (i > 4) siz = random(25, 40)
        workImg.size(siz, siz)

        //positionnement dans la fenetre
        Page = select('.zonecentrale')
        let X = Page.size().x / 2
        let Y = Page.size().y / 2
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
    console.log("****************************premier jet de positions *****************")
    for (let i = 0; i < worksContent.length; i++) {
        let siz = worksContent[i].syze

        //encadrement de la zone de pop
        Page = select('.zonecentrale')
        let borderTop = (select('header').size().height) + 20
        let borderRight = Page.position().x + Page.size().width - (siz + 20)
        let borderBottom = Page.size().height - (siz + 20)
        let borderLeft = Page.position().x + 20

        //défine new coordinates
        worksContent[i].x = random(borderLeft, borderRight)
        worksContent[i].y = random(borderTop, borderBottom)

        console.log("X = " + worksContent[i].x)
        console.log("Y = " + worksContent[i].y)

        let posX = worksContent[i].x
        let posY = worksContent[i].y


        //à voir plus tard : ne pas superposer les projets
        while (foundAspot == false) {
            worksContent[i].x = random(borderLeft, borderRight)
            worksContent[i].y = random(borderTop, borderBottom)

            //compare à toutes les positions des biscottes déjà affichées
            overlapping = false
            for (let j = 0 ; j < worksContent.length; j++) {
                let distanceImg = dist(worksContent[i].x,worksContent[i].y,worksContent[j].x, worksContent[j].x)
                let sizj = worksContent[j].syze
                if (distanceImg < siz + sizj + 10) {
                    overlapping = true
                }
            }
            //reverify with new coordinates
            if (overlapping == false) {
                foundAspot = true
            }
        }


        //ça devient tricky : x,y centre du cercle, pour retrouver x1,y1 pos de l'article
        worksContent[i].Ax = posX + (siz / 2)
        worksContent[i].Ay = posY + (siz / 2)
        let x = worksContent[i].Ax
        let y = worksContent[i].Ax

        let widthArticle = workArticle.size().width
        let heightArticle = workArticle.size().height
        console.log("width = " + heightArticle)
        //and add class to put content on the good side
        let side = (int(random(0, 2)) == 0) ? 1 : -1

        //vérifier qu'il déborde pas de l'écran en x
        //widthArticle pas fiable pour l'instant (voire encadré qui couvre pas tout ce qu'il devrait), donc jouons sur des valeurs absolues en attendant
        if (xpos + 180 > windowWidth || xpos - 180 < 0) side = side * -1
        //placer l'article
        if (side == 1) {
            if (workArticle.class() == "sideleft") workArticle.removeClass('sideleft')
            x1 = xpos
            y1 = ypos - heightArticle
            workArticle.addClass('sideright')
        } else {
            if (workArticle.class() == "sideright") workArticle.removeClass('sideright')
            workArticle.addClass('sideleft')
            x1 = xpos - widthArticle
            y1 = ypos - heightArticle
        }
        //ne pas sortir en y
        if (ypos - heightArticle < 0) y1 = ypos

        // console.log("position work =" + X + "  " + Y + "\n" + "position article = " + x1, "  " + y1)
        worksContent[i].div.position(posX, posY)
        worksContent[i].divchild.position(x1, y1)
    }
}

function windowResized() {
    Page = select('.bourin')
    heightPage = Page.size().height
    if (windowWidth > 1000) heightPage = windowHeight

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
    for (let p = 0; p < 6; p++) displayProjects()

}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    //pixelDensity(1)
    background(30);
    typoSize = (300 / 1600) * width
    //create gravitation points centered on differents objects depeding on the current page
    /*  console.log("------------------- SETUP ----------------------------------------------")
      for (let i = 0 ; i <worksContent.length ; i ++) {
          console.log("x = " + worksContent[i].x)
          console.log("y = " + worksContent[i].y)
      }*/
    for (let i = 0; i < worksContent.length; i++) {
        let projay = select('.workfloating').position().x
        console.log("projays = " + projay) //pourquoi n'ont pas du tout les valeurs de positions que je leur ai assignées ??
    }
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
    // console.log("arrays = " + X + "  " + Y)
}



function draw() {
    noStroke();
    //background
    fill(30, 20);
    rect(0, 0, width, height);

    fps = frameRate()
    //adapter le nombre de particules en fonction des fps & taille de l'écran
    // if(frameCount%50 ==0) console.log(fps)
    displayedparticules = width / 1.6
    if (fps < 18) displayedparticules -= 100;
    if (fps < 25) displayedparticules -= 20;
    if ((fps > 40) && (displayedparticules < 1000)) displayedparticules += 10

    //particles
    let G = 0.05 * width
    //just update particles
    //en attente d'une version stable du pop des projets
    for (i = 0; i < displayedparticules; i++) {
        // console.log("centralpoint =" + centralPoint.x + "  " + centralPoint.y)
        particules[i].update()
        particules[i].display();
    }
} //draw
