//fps & screen size
let fps;
let displayedparticules
//values for gravitation equation
let vitessemax = 4;
let frictioncoef = 0.8; //coefficient of friction;
let particulesmax; //will change depending on screen size
let particules = [particulesmax];
let centralPoint;
let massPoint = 400; // will change depeing on screen size
//pour le portrait dans about
let position
let largeur
let hauteur
let xpos
let ypos
let G;

//get data from html
//let heightless = document.querySelector("footer").getBoundingClientRect().height
//let heightPage = document.body.offsetHeight




function windowResized() {
    //canvas on all page
    //    heightPage = document.body.offsetHeight
    //    console.log(heightPage)
    resizeCanvas(windowWidth, windowHeight)
    G = 0.03125 * width 

    position = document.querySelector("#prezImg").getBoundingClientRect()
    largeur = position.width
    hauteur = position.height
    xpos = position.x
    ypos = position.y

    centralPoint = createVector(xpos + (largeur * 0.5), ypos + (hauteur * 0.5))


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
    pixelDensity(1)
    background(30);
    position = document.querySelector("#prezImg").getBoundingClientRect()
    largeur = position.width
    hauteur = position.height
    xpos = position.x
    ypos = position.y
    centralPoint = createVector(xpos + (largeur * 0.5), ypos + (hauteur * 0.5))

    //reset balls positions
    for (i = 0; i < particulesmax; i++) {
        particules[i] = new Particle(random(0, width), //x
            random(0, height), //y
            random(2, 50), //mass
            random(1, 4), //size
            random(100, 150)); //seuil 
    }
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
        //use the loop to draw a form between particles

        //just update particles
        for (i = 0; i < displayedparticules; i++) {
            particules[i].update(G)
            particules[i].display();
        }
} //draw
