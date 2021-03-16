const express = require('express');
const app = express();
const port = 3001;
const db = require('./src/database');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.json({message: 'Hello world!'});
    console.log("index");
});

app.get('/users', db.getUsers);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});