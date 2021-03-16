const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3001;
const db = require('./src/database');

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    try{
        const dbService = (async() => {
            await db.sequelize.authenticate();
        })
        console.log("Connected to db");
    }catch (e){
        console.error("Failed to connect to db: ", e);
    }
    res.json()
});

app.post('/login', (req, res) => {
    console.log(req.body);
    res.json({wiadomosc: "ok"});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});