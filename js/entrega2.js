let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let jugador1 = new Jugador ("Lorena", '#F0F000',60,1);
jugador1.asignarFichas();
let ficha1 = jugador1.presentarFicha();

let jugador2 = new Jugador ("Pepe", '#FF0000',910,2);
jugador2.asignarFichas();
let ficha2 = jugador2.presentarFicha();

let tablero = new Tablero(290,50);
tablero.armarTablero();

let arrastrar = false;
let turno = 1;
dibujarUnaEstrella(70,300);
let fichaActual = null;

let juego = true;

let imageUser = new Image();
imageUser.src = "images/user.png";
imageUser.onload = function() {
  ctx.drawImage(imageUser, 20, 80, 90, 120);
  ctx.drawImage(imageUser, 865, 80, 90, 120);
}

tablero.dibujarTablero();
cargarImagenUsuario();
ficha1.dibujarConImagen();
ficha2.dibujarConImagen();
let imagenFicha = new Image();
imagenFicha.src = "images/ficha.png";
imagenFicha.onload = function() {
  ctx.drawImage(imagenFicha, 30, 10, 60, 60);
  ctx.drawImage(imagenFicha, 880, 10, 60, 60);
}
document.getElementById("fichas1").innerHTML = jugador1.fichas.length;
document.getElementById("fichas2").innerHTML = jugador2.fichas.length;

function cargarImagenUsuario() {
  ctx.drawImage(imageUser, 20, 80, 90, 120);
  ctx.drawImage(imageUser, 865, 80, 90, 120);
}

document.getElementById("nuevo").addEventListener("click", function() {
    jugador1.asignarFichas();
    jugador2.asignarFichas();
    tablero.armarTablero();
    arrastrar = false;
    turno = 1;
    juego = true;
    document.getElementById("resultados").innerHTML = "";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    actualizarPanel();
    dibujarUnaEstrella(80,300);
});

function dibujarUnaEstrella(X, Y) {
    ctx.fillStyle = "#e8e0cd";
    let estrella = 2.50;
    let rad = (2 * Math.PI) / estrella;

    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      x = X + 60 * Math.cos(rad * i);
      y = Y + 60 * Math.sin(rad * i);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
}

function actualizarPanel() {
    tablero.dibujarTablero();
    cargarImagenUsuario();
    document.getElementById("fichas1").innerHTML = jugador1.fichas.length;
    document.getElementById("fichas2").innerHTML = jugador2.fichas.length;
    ficha1.dibujarConImagen();
    ficha2.dibujarConImagen();
}

function posicionMouse(canvas, event) {
  let posicion = canvas.getBoundingClientRect();
  return { // devuelve un objeto
    x: Math.round(event.clientX - posicion.left),
    y: Math.round(event.clientY - posicion.top)
  };
}

function cambiarTurno() {
  if (turno == 1) {
    turno = 2;
    dibujarUnaEstrella(920,300);
  }
  else {
    turno = 1;
    dibujarUnaEstrella(80,300);
  }
}

canvas.addEventListener("mousedown", function(event) {
  let mousePos = posicionMouse(canvas, event);
  if (juego == true) {
    if (turno == 1 && ficha1.detectarToque(mousePos.x,mousePos.y)){
        fichaActual = jugador1.jugarFicha();
        arrastrar = true;
    }
    if (turno == 2 && ficha2.detectarToque(mousePos.x,mousePos.y)) {
        fichaActual = jugador2.jugarFicha();
        arrastrar = true;
    }
  }
}, false);

canvas.addEventListener("mousemove", function(event) {
  let mousePos = posicionMouse(canvas, event);
  if (arrastrar) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    actualizarPanel();
    fichaActual.posX = mousePos.x;
    fichaActual.posY = mousePos.y;
    fichaActual.dibujarConImagen();
  }
}, false);



function analizarPartida (jugador, mensaje) {
  if(tablero.informarGanador(jugador)) {
    document.getElementById("resultados").innerHTML = mensaje;
    juego = false;
  }
}

function analizarCantidadFichas (jugador) {
  if (jugador.fichas.length == 0 ) {
      document.getElementById("resultados").innerHTML = "sin fichas .... presione NUEVO JUEGO";
      // actualizarPanel();
          juego = false;
  }
}
function jugarTurno (mousePos, turno, jugador, mensaje){
      tablero.recibirFicha(mousePos.x, turno);
      fichaActual = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      actualizarPanel();
}

canvas.addEventListener("mouseup", function(event) {
  arrastrar = false;
  let mousePos = posicionMouse(canvas, event);
    if (fichaActual!=null) {
    let jugada = tablero.recibirFicha(mousePos.x, turno);
    if(jugada) {
      fichaActual = null;
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      // actualizarPanel();
        // console.log(turno);
        if (turno == 1 ) {
            analizarPartida(jugador1, "Ganador JUGADOR 1");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            actualizarPanel();
        }
        else {
            analizarPartida(jugador2, "Ganador JUGADOR 2");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            actualizarPanel();
            if (jugador2.fichas.length == 0 ) {
                document.getElementById("resultados").innerHTML = "EMPATE .... presione NUEVO JUEGO";
                    juego = false;
            }
          }
        cambiarTurno();
    }
  }
}, false);
