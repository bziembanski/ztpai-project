const {Sequelize} = require('sequelize');
const db_conf = require('../../database-confidential');

const sequelize = new Sequelize(db_conf, {
    dialect:'postgres',
    dialectOptions:{
        ssl:{
            require:true,
            rejectUnauthorized:false
        }
    },
    pool:{
        max: 5,
        min:0,
        acquire: 30000,
        idle: 10000
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model")(sequelize, Sequelize);
db.categories = require("./category.model")(sequelize, Sequelize);
db.announcements = require("./announcement.model")(sequelize, Sequelize);
db.user_ratings = require("./user_rating.model")(sequelize, Sequelize);
db.user_rating_types = require("./user_rating_type.model")(sequelize, Sequelize);

db.users.hasMany(db.announcements, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    }
});
db.announcements.belongsTo(db.users, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    }
})
db.users.hasMany(db.user_ratings, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    }
});
db.user_ratings.belongsTo(db.users,{
    foreignKey: {
        name: 'user_id',
        allowNull: false
    }
});
db.user_rating_types.hasMany(db.user_ratings, {
    foreignKey: {
        name: 'user_rating_type_id',
        allowNull: false
    }
});
db.user_ratings.belongsTo(db.user_rating_types,{
    foreignKey: {
        name: 'user_rating_type_id',
        allowNull: false
    }
});
db.categories.hasMany(db.announcements, {
    foreignKey: {
        name: 'category_id',
        allowNull: false
    }
});
db.announcements.belongsTo(db.categories, {
    foreignKey: {
        name: 'category_id',
        allowNull: false
    }
})
module.exports = db;