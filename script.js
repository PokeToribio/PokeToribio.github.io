let wordToGuess = generateRandomWord();
let currentGuess = "?".repeat(wordToGuess.length);
let attempts = 0;
const maxAttempts = 6;
let previousAttempts = [];
let isGameOver = false; // Variable para controlar si el juego ha terminado
let color = "#ffffff"; // Color inicial

updateGameUI();

function generateRandomWord() {
    const words = ["Fronilda", "Sabrina", "Abner", "Petro","Pepe","Eloísa", "Harold","Diego","Mireya","Angélica","Merlo","Gamma","Florián","Arturo","Simón","Vientolino","Valentino","Gelidonio","Vincendio","Dalia","Marlon","Cyrus","Iván","Mulinda","Flora","Egón","Bartolomé","Majid","Deridio","Eudora","Elmer","Renee","Onofre","Teodoro","Sandor","Herman","Matilde","Cristóforo","Nolan","Raúl","Rómulo","Sileno","Kalkos","Egle","Vespera","Eritia","Leonor","Selus","Wizardeo","PokeToribio","Bonfirez","ThePotatoCamera"];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function updateGameUI() {
    document.getElementById("word").textContent = currentGuess;
    document.getElementById("feedback").textContent = `Intentos: ${attempts}/${maxAttempts}`;

    const attemptsDisplay = document.getElementById("feedback");
    // Cambiar color en el intento 3 y mantenerlo hasta el intento 4
    if (attempts === 3 || attempts === 4) {
        attemptsDisplay.style.color = "#ff8c00";
        color = "#ff8c00"; // Guardar el color actual
    } else if (attempts === 5) {
        attemptsDisplay.style.color = "#ff0000"; // Cambiar a rojo en el intento 5
        color = "#ff0000"; // Guardar el color actual
    } else {
        attemptsDisplay.style.color = color; // Restaurar el color guardado
    }

    document.getElementById("previousAttempts").textContent = `Intentos Anteriores:\n${previousAttempts.join('\n')}`;

    const wordLength = wordToGuess.length;
    const container = document.getElementById("previousAttemptsContainer");
    const minWidth = 150;
    const calculatedWidth = Math.max(minWidth, wordLength * 30);
    container.style.maxWidth = `${calculatedWidth}px`;

    const input = document.getElementById("input");
    input.maxLength = wordLength;
    input.style.width = `300px`; // Tamaño fijo, ajusta según sea necesario
    input.style.height = `30px`; // Ajusta según sea necesario

    // Cambiar el placeholder para proporcionar una pista
    input.placeholder = `Personaje de ${wordLength} letras`;

    const inputContainerLabel = document.querySelector("#inputContainer label");
    if (inputContainerLabel) {
        // Establecer estilos para el label
        inputContainerLabel.style.display = "block";
        inputContainerLabel.style.marginBottom = "10px";
        inputContainerLabel.style.color = "#ffc832";
    }

    const submitButton = document.getElementById("submit");
    // Habilitar o deshabilitar el botón según el estado del juego
    submitButton.disabled = isGameOver;
}

function checkGuess() {
    const guess = normalizeText(document.getElementById("input").value.toLowerCase()); // Convertir a minúsculas y normalizar

    if (isGameOver || guess.length !== wordToGuess.length || !/^[a-z]+$/.test(guess)) {
        // Si el juego ha terminado o la suposición no es válida, no hacer nada
        return;
    }

    // Convertir la palabra a adivinar a minúsculas y normalizar
    const wordToGuessNormalized = normalizeText(wordToGuess.toLowerCase());

    // Incrementar el contador de intentos solo si el juego no ha terminado
    attempts++;

    // Verificar si la palabra fue adivinada (ignorando mayúsculas/minúsculas y tildes)
    if (guess === wordToGuessNormalized) {
        updateGuess(wordToGuess); // Mostrar la palabra con las mayúsculas originales
        updateGameUI();
        displayMessage("¡Felicidades! ¡Adivinaste la palabra!");
        endGame();
    } else {
        previousAttempts.push(guess);
        updateGuess(guess);
        updateGameUI();

        if (attempts >= maxAttempts) {
            displayMessage(`Lo siento, te has quedado sin intentos. La palabra correcta era "${wordToGuess}".`);
            endGame();
        }
    }
}

// Función para normalizar texto eliminando tildes
function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


function updateGuess(guess) {
    currentGuess = currentGuess.split("").map((letter, index) => {
        return wordToGuess[index] === guess[index] ? guess[index] : letter;
    }).join("");
}

function endGame() {
    isGameOver = true;
    // Deshabilitar el botón de submit al finalizar el juego
    const submitButton = document.getElementById("submit");
    submitButton.disabled = true;

    // Reiniciar el juego después de un breve tiempo (puedes ajustar el tiempo)
    setTimeout(() => {
        resetGame();
    }, 3000); // 2000 milisegundos (2 segundos) en este caso
}

function displayMessage(message) {
    const feedbackElement = document.getElementById("feedback");
    feedbackElement.textContent = message;
}

function resetGame() {
    wordToGuess = generateRandomWord();
    currentGuess = "?".repeat(wordToGuess.length);
    attempts = 0;
    previousAttempts = [];
    isGameOver = false; // Reiniciar el estado del juego
    color = "#ffffff"; // Restaurar el color inicial

    // Borrar el contenido del input al reiniciar
    document.getElementById("input").value = "";

    updateGameUI();
}
