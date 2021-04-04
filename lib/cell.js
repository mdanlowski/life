function Cell(_x, _y, side){
  this.x = _x
  this.y = _y
  this.s = side
  this.alive = false

  this.spawn = function() { this.alive = true }
  this.die = function() { this.alive = false }

  this.redraw = function(params) {
    if(!this.alive) {
      fill(0)
    } else { fill("yellow") }
    rect(this.x, this.y, this.s, this.s)
    noFill()
  }

}