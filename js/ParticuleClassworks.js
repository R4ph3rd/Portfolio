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

    this.calculateGravity = function (_target) {
        let gravity = p5.Vector.sub(_target, this.location); //make vector pointing towards centralPoint
        let distance = p5.Vector.mag(gravity); //distance between particle and centralPoint
        let gravitation = (9.81 * massPoint * this.mass) / (distance * distance * 1.2); // formule de gravite pour la force gravitionnelle
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

    this.calculateProxy = function () {
        let bestNear = 50000
        let bestTarget = createVector()
        for (let i = 0; i < worksContent.length; i++) {
            let x = worksContent[i].x + (worksContent[i].syze / 2)
            let y = worksContent[i].y + (worksContent[i].syze / 2)
            let near = dist(this.location.x, this.location.y, x, y)

            if (near < bestNear) {
                bestNear = near
                bestTarget = createVector(x, y)
            }
        }
        return bestTarget
    }

    //ensure that the particles stay on screen
    this.check = function () {
        let x1border = 0
        let x2border = width
        let y1border = 0
        let y2border = height

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
        let centralPoint = this.calculateProxy()
        // console.log(centralPoint)
        let gravity = this.calculateGravity(centralPoint);
        let friction = this.calculateFriction();
        let distance = dist(this.location.x, this.location.y, centralPoint.x, centralPoint.y);
        this.applyForce(gravity);
        this.applyForce(friction);
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
