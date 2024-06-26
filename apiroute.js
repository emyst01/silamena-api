/* APIROUTE */

//IMPORTS
const model = require('./model');
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

//cors
var cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}
router.use(cors())

//REQUESTS MANAGER

//Word info
//Get words list in a page
router.get('/word/all', async (req, res) => {
    try {
        const wordCount = await model.Word.count();
        const words = await model.Word.findAll({
            order: [['name', 'ASC']],
            attributes: ['name']
        });
        const data = {
            wordsList: words.map(word => word.name),
            wordsCount: wordCount
        }
        res.json(data);
    } catch (error) {
        console.error("Error fetching all words:", error);
        res.status(500).send('Error retrieving word list', error);
    }
});

//Get array of words relative to the array of given names
router.get('/word', async (req, res) => {
    const list = req.body.list || [];
    console.log(list);
    try {
        const words = await model.Word.findAll({
          where: {
            name: {
              [Sequelize.Op.in]: list,
            },
          },
        });
        const data = {
            wordsList: words
        }
        res.json(data);
    } catch (error) {
        console.error("Error fetching specific words:", error);
        res.status(500).send('Error retrieving words list', error);
    }
});

//Get all the silamena words given an english one
router.get('/word/:englishWord', async (req, res) => {
    const engWord = req.params.englishWord.toLowerCase();

    try {
        const separators = [', ', '/'];
        const silamenaWords = await model.Word.findAll({
          where: {
            english: {
                [Sequelize.Op.or]: separators.map(separator => ({
                    [Sequelize.Op.like]: `%${engWord}${separator}%`
                }))
            }
          },
          attributes: ['name']
        });
        const data = {
            wordsList: silamenaWords.map(word => word.name)
        }
        res.json(data);
    } catch (error) {
        console.error("Error fetching silamena words:", error);
        res.status(500).send('Error retrieving silamena words', error);
    }


});

//Create word
router.post('/word', (req, res) => {
    let tempword = model.newWord();

    tempword.name = req.body.name;
    tempword.role = req.body.role;
    tempword.english = req.body.english;
    tempword.ethimology = req.body.ethimology;
    tempword.description = req.body.description;
    tempword.synonyms = req.body.synonyms;

    model.dbaddWord(tempword);
    
    const jsonContent = JSON.stringify(tempword);
    res.status(201).end(jsonContent);
});

//Delete word
router.delete('/word/:name', (req, res) => {
    const param = req.params.name.toLowerCase();
    
    model.Word.findOne({ where: { name: param } }).then(word => {
        if (!word) {
            return res.status(404).send('Word not found');
        } else {
            word.destroy();
            res.status(200).send('Word deleted successfully');
        }
    }).then(() => {}).catch(error => {
        console.error("Error deleting word:", error);
        res.status(500).send('Error deleting word');
    });    
});

//Update/Edit word
router.put('/word/:name',  (req, res) => {
    const param = req.params.name.toLowerCase();

    model.Word.findOne({ where: { name: param } }).then(word => {
        if (!word) {
            return res.status(404).send('Word not found');
        }
        word.name = req.body.name;
        word.role = req.body.role;
        word.english = req.body.english;
        word.ethimology = req.body.ethimology;
        word.description = req.body.description;
        word.synonyms = req.body.synonyms;
        return word.save();
    }).then(() => {
        res.status(200).send('Word updated successfully');
    }).catch(error => {
        console.error("Error updating word:", error);
        res.status(500).send('Error updating word');
    });
});

router.get('*', (req, res) => {
    res.status(400).send("Nope, this request doesn't exist");
});

//EXPORTS ROUTES
module.exports = router;