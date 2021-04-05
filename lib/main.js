/* BELOW CODE ALWAYS ASSUMES SQUARE POOL */
const DEBUG = false
const SPEED = 5

function setup() {
  // let w = document.body.clientWidth
  // let h = document.body.clientHeight
  noStroke()

  createCanvas(spaceSize, spaceSize)
  initPool(poolSize)
}

var spaceSize = 1000
var cellSize = 20
var poolSize = spaceSize / cellSize
var play = false
var cells = []
var oldFrames = 0

function draw() {
  if(play && (frameCount - oldFrames > SPEED)) {
    generation()
    oldFrames = frameCount
  }

  for(let c of cells) c.redraw()
}

function generation() {
  let newGen = cells.map((c, index) => {
    try {
      return generateCellState(c, neighborStates(index))
    } catch(e){ return false }
  })
  cells = cells.map((c,i) => {c.alive = newGen[i]; return c})
}

function neighborStates(i) {
  let nbArr = [
    (i-1), (i+1),
    (i+poolSize-1),(i+poolSize),(i+poolSize+1),
    (i-poolSize-1),(i-poolSize),(i-poolSize+1),
  ]
  return nbArr.map(x => cells[x].alive)
}

function generateCellState(cell, neighborStates) {
  let liveNeigCount = neighborStates.reduce((p,n) => p+n)
  if(!cell.alive && liveNeigCount == 3) { return true }
  else if(cell.alive &&(liveNeigCount < 2 || liveNeigCount > 3)) { return false }
  else { return cell.alive }
}





function initPool(size){
  for(let x = 0; x < size; x++){
    for(let y = 0; y < size; y++){
      let i = poolSize*x + y
      let cell = new Cell(cellSize*x, cellSize*y, cellSize, i)
      cells.push(cell)
    }
  }

  // cells.forEach(c => c.spawn())
}



function keyPressed(){
  if(keyCode === 32) run()
  // event.preventDefault()
}

function run(){
  play = !play
  document.getElementById("button-run").innerText = play ? "STOP" : "RUN"
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

