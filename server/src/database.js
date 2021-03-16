const Pool = require('pg').Pool;
const {Sequelize} = require('sequelize');
const db_conf = require('../database-confidential');

const sequelize = new Sequelize(db_conf.database, db_conf.user, db_conf.password, {
    host:db_conf.host+":"+db_conf.port.toString(),
    dialect: 'postgres',
    operatorsAliases: undefined,
    pool:{
        max: 5,
        min:0,
        acquire: 30000,
        idle: 10000
    }
});
module.exports = {
    sequelize
}