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
                description: DataTypes.STRING,
                synonyms: DataTypes.STRING,
            },
            {
                sequelize,
                modelName: 'Word'
            }
        );

        console.log(`Word initialized`);
    } catch (error) {
        console.error("Error:", error);
    }
    
}

class Word extends Sequelize.Model {}

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

async function newWord() {
    try {
        const wordModel = await Word.build( {});
        console.log(`new Word created`);
        return wordModel;
    } catch (error) {
        console.error("Error:", error);
    }
}

module.exports = { Word, newWord, dbconnect, Init, dbaddWord };