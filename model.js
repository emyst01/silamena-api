/* MODEL */

const { Sequelize, DataTypes } = require('sequelize');
const sqlite3 = require('sqlite3').verbose();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
});

function Init() {
    try {
        Word.init(
            {
                name: DataTypes.STRING,
                role: DataTypes.INTEGER,
                english: DataTypes.STRING,
                ethimology: DataTypes.STRING,
                description: DataTypes.TEXT,
                synonyms: DataTypes.STRING,
            },
            {
                sequelize,
                modelName: 'Word'
            }
        );
        Example.init(
            {
                silamena: DataTypes.TEXT,
                english: DataTypes.TEXT
            },
            {
                sequelize,
                modelName: 'Example'
            }
        );
        console.log(`Word/Example initialized`);
    } catch (error) {
        console.error("Error:", error);
    }
    
}

class Word extends Sequelize.Model {}
class Example extends Sequelize.Model {}
Init();

//DATABASE
//connection to db
async function dbconnect() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

//creates table if it doesn't exist
Word.sync().then(() => {
    console.log("Words table created successfully!");
}).catch(error => {
    console.error("Error creating Words table:", error);
});
Example.sync().then(() => {
    console.log("Examples table created successfully!");
}).catch(error => {
    console.error("Error creating Example table:", error);
})

async function newWord() {
    try {
        const wordModel = await Word.build( {});
        console.log(`new word created`);
        return wordModel;
    } catch (error) {
        console.error("Error:", error);
    }
}
async function newExample() {
    try {
        const exampledModel = await Example.build( {});
        console.log(`new example created`);
        return exampledModel;
    } catch (error) {
        console.error("Error:", error);
    }
}

async function dbaddWord(wordmetemp) {
    try {
        const wordModel = await Word.build( {
            name: wordmetemp.name,
            role: wordmetemp.role,
            english: wordmetemp.english,
            ethimology: wordmetemp.ethimology,
            description: wordmetemp.description,
            synonyms: wordmetemp.synonyms,
        });
        wordModel.save();
        console.log(`Word added`);
    } catch (error) {
        console.error("Error:", error);
    }
}
async function dbaddExample(extemp) {
    try {
        const exModel = await Example.build( {
            silamena: extemp.silamena,
            english: extemp.english
        });
        exModel.save();
        console.log(`Example added`);
    } catch (error) {
        console.error("Error:", error);
    }
}

module.exports = { Word, Example, newWord, newExample, dbconnect, Init, dbaddWord, dbaddExample };