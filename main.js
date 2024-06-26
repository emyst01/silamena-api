/* MAIN */

//IMPORTS
const express = require('express');
const app = express();

//import routes
const apiroutes = require('./apiroute');

//USES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routes uses
app.use('/api', apiroutes);

app.get('*', async (req, res) => {
    res.status(405).send("This api only accepts /api requests");
});

app.listen(3005, () => console.log("Server started"));