const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/', async (req, res) => {
    try {
        const chosenWords = await getWords();
        res.render('quiz', { chosenWords });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting quiz words');
    }
});

async function getWords() {
    const randomPart = getRandomPart();
    const filePath = path.join(__dirname, '../resources/allwords.txt');
    const allWords = await fs.readFile(filePath, 'utf-8');

    const wordsArray = allWords
        .split('\n')
        .filter(line => line.trim() !== '');

    shuffle(wordsArray);

    const choices = [];

    while (choices.length < 5 && wordsArray.length > 0) {
        const line = wordsArray.pop();
        const [word, part, def] = line.split('\t');

        if (part === randomPart) {
            choices.push({
                word,
                part,
                def
            });
        }
    }

    return choices;
}

function getRandomPart() {
    const parts = ['noun', 'verb', 'adjective'];
    const randomIndex = Math.floor(Math.random() * parts.length);
    return parts[randomIndex];
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomNumber = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomNumber]] = [array[randomNumber], array[i]];
    }
    return array;
}

module.exports = router;