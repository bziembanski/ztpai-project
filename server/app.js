const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
const pass = require('./src/auth/passport');
const bodyParser = require('body-parser');
const port = parseInt(process.env.PORT);
const db = require('./src/models');
const filters = require('./filters').filters;

app.use(passport.initialize());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

db.sequelize.sync({force: false}).then(() => {
    console.log("[server]Drop and re-sync database.");
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

app.get('/api/filters', (req, res) => {
    res.json(filters);
});

require('./src/routes/user.routes')(app);
require('./src/routes/category.routes')(app);
require('./src/routes/announcement.routes')(app);
require('./src/routes/user_rating.routes')(app);
require('./src/routes/user_rating_type.routes')(app);
app.listen(port, () => {console.log("listening on port "+ port)});