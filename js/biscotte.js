
  //biscottes class
  function biscotte() {
      this.x = random(Xrect / 2 + 5, width - (Xrect / 2 + 5))
      this.y = random(Yrect / 2 + 5, height - (Yrect / 2 + 5))
      this.foundAspot = true
      this.transparence = 255

      if (biscottes.length > 0) {
          this.foundAspot = false
      }

      //verification in order to avoid superposition
      while (this.foundAspot == false) {
          this.x = random(Xrect / 2 + 5, width - (Xrect / 2 + 5))
          this.y = random(Yrect / 2 + 5, height - (Yrect / 2 + 5))

          //compare à toutes les positions des rectangles déjà affichés
          this.overlapping = false
          for (let i = 0; i < biscottes.length; i++) {
              if (abs(this.x - biscottes[i].x) < Xrect + 5 && abs(this.y - biscottes[i].y) < Yrect + 5) {
                  //if( dist(this.x, this.y, biscottes[i].x, biscottes[i].y ) 
                  //   < sqrt(pow(this.x - biscottes[i].x, 2) + pow(this.y - biscottes[i].y, 2))){
                  this.overlapping = true

              }
          }
          //reverify with new coordinates
          if (!this.overlapping) this.foundAspot = true
      }

      
      this.update = function () {
          this.transparence = this.transparence - 1
         //console.log("----------------" + "transparence=" + this.transparence + "---------")
          this.transparence = constrain(this.transparence, 0, 255)
      }

      
      this.display = function (pg) {
          pg.noStroke()
          pg.fill(232,223,205, this.transparence)
          pg.rectMode(CENTER)
          pg.rect(this.x, this.y, Xrect, Yrect, 15)
      }
}