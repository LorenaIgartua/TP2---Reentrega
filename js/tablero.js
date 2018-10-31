function Tablero ()  {
  let posInicioX = 250;
  let posInicioY = 150;
  let matriz = [];
  let recibidoOK = false;
};

function Tablero (posX, posY)  {
  this.posInicioX = posX;
  this.posInicioY = posY;
  this.matriz = new Array();
};

Tablero.prototype.armarTablero = function ()  {
  for (let i=0; i < 7; i++) { //bucles para crear casilleros.
    let fila = new Array();
    for (let j=0; j < 6; j++) {
        let aux = new Casillero(this.posInicioX + i*60, this.posInicioY + j*60);
        fila[j] = aux;
        }
      this.matriz[i] = fila;
    }
};

Tablero.prototype.dibujarTablero = function () {
  for (let i=0; i < 7; i++) { //bucles para dibujar casilleros
    for (let j=0; j < 6; j++) {
        this.matriz[i][j].dibujar();
    }
  }
};

Tablero.prototype.recibirFicha = function (posX, turno) {
  let col = 0;
  let ubicacionCol = false;
  while ((col < 7) && (!ubicacionCol)) {
    if ((posX < this.matriz[col][0].inicioDropZone) || (posX > this.matriz[col][0].finDropZone)) {
      col++;
    }
    else {
      ubicacionCol = true;
    }
  }
  if(ubicacionCol) {
    let fila = 5;
    let ubicacion = false;
    while ((fila >= 0) && (!ubicacion)) {
      if (this.matriz[col][fila].valor != 0) {
        fila--;
      }
      else {
        ubicacion = true;
      }
    }
    this.matriz[col][fila].valor = turno;
      return true;
  }
  return false;

};

Tablero.prototype.determinarGanadorHorizontal = function (jugador)  {
  let id = jugador.orden;
  for (let i=0; i < 4; i++) {
    for (let j=0; j < 6; j++) {
      if ( (this.matriz[i][j].valor == id) && (this.matriz[i+1][j].valor == id)
            && (this.matriz[i+2][j].valor == id) && (this.matriz[i+3][j].valor == id)) {
        return true;
      }
  }
}
  return false;
}

Tablero.prototype.determinarGanadorVertical = function (jugador)  {
  let id = jugador.orden;
  for (let i=0; i < 7; i++) {
    for (let j=0; j < 3; j++) {
      if ( (this.matriz[i][j].valor == id) && (this.matriz[i][j+1].valor == id)
         && (this.matriz[i][j+2].valor == id)   && (this.matriz[i][j+3].valor == id) ) {
        return true;
      }
  }
}
  return false;
}

Tablero.prototype.determinarGanadorDiagonalIzquierda = function (jugador)  {
  let id = jugador.orden;
  for (let i=6; i > 2; i--) {
    for (let j=5; j > 3; j--) {
      if ( (this.matriz[i][j].valor == id) && (this.matriz[i-1][j-1].valor == id) &&
        (this.matriz[i-2][j-2].valor == id) && (this.matriz[i-3][j-3].valor == id)) {
               return true;
      }
  }
}
  return false;
}

Tablero.prototype.determinarGanadorDiagonalDerecha = function (jugador)  {
  let id = jugador.orden;
  for (let i=0; i < 4; i++) {
    for (let j=5; j > 2; j--) {
      if ( (this.matriz[i][j].valor == id) && (this.matriz[i+1][j-1].valor == id) &&
           (this.matriz[i+2][j-2].valor == id) && (this.matriz[i+3][j-3].valor == id)) {
             return true;
      }
  }
}
  return false;
}

Tablero.prototype.informarGanador = function (jugador)  {
  if ( this.determinarGanadorDiagonalIzquierda(jugador) ||  this.determinarGanadorDiagonalDerecha(jugador)
        || this.determinarGanadorHorizontal(jugador)  || this.determinarGanadorVertical(jugador) ) {
      return true;
    }
    else {
      return false;
    }
}
