const httpCalls = {
    movie: 'https://api.themoviedb.org/3/movie/popular?api_key=da66f98234dcbc57ca142b990116664b&language=en-US&page=1',
    random: 'http://puzzle.mead.io/puzzle?wordCount=3'
};

const songs = [
    'Amber',
    'Some Days',
    'Ride The Lightning',
    'Enter Sandman',
    'Two Drops In The Ocean',
    'Tiny Dancer',
    'Rosa Parks',
    'Hello'
];

const getPuzzle = (callback, type) => {
    console.log('get puzzle called: type is: ' + type.toLowerCase());
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', (e) => {
        if (e.target.readyState === 4 && e.target.status === 200) {
            console.log(e);
            const data = JSON.parse(e.target.responseText);
            let word;
            if (type.toLowerCase() === 'movies') {
                word = data.results[getRandomNum()].title;
            } else if (type.toLowerCase() === 'random') {
                word = data.puzzle;
            }
            callback(word);
        } else if (e.target.readyState === 4) {
            console.log('Static song being returned');
            callback(songs[3]);
        }
    });
    let url = null;
    if(type.toLowerCase() === 'movies') {
        url = httpCalls.movie;
    } else if (type.toLowerCase() === 'random') {
        url = httpCalls.random;
    } else if (type.toLowerCase() === 'music') {
        url = 'none';
    }
    console.log('url is: ' + url);
    request.open('GET', url);
    request.send();
};

const getPuzzleAsync = () => {
    let selectValue = document.querySelector('#select-box');
    document.querySelector('#select-button').setAttribute('disabled', true);
    const puzzle = getPuzzle((word) => {
        console.log('callback returned: ' + word + ' as word!');
        hangman = new Hangman(word, 10);
        generatePuzzleWord(hangman);
        document.querySelector('#guesses').className = 'unhide';

        window.addEventListener('keypress', function(event) {
            const guess = event.key.toLowerCase();
            if(guess.match(/^[a-z0-9 ]$/i)) {
                hangman.makeGuess(guess);
                generatePuzzleWord(hangman);
            }
        });
    }, selectValue.value);
};

const getRandomNum = () => {
    return Math.floor(Math.random() * 6) + 1;
};

const calculateGuesses = (word) => {
    if (word.length > 10) {
        return 10;
    } else {
        return word.length;
    }
};