let wordToGuess;
let currentGuess;
let attempts = 0;
const maxAttempts = 6;
let previousAttempts = [];
let isGameOver = false; // Variable para controlar si el juego ha terminado
let color = "#ffffff"; // Color inicial

updateGameUI();

// Función para cifrar la palabra
function encryptWord(word) {
    // Aquí puedes implementar cualquier método de cifrado que desees
    // Por ejemplo, podrías rotar los caracteres o aplicar un cifrado simple de sustitución
    return btoa(word); // Codificar la palabra en base64
}

// Función para descifrar la palabra
function decryptWord(encryptedWord) {
    // Aquí debes implementar el método de descifrado correspondiente al cifrado que utilizaste
    // Por ejemplo, para base64 puedes usar atob()
    return atob(encryptedWord); // Decodificar la palabra desde base64
}

function generateRandomEncryptedWord() {
    const words = ["Fronilda", "Sabrina", "Abner", "Petro","Pepe","Eloísa", "Harold","Diego","Mireya","Angélica","Merlo","Gamma","Florián","Arturo","Simón","Vientolino","Valentino","Gelidonio","Vincendio","Dalia","Marlon","Cyrus","Iván","Mulinda","Flora","Egón","Bartolomé","Majid","Deridio","Eudora","Elmer","Renee","Onofre","Teodoro","Sandor","Herman","Matilde","Cristóforo","Nolan","Raúl","Rómulo","Sileno","Kalkos","Egle","Vespera","Eritia","Leonor","Selus","Wizardeo","PokeToribio","Bonfirez","ThePotatoCamera"];
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    return encryptWord(randomWord);
}

function updateGameUI() {
    if (!wordToGuess) {
        wordToGuess = generateRandomEncryptedWord();
        const decryptedWord = decryptWord(wordToGuess);
        currentGuess = "?".repeat(decryptedWord.length);
    }

    const decryptedWordLength = decryptWord(wordToGuess).length;

    // Actualizar el campo de entrada con el límite de caracteres adecuado
    const input = document.getElementById("input");
    input.maxLength = decryptedWordLength;
    input.style.width = "300px"; // Establecer un ancho fijo para el campo de entrada
    input.placeholder = `Personaje de ${decryptedWordLength} letras`; // Establecer el placeholder con la longitud de la palabra

    document.getElementById("word").textContent = currentGuess;
    document.getElementById("feedback").textContent = `Intentos: ${attempts}/${maxAttempts}`;

    // Actualizar la lista de intentos anteriores
    const previousAttemptsContainer = document.getElementById("previousAttempts");
    previousAttemptsContainer.textContent = `Intentos Anteriores:\n${previousAttempts.join('\n')}`;

    // Resto del código de actualización de la interfaz de usuario...
}

function checkGuess() {
    const guess = normalizeText(document.getElementById("input").value.toLowerCase()); // Convertir a minúsculas y normalizar

    if (isGameOver || guess.length !== decryptWord(wordToGuess).length || !/^[a-z]+$/.test(guess)) {
        // Si el juego ha terminado o la suposición no es válida, no hacer nada
        return;
    }

    // Convertir la palabra a adivinar a minúsculas y normalizar
    const wordToGuessNormalized = normalizeText(decryptWord(wordToGuess).toLowerCase());

    // Incrementar el contador de intentos solo si el juego no ha terminado
    attempts++;

    // Verificar si la palabra fue adivinada (ignorando mayúsculas/minúsculas y tildes)
    if (guess === wordToGuessNormalized) {
        updateGuess(decryptWord(wordToGuess)); // Mostrar la palabra con las mayúsculas originales
        updateGameUI();
        displayMessage("¡Felicidades! ¡Adivinaste la palabra!");
        endGame();
    } else {
        previousAttempts.push(guess);
        updateGuess(guess);
        updateGameUI();

        if (attempts >= maxAttempts) {
            displayMessage(`Lo siento, te has quedado sin intentos. La palabra correcta era "${decryptWord(wordToGuess)}".`);
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
        return wordToGuess[index] === guess[index] ? guess[index] : (Math.random() < 0.5 ? letter : "?");
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
    wordToGuess = null; // Reiniciar la palabra para que se genere una nueva en el próximo juego
    currentGuess = null; // Reiniciar la conjetura actual
    attempts = 0;
    previousAttempts = [];
    isGameOver = false; // Reiniciar el estado del juego
    color = "#ffffff"; // Restaurar el color inicial

    // Limpiar la interfaz de usuario
    document.getElementById("word").textContent = "";
    document.getElementById("feedback").textContent = "";

    // Habilitar el botón de envío
    const submitButton = document.getElementById("submit");
    submitButton.disabled = false;

    // Borrar el contenido del input al reiniciar
    document.getElementById("input").value = "";

    updateGameUI(); // Actualizar la interfaz de usuario para comenzar un nuevo juego
}