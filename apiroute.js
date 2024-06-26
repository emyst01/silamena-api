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

//WORDS

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
    const engWord = req.params.englishWord.toLowerCase().replace("_", " ");
    console.log(engWord);

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

// EXAMPLES MANAHGER

//Get requests manager

router.get('/example/random', async (req, res) => {
    const num = req.query.num || 1;
    try {
        const examples = await model.Example.findAll();
        if (examples.length > 0) {
            let result = examples.slice().sort(() => Math.random() - 0.5).slice(0, num);
            let data = {
                examplesList: result
            }
            res.json(data);
        } else {
            res.status(404).send('No examples found');
        }
    } catch(error) {
        res.status(500).send("Error:" + error);
    }
});

//Finds 3 expression
router.get('/example/:expression', async (req, res) => {
    const expr = req.params.expression.toLowerCase().replace("_", " ");
    const num = req.query.num || 3;

    const expressions = await model.Example.findAll({
        where: {
            silamena: {
                [Sequelize.Op.like]: `%${expr}%`
            }
        },
    });

    let result = expressions.slice().sort(() => Math.random() - 0.5).slice(0, num);
    let data = {
        examplesList: result
    }
    res.json(data);
});

//Create example
router.post('/example', (req, res) => {
    let tempex = model.newExample();

    tempex.silamena = req.body.silamena;
    tempex.english = req.body.english;

    model.dbaddExample(tempex);
    
    const jsonContent = JSON.stringify(tempex);
    res.status(201).end(jsonContent);
});

//Delete example
router.delete('/example/:id', (req, res) => {
    const param = req.params.id;
    
    model.Example.findOne({ where: { id: param } }).then(example => {
        if (!example) {
            return res.status(404).send('Example not found');
        } else {
            example.destroy();
            res.status(200).send('Example deleted successfully');
        }
    }).then(() => {}).catch(error => {
        console.error("Error deleting example:", error);
        res.status(500).send('Error deleting example');
    });    
});

//Update/Edit example
router.put('/example/:id',  (req, res) => {
    const param = req.params.id;

    model.Example.findOne({ where: { id: param } }).then(example => {
        if (!example) {
            return res.status(404).send('Example not found');
        }
        example.silamena = req.body.silamena;
        example.english = req.body.english;

        return example.save();
    }).then(() => {
        res.status(200).send('Example updated successfully');
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