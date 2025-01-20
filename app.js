let secretNumber;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 50;

let addElementText = (element, text) => {
  let elementHTML = document.querySelector(element);
  elementHTML.innerHTML = text;
};

function verificarIntenos() {
  let intentosUsuario = parseInt(document.getElementById("valorUsuario").value);

  if (isNaN(intentosUsuario)) {
    alert("Ingresa un valor válido");
    return;
  }

  intentos++;

  if (intentosUsuario === secretNumber) {
    addElementText(
      "p",
      `WIN 🥳  acertaste en ${intentos} ${
        intentos === 1 ? "intento" : "intentos"
      }`
    );
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (intentosUsuario > secretNumber) {
      addElementText("p", `El número secreto es menor`);
    } else {
      addElementText("p", "El número secreto es mayor");
    }
  }

  cleanInput();
}

function cleanInput() {
  document.getElementById("valorUsuario").value = "";
}

function generateRandomNumber() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
  //Si el numero generado ya existe en la lista de numeros sorteados.

  // validar si ya se generaron todos los números posibles
  if (listaNumerosSorteados.length == numeroMaximo) {
    addElementText(
      "p",
      "Todos los números posibles han sido generados. No se pueden generar más números únicos."
    );
    return;
  } else {
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      return generateRandomNumber();
    } else {
      listaNumerosSorteados.push(numeroGenerado);
      console.log(listaNumerosSorteados);
      return numeroGenerado;
    }
  }
}

function condicionesIniciales() {
  addElementText("h1", "Secret number Game");
  addElementText("p", `Guess the secret number between 1 and ${numeroMaximo}`);
  secretNumber = generateRandomNumber();
  intentos = 0;
  console.log(secretNumber);
}

function reiniciarJuego() {
  cleanInput();
  condicionesIniciales();
  document.getElementById("reiniciar").setAttribute("disabled", true);
  valorUsuario.focus();
}

const inputField = document.getElementById("valorUsuario");

inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    verificarIntenos();
  }
});

const reiniciar = document.getElementById("reiniciar");

reiniciar.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    verificarIntenos();
  }
});

// Inicializa las condiciones del juego
condicionesIniciales();
