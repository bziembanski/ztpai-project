const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3001;
const db = require('./src/models');
db.sequelize.sync({force: false}).then(() => {
    console.log("[server]Drop and re-sync database.");
});
const anns = require('./anns').announcements;
const filters = require('./filters').filters;
const profile = require('./profile').profile;

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

app.post('/signin', (req, res) => {
    console.log(req.body);
    res.json({wiadomosc: "ok"});
});

app.post('/anns', (req, res) => {
    res.json(anns);
});

app.post('/filters', (req, res) => {
    res.json(filters);
});

app.post('/categories', (req, res) => {
    res.json({data: filters[2].data, name: filters[2].name});
});

app.post('/profile', (req, res) => {
    res.json(profile);
});

app.listen(port, () => {});