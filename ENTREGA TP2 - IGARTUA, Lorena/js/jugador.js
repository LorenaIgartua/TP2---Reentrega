function Jugador ()  {
  this.nombre = "";
  this.fichas = [];
  this.color = '#000000';
  this.lado = 0;
  this.orden = 0;
};

function Jugador (nombre, color, posX, orden)  {
  this.nombre = nombre;
  this.fichas = new Array();
  this.color = color;
  this.lado = posX;
  this.orden = orden;
}

Jugador.prototype.asignarFichas = function () {
   for (let i=0; i < 21; i++) { //bucles para crear casilleros.
      let aux = new Ficha (this.lado,40,35,this.color);
        this.fichas[i] = aux;
      }
}

Jugador.prototype.jugarFicha = function () {
   return this.fichas.pop();
}

Jugador.prototype.presentarFicha = function () {
  if (this.fichas.length > 0 ) {
    return this.fichas[0];
  }
  }

Jugador.prototype.sinFicha = function () {
  if (this.fichas.length == 0 ) {
    return false;
  }
    return true;
  }
