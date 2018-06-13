class Hangman {
    constructor(word, guesses) {
        this.word = word.toLowerCase().split('');
        this.remainingGuesses = guesses;
        this.guessedLetters = [];
        this.losingLetters = [];
        this.initializeGuessedLetters();
        this.gameStatus = 'Playing';
    }

    initializeGuessedLetters() {
        this.word.forEach((letter) => {
            if (letter === ' ') {
                this.guessedLetters.push(' ');
            } else {
                this.guessedLetters.push('*');
            }
        });
    }

    makeGuess(letter) {
        letter = letter.toLowerCase();
        if (typeof letter !== 'string' && typeof letter !== 'number') {
            throw Error('invalid input');
        } else {
            let foundLetter = false;
            if (this.guessedLetters.includes(letter) || this.losingLetters.includes(letter)) {
                console.log(`Error, you already guessed ${letter}`);
                return false;
            }
            this.word.forEach((wordLetter, index) => {
                if (wordLetter === letter) {
                    console.log('You guessed a correct letter!');
                    this.guessedLetters[index] = letter;
                    foundLetter = true;
                }
            });
            if (!foundLetter) {
                console.log('Letter not found!');
                console.log('remaining guesses: ' + this.remainingGuesses);
                this.remainingGuesses--;
                this.losingLetters.push(letter);
                this.checkForWin(this.word, this.guessedLetters);
                return false;
            } else {
                this.checkForWin(this.word, this.guessedLetters);
                return true;
            }
        }
    }

    getPuzzle() {
        let str = '';
        this.guessedLetters.forEach((letter) => {
            str += letter;
        });
        return str;
    }

    checkForWin(wordArr, guessedArr) {
        if (this.remainingGuesses === 0) {
            this.gameStatus = 'You Lost';
            document.querySelector('#reset-button').className = 'unhide';
            return false;
        }
        if(wordArr.length !== guessedArr.length) {
            console.log('Arrays are not the same length');
            return false;
        } else {
            for(let i = 0; i < wordArr.length; i++) {
                if (wordArr[i] !== guessedArr[i]) {
                    return false;
                }
            }
        }
        this.gameStatus = 'Congrats, you Won!';
        document.querySelector('#reset-button').className = 'unhide';
        return true;
    }

    getRemainingGuesses() {
        return this.remainingGuesses;
    }

    getStatus() {
        return this.gameStatus;
    }

    getWord() {
        return 'Nice try! Word was: ' + this.word.join('');
    }

}

