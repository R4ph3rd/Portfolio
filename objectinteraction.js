var vitessemax = 5;
var CF = 0.8; //coefficient of friction;
var particulesmax = 1000; //will change depending on screen size
Particle particles = new Particle[particulesmax];
mouse = createVector();

function setup() {
    background(30);
    mouse = createVector(mouseX, mouseY);
    size(1900, 900);

    //initialize paticles
    for (int i = 0; i < particles.length; i++) {
        particles[i] = new Particle(random(0, width), //x
            random(0, height), //y
            random(2, 50), //mass
            random(1, 4), //size
            random(100, 150)); //rotation threshold
    }
}

function draw() {
    noStroke();
    fill(30, 20);
    rect(0, 0, width, height);
    updateMouseVector();
    fill(23, 175, 135);
    for (int i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].display();

    }
}

//update x and y depending on mouseposition or mobile inclination
function updateMouseVector() {
    mouse.x = mouseX;
    mouse.y = mouseY;
}

//class particle
function Particle {

    this.location = createVector(),
    this.velocity,
    this.acceleration;
    this.mass,
    this.size,
    this.threshold;
    this.dir;

    Particle(this.x, this.y, this. _mass, this._size, this._threshold) {
        // particle class should have location, velocity, acceleration, friction, and gravity
        // particles should be attracted to mouse
        this.location = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.mass = _mass;
        this.size = _size;
        this.threshold = _threshold;

        //set rotation direction
        this.dir = (random(0, 2) < 1) ? 1 : -1;
    }

    function display() {
        ellipse(this.location.x, this.location.y, this.size * 2, this.size * 2);
    }

    function calculateFriction() {
        this.friction = createVector(this.velocity.get());
        this.friction.normalize();
        this.friction.mult(-1);
        this.normal = 1; //simplified normal force value
        this.frictionMag = CF * normal;
        this.friction.mult(frictionMag);

        return friction;
    }

    function calculateGravity() {
        this.gravity = createVector(sub(this.mouse, this.location)); //make vector pointing towards mouse
        this.distance = this.gravity.mag(); //distance between particle and mouse
        this.mouseMass = 500.0; //arbitrary value, will change depeing on screen size
        this.G = 9.0; //arbitrary gravitational constant, idem
        this.gravitation = (this.G * this.mouseMass * this.mass) / (this.distance * this.distance); // formule de gravite pour la force gravitionnelle
        this.gravity.normalize();
        this.gravity.mult(gravitation);
        return this.gravity;
    }

   function calculateTangent(this.gravity) {
        this.tangent;

        if (this.dir == 1) {
            this.tangent = createVector(-this.gravity.y, this.gravity.x);
        } else {
            this.tangent = createVector((this.gravity.y, -this.gravity.x));
        }
        this.tangent.mult(this.gravity.mag());
        return this.tangent;
    }

    //ensure that the particles stay on screen
    function check() {
        if (this.location.x > width || this.location.x < 0) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.location.y > height || this.location.y < 0) {
            this.velocity.y = -this.velocity.y;
        }
    }

   function applyForce(force) {
        this.acceleration.add(createVector(div(this.force, this.mass)));
    }



    function update() {
        this.gravity = createVector(calculateGravity());
        this.friction = createVector(calculateFriction());
        this.distance = dist(this.location, this.mouse);

        //particles should be repelled on click
        if (mousePressed) {
            this.antigrav = createVector(calculateGravity());
            this.antigrav.mult(-1.1);
            applyForce(this.antigrav);
        }

        applyForce(this.gravity);
        applyForce(this.friction);

        if (dist(this.location, this.mouse) <= this.threshold) {
            this.tangent = createVector(calculateTangent(this.gravity));
            applyForce(this.tangent);
        }

        this.velocity.add(this.acceleration);

        this.velocity.limit(this.vitessemax);
        this.location.add(this.velocity);
        check();
        this.acceleration.mult(0); //clear acceleration each frame
    }
}
