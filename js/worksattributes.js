  
function workattribute(){
//attributs des works
let element = document.querySelector(".zonecentrale").getBoundingClientRect()
let posY = random(element.y)
let posX = random(element.x)
let taille = random(element.width/20)



this.worksToDisplay = [
    [createImg,NomProjet,Resume],
    [createImg,NomProjet,Resume],
    [createImg,NomProjet,Resume],
    [createImg,NomProjet,Resume],
]
}