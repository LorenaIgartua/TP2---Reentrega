function Casillero ()  {
  this.ancho = 60;
  this.alto = 60;
  this.posX = 0;
  this.posY = 0;
  this.inicioDropZone = 0;
  this.finDropZone = 0;
  this.valor = 0;
};


function Casillero (x,y)  {
  this.ancho = 60;
  this.alto = 60;
  this.posX = x;
  this.posY = y;
  this.inicioDropZone = x;
  this.finDropZone = x + this.ancho;
  this.valor = 0;
};

Casillero.prototype.dibujar = function () {
  let ctx = document.getElementById("canvas").getContext("2d");
  ctx.beginPath();
  ctx.fillStyle = "#000000";
  ctx.fillRect(this.posX,this.posY,this.ancho,this.alto);
  ctx.closePath();

  if (this.valor == 0) {
    let aux = new Ficha (this.posX+this.ancho/2,this.posY+this.alto/2,25,'#f3f4ec');
    aux.dibujar();
  }
  if (this.valor == 1) {
    let aux = new Ficha (this.posX+this.ancho/2,this.posY+this.alto/2,25,'#F0F000');
    aux.dibujarConImagen();
  }
  if (this.valor == 2) {
    let aux = new Ficha (this.posX+this.ancho/2,this.posY+this.alto/2,25,'#FF0000');
    aux.dibujarConImagen();
  }
}
