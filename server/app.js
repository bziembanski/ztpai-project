const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3001;
const db = require('./src/models');
db.sequelize.sync({force: false}).then(() => {
    console.log("[server]Drop and re-sync database.");
});
const filters = require('./filters').filters;

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

app.post('/api/login', (req, res) => {
    console.log(req.body);
    res.json({wiadomosc: "ok"});
});

app.get('/api/filters', (req, res) => {
    res.json(filters);
});

require('./src/routes/user.routes')(app);
require('./src/routes/category.routes')(app);
require('./src/routes/announcement.routes')(app);
require('./src/routes/user_rating.routes')(app);
require('./src/routes/user_rating_type.routes')(app);
app.listen(port, () => {});