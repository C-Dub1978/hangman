let hangman = null;


function generatePuzzleWord(game) {
    let p = document.createElement('p');
    let word = game.getPuzzle();
    p.innerHTML = word;

    let pGuesses = document.querySelector('#remaining');
    pGuesses.innerHTML = '';
    pGuesses.innerHTML = game.getRemainingGuesses() > 0 ? game.getRemainingGuesses() : game.getWord();

    let hmDiv = document.querySelector('#hangman');
    hmDiv.innerHTML = '';
    hmDiv.appendChild(p);

    let statusHeader = document.querySelector('#status-header');
    statusHeader.innerHTML = '';
    statusHeader.innerHTML = game.getStatus();

    return hmDiv;
}

function resetGame() {
    console.log('reset called');
    document.querySelector('#select-button').setAttribute('disabled', false);
    document.querySelector('#reset-button').className = 'hide';
    document.querySelector('#remaining').innerHTML = '';
    document.querySelector('#hangman').innerHTML = '';
}



document.querySelector('#select-button').addEventListener('click', (e) => {
   // let selectValue = document.querySelector('#select-box');
   // document.querySelector('#select-button').setAttribute('disabled', true);
   // const puzzle = getPuzzle((word) => {
   //     console.log('callback returned: ' + word + ' as word!');
   //     hangman = new Hangman(word, 10);
   //     generatePuzzleWord(hangman);
   //     document.querySelector('#guesses').className = 'unhide';
   //
   //     window.addEventListener('keypress', function(event) {
   //         const guess = event.key.toLowerCase();
   //         if(guess.match(/^[a-z0-9 ]$/i)) {
   //             hangman.makeGuess(guess);
   //             generatePuzzleWord(hangman);
   //         }
   //     });
   // }, selectValue.value);
    getPuzzleAsync();
});

document.querySelector('#reset-button').className = 'hide';

document.querySelector('#reset-button').addEventListener('click', (e) => {
   resetGame();
});