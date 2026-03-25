const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/', async (req, res) => {
    let chosenWords = await getWords();
    let totalQuestions = req.query.totalQuestions || 0;
    let totalCorrect = req.query.totalCorrect || 0;

    res.render('quiz', {
        chosenWords,
        totalQuestions,
        totalCorrect
    });
});

router.post('/', (req, res) => {
    let { userChoice, correctDef, totalQuestions, totalCorrect } = req.body;

    totalQuestions = parseInt(totalQuestions);
    totalCorrect = parseInt(totalCorrect);

    totalQuestions++;

    if (userChoice === correctDef) {
        totalCorrect++;
    }

    res.redirect(`/quiz?totalQuestions=${totalQuestions}&totalCorrect=${totalCorrect}`);
});

let getWords = async () => {
    let randomPart = getRandomPart();
    let filePath = path.join(__dirname, '../resources/allwords.txt');
    let allWords = await fs.readFile(filePath, 'utf-8');

    let wordArray = allWords.split('\n').filter(line => line.trim() !== '');
    shuffle(wordArray);

    let chosenWords = [];

    while (chosenWords.length < 5 && wordArray.length > 0) {
        let currentWord = wordArray.pop();
        let [word, part, def] = currentWord.split('\t');

        if (part === randomPart) {
            chosenWords.push(currentWord);
        }
    }

    return chosenWords;
};

let getRandomPart = () => {
    let parts = ['noun', 'verb', 'adjective'];
    let randomIndex = parseInt(Math.random() * parts.length);
    return parts[randomIndex];
};

let shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let randomIndex = parseInt(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
};

module.exports = router;