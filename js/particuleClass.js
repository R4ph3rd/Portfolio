//class particule
//typography : inspired by a sketch of :
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de

function Particle(x, y, _mass, _size, _seuil) {

    // particule class should have location, velocity, acceleration, friction, and gravity
    // particules should be attracted to centralPoint
    this.location = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.size = _size;
    this.seuil = _seuil;
    this.mass = _mass;
    this.direction = (int(random(0, 2)) == 0) ? 1 : -1;
    this.scrollbound = 0

    //console.log(this.direction)

    //mediaqueries 
    if (width < 1200) this.seuil = random(100, 120)
    if (width < 800) this.seuil = random(80, 100)
    if (width < 600) this.seuil = random(70, 95)
    if (width < 400) this.seuil = random(60, 75)


    this.calculateFriction = function () {
        let friction = createVector(this.velocity.x, this.velocity.y);
        friction.normalize();
        friction.mult(-1);
        friction.mult(frictioncoef);

        return friction;
    }

    this.calculateGravity = function (_target, _G) {
       // console.log("*****taget =" + _target)
        //console.log("centrl =" + centralPoint + "******")
        let gravity = p5.Vector.sub(_target, this.location); //make vector pointing towards centralPoint
        let distance = p5.Vector.mag(gravity); //distance between particle and centralPoint
        let gravitation = (_G * massPoint * this.mass) / (distance * distance * 1.2); // formule de gravite pour la force gravitionnelle
        gravity.normalize();
        gravity.mult(gravitation);
         //console.log(gravity)
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
        
        //check if particle is behind the portrait
        if (el == aboutpage){
        let near = dist(this.location.x, this.location.y, x, y)
        if( near < worksContent[i].syze / 2 + 1) this.resetValues()
        }
    }
 
    this.resetValues = function() {
        this.location.x =  random(0, width)
        this.location.y =  random(0, height)
        this.mass = random(2, 50)
        this.size = random(1, 4) 
        this.seuil = random(100, 150)  
        this.velocity.x = 0
        this.velocity.y = 0
     }

    this.applyForce = function (force) {
        this.acceleration.add(p5.Vector.div(force, this.mass));
    }



    this.update = function (index, _G) {
        
        if (el == aboutpage) this.seuil = largeur  //radius de l'objet pour que les points pivotent autour
        if ((scrollPos > 2) && (el == homepage)) {
            centralPoint.x = pnts[index].x
            centralPoint.y = pnts[index].y
            this.scrollbound = 1
        } else {
            this.scrollbound = 0 //centralPoint is reset in the draw at every iteration
        }
        let gravity = this.calculateGravity(centralPoint, _G);

        
        let friction = this.calculateFriction();
        let distance = dist(this.location.x, this.location.y, centralPoint.x, centralPoint.y);
        this.applyForce(gravity);
        this.applyForce(friction);
        //index != pour éviter une mise en orbite lorsque je veux afficher la typo
        if ((distance <= this.seuil) && (this.scrollbound == 0)) {
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
        push()
        fill(23, 175, 135);
        noStroke()
        ellipse(this.location.x, this.location.y, this.size * 2, this.size * 2);
        pop()
    }
}
