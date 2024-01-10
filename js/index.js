class HangmanGame {
  constructor() {
    // Initialiser les variables du jeu
    this.secretWord = this.selectWord();
    this.score = 0;
    this.guesses = 0;
    this.usedLetters = [];
    this.lostScore = 0;
    this.gameOn = false;

    // Sélectionneurs
    this.letterButton = document
      .querySelector("#keyboard")
      .querySelectorAll("button");
    this.wordButton = document
      .querySelector("#user-input")
      .querySelector("button");
    this.wordInput = document.querySelector("input");
    this.hangmanWord = document.querySelector("#hangman-word");
    this.hangmanImage = document.querySelector("#hangman-img");
    this.scoreUI = document.querySelector("#score");
    this.guessesUI = document.querySelector("#guesses");

    // Ajouter des écouteurs d'événements
    this.letterButton.forEach((button) => {
      button.addEventListener("click", (e) => this.compareLetter(e));
    });
    this.wordButton.addEventListener("click", (e) => this.compareWord(e));
    this.wordInput.addEventListener("keypress", (e) => this.compareWord(e));
    document.addEventListener("DOMContentLoaded", () => this.updateWord());
  }

  newGame() {
    // Recharger la page pour commencer une nouvelle partie
    location.reload();
  }

  showMessage(status, divTitle, divMsg, divContainer) {
    // Afficher un message indiquant le résultat de la partie
    divContainer.style.display = "block";
    divTitle.innerHTML = status;
    divMsg.innerHTML = `The word was <span>${this.secretWord.toLowerCase()}</span>. </br> 
      The game ended with a total of ${this.guesses} attempts and ${this.score} points.`;
    divContainer.querySelector(".btn").addEventListener("click", () => this.newGame());
  }

  endGame(userWon) {
     // Terminer la partie en fonction de la victoire ou de la défaite du joueur
    const gameEndedDiv = document.querySelector("#game-ended");
    const gameEndedStatus = gameEndedDiv.querySelector("#game-ended-status");
    const gameEndedMsg = gameEndedDiv.querySelector("#game-ended-msg");
    let status = userWon ? "You won 😊" : "You lost 😢";
    this.showMessage(status, gameEndedStatus, gameEndedMsg, gameEndedDiv);
  }

  updateScoreTries() {
    // Mettre à jour le score affiché et les tentatives, et vérifier la défaite
    this.guessesUI.innerHTML = `ATTEMPTS: ${this.guesses}`;
    this.scoreUI.innerHTML = `POINTS: ${this.score}`;
    if (this.lostScore === 10) {
      this.endGame(false);
    }
  }

  updateWord() {
    // Mettre à jour le mot affiché avec des tirets pour les lettres non révélées
    let motMaj = "";
    let updatedWord = "";
    for (let i = 0; i < this.secretWord.length; i++) {
      if (this.usedLetters.indexOf(this.secretWord[i]) === -1) {
        updatedWord += "_";
        this.gameOn = true;
      } else {
        updatedWord += this.secretWord[i];
      }
    }
    this.hangmanWord.innerHTML = updatedWord;
  }

  updateHangman() {
    // Mettre à jour l'image du pendu en fonction du nombre de devinettes incorrectes
    this.hangmanImage.src = `img/${this.lostScore}.png`;
  }

  disableLetter(e) {
     // Désactiver le bouton de lettre cliquée et le marquer comme utilisé
    let clickedLetter = e.target;
    if (clickedLetter.id !== "used-letter") {
      clickedLetter.id = "used-letter";
      clickedLetter.disabled = true;
    }
  }

  compareLetter(e) {
    // Comparer la lettre cliquée avec le mot secret et mettre à jour l'état de la partie
    this.gameOn = false;
    const letter = e.target.innerHTML;
    if (this.usedLetters.indexOf(letter) === -1) {
      this.usedLetters.push(letter);
    }
    this.disableLetter(e);
    if (this.secretWord.indexOf(letter) === -1) {
      this.lostScore += 1;
      this.updateHangman();
    } else {
      this.score += 5;
      this.updateWord();
      if (!this.gameOn) {
        this.endGame(true);
      }
    }
    this.guesses += 1;
    this.updateScoreTries();
  }

  compareWord(e) {
    // Comparer le mot entré avec le mot secret et mettre à jour l'état de la partie
    if (e.keyCode === 13 || e.type === "click") {
      const inputWord = this.wordInput.value.toUpperCase();
      if (inputWord === this.secretWord) {
        this.hangmanWord.innerHTML = this.secretWord;
        this.score += 20;
        this.endGame(true);
      } else {
        this.lostScore += 1;
        this.updateHangman();
      }
      this.wordInput.value = "";
      this.guesses += 1;
      this.updateScoreTries();
    }
  }

  selectWord() {
    // Sélectionner un mot aléatoire dans le tableau de mots
    const wordArray = [
      "TICKET", "HAMMOCK", "CUCUMBER", "PLANE", "BEGINNING",
      "LAWYER", "FOOTWEAR", "DRINK", "COMMENT", "WISDOM",
      "TELEVISION", "PENGUIN", "TERRIBLE", "PUPPET", "HIVE",
      "RIDDLE", "RECIPE", "CURTAIN", "MORNING",
    ];
    return wordArray[Math.floor(Math.random() * wordArray.length)];
  }
}

// Creer une instance du class HangmanGame
const hangmanGame = new HangmanGame();
