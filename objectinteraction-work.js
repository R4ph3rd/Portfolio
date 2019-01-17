let vitessemax = 4;
let frictioncoef = 0.8; //coefficient of friction;
let particulesmax; //will change depending on screen size
let fps;
let displayedparticules
let particules = [particulesmax];
let centralPoint;
let G = 9; //constant of gravitation
let massPoint = 400; // will change depeing on screen size
let heightless = document.querySelector("footer").getBoundingClientRect().height
//pour le portrait dans about
let position
let largeur
let hauteur
let xpos
let ypos
//what page are we reading ?
const el = location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
const workpage = "work.html"
const aboutpage = "about.html"
var jsonData
//get scroll position
let scrollPos = 0
//var scrollEvent = new WheelEvent("scrollWheel",{"deltaX": 0,"deltaY": 0, "deltaMode": 1});
//let scrollEvent = function (evt){ }
//window.addEventListener("scroll", scrollEvent);

function preload(){
  jsonData = loadJSON('../data.json') 
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    //initialize paticles
    for (i = 0; i < particulesmax; i++) {
        particules[i] = new Particle(random(0, width), //x
            random(0, height), //y
            random(2, 50), //mass
            random(1, 4), //size
            random(100, 150)); //seuil
    }

    if ((el == workpage) || (el == aboutpage)) {
        position = document.querySelector(".taillezone").getBoundingClientRect()
        largeur = position.width
        hauteur = position.height
        xpos = position.x
        ypos = position.y
    }
    heightless = document.querySelector("footer").getBoundingClientRect().height
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    //pixelDensity(1)
    background(30);
    centralPoint = createVector(mouseX, mouseY)
    //create gravitation points on fixed objects for work & about pages
    if ((el == workpage) || (el == aboutpage)) {
        position = document.querySelector(".taillezone").getBoundingClientRect()
        largeur = position.width
        hauteur = position.height
        xpos = position.x
        ypos = position.y

        centralPoint = createVector(xpos + (largeur * 0.5), ypos + (hauteur * 0.5));
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
            random(100, 150)); //seuil //seuil //correspond to my values (100,150 that I used on a screen of 1600px length
    }
}

function mouseWheel(event) {
  scrollPos += event.delta;
     alert(scrollPos)
}

function draw() {
    noStroke();
    //background
    fill(30, 20);
    rect(0, 0, width, height);
    
    for( let i = 0 ; i < jsonData.length ; i++){
//        img = createImage(jsonDate[i].['img'])
//        titre = createImage(jsonData[i].['title'])
//       txt = createP(jsonData[i].['resume'])
        
    }
    



    if ((el == workpage) || (el == aboutpage)) centralPoint = createVector(xpos + (largeur * 0.5), ypos + (hauteur * 0.5));
    else centralPoint = createVector(mouseX, mouseY)
    fps = frameRate()

    //adapter le nombre de particules en fonction des fps & taille de l'écran
    displayedparticules = width / 1.6
    if (fps < 25) displayedparticules -= 10;
    if (fps > 40) {
        if (displayedparticules < 1000) displayedparticules += 10
    }
    //particles
    fill(23, 175, 135);
    for (i = 0; i < displayedparticules; i++) {
        particules[i].update();
        particules[i].display();
    }
}

//attention ! MouseWheel renvoie un booléen et event.deltaY est inversé si c'est un mac...
// comment différencier descente et montée ? Pour que l'on puisse revenir tout en haut et de nouveau avoir la densité de points initiale...

//to be readable, have to decrease points density   
/*function mouseWheel(event) {
    console.log("eventdelta = " + event.delta);
    //move the square according to the vertical scroll amount
    if (displayedparticules > 500) {
        displayedparticules -= event.delta / 4
        console.log("--------------particules = " + displayedparticule+ "--------------------------------------------")
    }
}*/

//class particule
function Particle(x, y, _mass, _size, _seuil) {

    // particule class should have location, velocity, acceleration, friction, and gravity
    // particules should be attracted to centralPoint
    this.location = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.size = _size;
    this.seuil = _seuil;
    if ((el == workpage) || (el == aboutpage)) this.seuil = largeur *2 //radius de l'objet pour que les points pivotent autour
    this.mass = _mass;
    this.direction = (int(random(0, 2)) == 0) ? 1 : -1;
    //console.log(this.direction)


    this.calculateFriction = function () {
        let friction = createVector(this.velocity.x, this.velocity.y);
        friction.normalize();
        friction.mult(-1);
        friction.mult(frictioncoef);

        return friction;
    }

    this.calculateGravity = function () {
        let gravity = p5.Vector.sub(centralPoint, this.location); //make vector pointing towards centralPoint
        let distance = p5.Vector.mag(gravity); //distance between particle and centralPoint
        //let distance = dist(centralPoint.x, centralPoint.y, location.x, location.y)
        let gravitation = (G * massPoint * this.mass) / (distance * distance * 1.2); // formule de gravite pour la force gravitionnelle
        gravity.normalize();
        gravity.mult(gravitation);
        // console.log(gravity)
        return gravity;
    }

    this.calculateTangent = function (gravite) {
        let tangent;
        //direction of rotation
        if (this.direction == 1) {
            tangent = createVector(-gravite.y, gravite.x);
            tangent.mult(gravite.mag());
        } else {
            tangent = createVector(gravite.y, -gravite.x);
            tangent.mult(gravite.mag());
        }
        return tangent;
    }

    //ensure that the particles stay on screen
    this.check = function () {
        let x1border = 0
        let x2border = width
        let y1border = 0
        let y2border = height
     /*   if ((el == workpage) || (el == aboutpage)) { //set myphoto position
            x1border = xpos - (largeur * 0.5)
            x2border = xpos + (largeur * 0.5)
            y1border = ypos - (largeur * 0.5)
            y2border = ypos + (largeur * 0.5)
        }*/
        
        if (this.location.x > x2border || this.location.x < x1border) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.location.y > y2border || this.location.y < y1border) {
            this.velocity.y = -this.velocity.y;
        }
    }
    
    this.applyForce = function (force) {
        this.acceleration.add(p5.Vector.div(force, this.mass));
    }


    this.update = function () {

        let gravity = this.calculateGravity();
        //console.log("gravity")
        let friction = this.calculateFriction();
        let distance = dist(this.location.x, this.location.y, centralPoint.x, centralPoint.y);
        this.applyForce(gravity);
        this.applyForce(friction);

        if (distance <= this.seuil) {
            let tangent = (this.calculateTangent(gravity));
            this.applyForce(tangent);
        }

        //vecteur d'accéleration
        this.velocity.add(this.acceleration);
        this.velocity.limit(vitessemax);
        this.location.add(this.velocity);
        this.check();
        this.acceleration.mult(0); //clear acceleration each frame

        //mediaqueries 
        if (width < 1200) this.seuil = random(100, 120)
        if (width < 800) this.seuil = random(80, 100)
        if (width < 600) this.seuil = random(70, 95)
        if (width < 400) this.seuil = random(60, 75)
    }

    this.display = function () {
        ellipse(this.location.x, this.location.y, this.size * 2, this.size * 2);
    }

}
