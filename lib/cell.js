var TXSIZE = 12

function Cell(_x, _y, side, index){
  this.x = _x
  this.y = _y
  this.s = side
  this.i = index
  this.alive = false

  this.spawn = function() { this.alive = true }
  this.die = function() { this.alive = false }
  this.swapState = function(){}

  this.redraw = function(params) {
    if(!this.alive) {
      fill(0)
    } else {
      fill("yellow")
    }
    rect(this.x, this.y, this.s, this.s)
    this.drawDebug()
    // resetDrawParams()
  }

  this.drawDebug = function(){
    if(!DEBUG) return
    let offset = TXSIZE/2
    let offsetY = 5
    fill(255)
    if(this.alive) fill(0)
    text(
      this.i.toString(),
      // cells.indexOf(this),
      this.x+offset, this.y+offset+offsetY
    )
    
  }
}


function resetDrawParams(){
  stroke(0)
  noStroke()
  noFill()
}