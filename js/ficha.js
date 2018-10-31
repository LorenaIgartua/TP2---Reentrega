function Ficha ()  {
  this.posX = 40;
  this.posY = 40;
  this.radio = 35;
  this.color = '#000000';
  this.jugada = false;
  this.image;

};

function Ficha (x,y,r,c)  {
  this.posX = x;
  this.posY = y;
  this.radio = r;
  this.color = c;
  this.image;
}

Ficha.prototype.dibujar = function () {
  let ctx = document.getElementById("canvas").getContext("2d");
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.posX, this.posY, this.radio,0,Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.closePath();
}

Ficha.prototype.dibujarConImagen = function () {
  let ctx = document.getElementById("canvas").getContext("2d");
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.posX, this.posY, this.radio,0,Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.closePath();

  let imagenFicha = new Image();
  imagenFicha.src = "images/ficha.png";
  let x = this.posX - this.radio - 5;
  let y = this.posY - this.radio - 5;
  // image.onload = function() {
    ctx.drawImage(imagenFicha, x, y, 80, 80);
  // }
}

Ficha.prototype.detectarToque = function(mouseX,mouseY) {
        let x = mouseX - this.posX;
        let y = mouseY - this.posY;
        return Math.sqrt(x*x + y*y) < this.radio ? true : false;
}
