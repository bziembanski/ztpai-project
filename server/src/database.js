const Pool = require('pg').Pool;
const db_conf = require('../database-confidential');

const pool = new Pool({
    user: db_conf.user,
    host: db_conf.host,
    database: db_conf.database,
    password: db_conf.password,
    port: db_conf.port,
    ssl:{
        rejectUnauthorized: false
    }
});

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY user_id ASC', 
        (error, results) => {
            if(error){
                throw error;
            }
            res.status(200).json(results.rows);
        }
    );
    console.log("getUsers")
}

module.exports = {
    getUsers
}