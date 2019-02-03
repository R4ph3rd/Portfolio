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
        work.child(workArticle)
        work.child(workLink)
        workArticle.child(titleLink)
        titleLink.child(workTitle)
        workArticle.child(workResume)
        workLink.child(workImg)

        work.addClass('workfloating')
        if ((title = "Patitap") || (title = "void_review") || (title = "What's the France ?")) workImg.id('resize')

        //foundAspot = false
        displayProjects(i)
    }
}


function displayProjects(i) {
    //taille random
    let siz = random(80, 150)
    if (i > 4 ) siz = random(25,40)

    workImg.size(siz, siz)
    //console.log("width = " + windowWidth)
    //console.log("size =" + siz)

    //encadrement de la zone de pop
    Page = select('.bourin')
    heightPage = Page.size().height
    let borderTop = (select('header').size().height) + 20
    let borderRight = (select('.hamburger').position().x) - 20
    if (windowWidth > 1000) borderRight = windowWidth - 70
    let borderBottom = heightPage - ((select('footer').size().height) + 20)
    if (windowWidth > 1000) borderBottom = windowHeight - 20
    let borderLeft = 20
   // console.log("boundsBottom = " + /*" +borderRight+ " "*/ +borderBottom) //+ "  " + borderBottom) //valeurs ici ok
    //console.log("taille = " + siz ) // idem

    //positionnement alétoire dans la fenêtre 
    //verification in order to avoid superposition
    X[i] = random(borderLeft, borderRight - siz) //random(1000) + (i * 5) // EUREKA !!!!!!!!
    Y[i] = random(borderTop, borderBottom - siz) // random(300) + (i*6)   // J'AI TROUVE MON SALAUPIAUD DE PROBLEME !!!
  //  console.log("*************" + X[i] + "  " + Y[i] + "************")

//à voir plus tard : ne pas superposer les projets
    /* while (foundAspot == false) {
    X[i] = random(20 + (siz / 2), borderRight - (20 + (siz / 2)))
    Y[i] = random(borderTop + 20 + (siz / 2), borderBottom - (20 + (siz / 2)))
        //compare à toutes les positions des rectangles déjà affichés
        overlapping = false
        for (let j = 0; j < X.length; j++) {
            if (abs(X[i] - X[j]) < siz + 5 && abs(Y[i] - Y[j]) < siz + 5) {
                overlapping = true
            }
        }
        //reverify with new coordinates
        if (!overlapping) {
            foundAspot = true
        }
    }
*/
    // console.log("****" + X + "  " + Y +"****") valeurs ici ok aussi
    //ça devient tricky : xpos,ypos centre du cercle, pour retrouver x1,y1 pos de l'article
    xpos = X[i] + (size / 2)
    ypos = Y[i] + (size / 2)
    let widthArticle = workArticle.size().width
    let heightArticle = workArticle.size().height
    //and add class to put content on the good side
    let side = (int(random(0, 2)) == 0) ? 1 : -1

    //vérifier qu'il déborde pas de l'écran en x
    if (xpos + widthArticle > windowWidth || xpos - widthArticle < 0) side = side * -1
    //placer l'article
    if (side == 1) {
        x1 = xpos
        y1 = ypos - heightArticle
        workArticle.addClass('sideright')
    } else {
        workArticle.addClass('sideleft')
        x1 = xpos - widthArticle
        y1 = ypos - heightArticle
    }
    //ne pas sortir en y
    if (ypos - heightArticle < 0 || ypos > heightPage) y1 = ypos

   // console.log("position work =" + X + "  " + Y + "\n" + "position article = " + x1, "  " + y1)
    work.position(X[i], Y[i])
    workArticle.position(x1, y1)
}

function windowResized() {
    Page = select('.bourin')
    heightPage = Page.size().height
    if (windowWidth > 1000) heightPage = windowHeight

    resizeCanvas(windowWidth, heightPage)
    typoSize = (300 / 1600) * width
    for (let p of jsonData.projets) displayProjects(p)
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



}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    //pixelDensity(1)
    background(30);
    typoSize = (300 / 1600) * width
    //create gravitation points centered on differents objects depeding on the current page

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
    let G = 0.03125 * width
    //just update particles
    //en attente d'une version stable du pop des projets
      for (i = 0 ; i < displayedparticules ; i++) {
          let p  = int(random(6))
          centralPoint = createVector(X[p],Y[p])
         // console.log("centralpoint =" + centralPoint.x + "  " + centralPoint.y)
          particules[i].update()
          particules[i].display();
      }
} //draw
