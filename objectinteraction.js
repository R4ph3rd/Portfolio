var vitessemax = 4;
var frictioncoef = 0.8; //coefficient of friction;
var particulesmax = 1000; //will change depending on screen size
var particules = [particulesmax];
var mouse;
let G = 9; //constant of gravitation
let mouseMass = 400.0; // will change depeing on screen size
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    //pixelDensity(1)
    background(30);
    mouse = createVector(mouseX, mouseY);


    //initialize paticles
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
    //update x and y depending on mouseposition or mobile inclination
    mouse.set(mouseX, mouseY)

    //billes
    fill(23, 175, 135);
    for (i = 0; i < particules.length; i++) {
        particules[i].update();
        particules[i].display();

    }
}


//class particule
function Particle(x, y, _mass, _size, _seuil) {

    // particule class should have location, velocity, acceleration, friction, and gravity
    // particules should be attracted to mouse
    this.location = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.size = _size;
    this.seuil = _seuil;
    this.mass = _mass;
    this.direction = (random(0, 2) < 1) ? 1 : -1;


    this.calculateFriction = function () {
        let friction = createVector(this.velocity.x, this.velocity.y);
        friction.normalize();
        friction.mult(-1);
        friction.mult(frictioncoef);

        return friction;
    }

    this.calculateGravity = function () {
        let gravity = p5.Vector.sub(mouse, this.location); //make vector pointing towards mouse
        let distance = p5.Vector.mag(gravity); //distance between particle and mouse
        //let distance = dist(mouse.x, mouse.y, location.x, location.y)
        let gravitation = (G * mouseMass * this.mass) / (distance * distance * 1.2); // formule de gravite pour la force gravitionnelle
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
        } else {
            tangent = createVector(gravite.y, -gravite.x);

            tangent.mult(gravite.mag());
        }
        return tangent;
    }

    //ensure that the particles stay on screen
    this.check = function () {
        if (this.location.x > width || this.location.x < 0) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.location.y > height || this.location.y < 0) {
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
        let distance = dist(this.location.x, this.location.y, mouse.x, mouse.y);

        //particules should be repelled on click ; remove that and see the  black hole !
         if (canvas.mousePressed() == true) {
            // console.log("je suis dans le if foireux")
             let antigrav = createVector(this.calculateGravity());
             antigrav.mult(-1);
             this.applyForce(antigrav);
         }

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
    }
    
     this.display = function () {
        ellipse(this.location.x, this.location.y, this.size * 2, this.size * 2);
    }

}
