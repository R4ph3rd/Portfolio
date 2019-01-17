//class particule
function Particle(x, y, _mass, _size, _seuil) {

    // particule class should have location, velocity, acceleration, friction, and gravity
    // particules should be attracted to centralPoint
    this.location = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.size = _size;
    this.seuil = _seuil;
    if (el == aboutpage) this.seuil = largeur * 2 //radius de l'objet pour que les points pivotent autour
    this.mass = _mass;
    this.direction = (int(random(0, 2)) == 0) ? 1 : -1;
    //console.log(this.direction)
    
    this.fontPoints = font.textToPoints('Raphaël Perraud', 0, 0, 10, {
        sampleFactor: 5,
        simplifyThreshold: 0
    })
    this.bounds = font.textBounds('Raphaël Perraud', 0, 0, 10)


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
    }

    this.updateToTypo = function () {
        beginShape();
        translate(-bounds.x * width / bounds.w, -bounds.y * height / bounds.h);
        for (let i = 0; i < points.length; i++) {
            let p = points[i];
            vertex(p.x * width / bounds.w + sin(20 * p.y / bounds.h + millis() / 1000) * width / 30,
                p.y * height / bounds.h)
        }
        endShape(CLOSE);
    }

    this.display = function () {
        ellipse(this.location.x, this.location.y, this.size * 2, this.size * 2);
    }
}
