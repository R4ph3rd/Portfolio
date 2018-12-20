<div class="contain">
    <div class="title">
        <span>Portfolio</span><br>
        <span>Armand Lemaitre</span>
    </div>
</div>
<script>
    var taille = screen.width;
    let movers = [];
    var particle = 2000;
    var fps;
    var clique = 0;
    var firstclique = 0;
    var menu = 0;
    var intro = 0;

    function setup() {
        frameRate(40);
        createCanvas(windowWidth, windowHeight);
        for (var i = 0; i < 5000; i++) {
            movers[i] = new Mover();
        }
    }

    function draw() {
        fps = frameRate();
        background(27, 16, 38);
        if (taille > 768) {
            if (particle < 4000) {
                if (fps < 25) {
                    particle = particle - 10;
                }
                if (fps > 40) {
                    particle = particle + 10;
                }
            }
        }else{
            particle = 50;
            
        }
        for (let i = 0; i < particle; i++) {
            movers[i].update();
            movers[i].checkedge();
            movers[i].display();
        }
    }
    class Mover {
        constructor() {
            this.position = createVector(random(width), random(height));
            this.velocity = createVector();
            this.acceleration = createVector();
            this.topspeed = 9;
        }

        update() {
            if (menu == 1 || firstclique == 0) {
                if ( taille > 768){
                    var centre = createVector(windowWidth / 2, windowHeight / 1.3);
                }else{
                    var centre = createVector(windowWidth / 2, windowHeight / 3);
                }
                this.acceleration = p5.Vector.sub(centre, this.position);
                this.acceleration.setMag(0.25);
                this.velocity.add(this.acceleration);
                this.velocity.limit(7);
                this.position.add(this.velocity);
            } else {
                if (clique == 1) {
                    var mouse = createVector(mouseX, mouseY);
                    this.acceleration = p5.Vector.sub(this.position, mouse);
                    this.acceleration.setMag(0.25);
                    this.velocity.add(this.acceleration);
                    this.velocity.limit(this.topspeed);
                    this.position.add(this.velocity);
                } else {
                    if (location.x < mouseX + 70 && location.x > mouseX - 70 && location.y < mouseY + 70 && location.y > mouseY - 70) {
                        this.acceleration = p5.Vector.sub(this.position, this.position);
                        this.acceleration.normalize();
                        this.acceleration.setMag(0.25);
                        this.velocity.add(this.acceleration);
                        this.velocity.limit(this.topspeed);
                        this.position.add(this.velocity);
                    } else {
                        var mouse = createVector(mouseX, mouseY);
                        this.acceleration = p5.Vector.sub(mouse, this.position);
                        this.acceleration.setMag(0.25);
                        this.velocity.add(this.acceleration);
                        this.velocity.limit(this.topspeed);
                        this.position.add(this.velocity);
                    }
                }
            }
        }

        display() {
            noStroke();
            fill(150);
            ellipse(this.position.x, this.position.y, 2.5, 2.5);
        }
        checkedge() {
            if (this.position.x > width) {
                this.position.x = 0;
            } else if (this.position.x < 0) {
                this.position.x = width;
            }
            if (this.position.y > height) {
                this.position.y = 0;
            } else if (this.position.y < 0) {
                this.position.y = height;
            }
        }
    }

    function centre(n) {
        menu = n;
    }

    function mousePressed() {
        clique = 1;
        setInterval(cliquetime, 1000);
        firstclique = 1;
    }

    function cliquetime() {
        clique = 0;
    }

    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
    }

</script>
