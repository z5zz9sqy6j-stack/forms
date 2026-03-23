const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/', async (req, res) => {
    try {
        let chosenWords = await getWords();
        console.log('Chosen Words:', chosenWords);

        res.render('quiz', { chosenWords });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting words');
    }
});

async function getWords() {
    let randomPart = getRandomPart();
    let filePath = path.join(__dirname, '../resources/allwords.txt');
    let allWords = await fs.readFile(filePath, 'utf-8');

    let wordsArray = allWords
        .split('\n')
        .filter(line => line.trim() !== '');

    shuffle(wordsArray);

    let choices = [];

    while (choices.length < 5 && wordsArray.length > 0) {
        let line = wordsArray.pop();
        let [word, part, def] = line.split('\t');

        if (part === randomPart) {
            choices.push({ word, part, def });
        }
    }

    return choices;
}

function getRandomPart() {
    let parts = ['noun', 'verb', 'adjective'];
    let randomIndex = Math.floor(Math.random() * parts.length);
    return parts[randomIndex];
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let randomNumber = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomNumber]] = [array[randomNumber], array[i]];
    }
    return array;
}

module.exports = router;