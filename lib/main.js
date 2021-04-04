/* BELOW CODE ALWAYS ASSUMES SQUARE POOL */

function setup() {
  // let w = document.body.clientWidth
  // let h = document.body.clientHeight
  noStroke()
  createCanvas(spaceSize, spaceSize)
  let poolSize = spaceSize / cellSize
  initPool(poolSize)
}

var spaceSize = 400
var cellSize = 20
var play = true
var cells = []

function draw() {
  // if(play) 
  generation()
  // background(255)
}

function generation() {
  let nextGenStates = cells.map(c => c)
  for(let c of cells) c.redraw()
}

function initPool(size){
  for(let x = 0; x < size; x++){
    for(let y = 0; y < size; y++){
      let cell = new Cell(size*x, size*y, cellSize)
      cells.push(cell)
    }
  }
  cells.forEach(c => c.spawn())
}




function mousePressed(){
  let c = cells.filter(
    cell => {
      xfits = mouseX >= cell.x && mouseX <= cell.x+cell.s
      yfits = mouseY >= cell.y && mouseY <= cell.y+cell.s
      return xfits && yfits
    }
  )[0]
  if(c == undefined) return
  else if(c.alive) { c.die() } else { c.spawn() }
}

