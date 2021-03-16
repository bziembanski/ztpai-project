const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('../database');

const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING_TYPE,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING_TYPE,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING_TYPE,
            unique: false,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    User.findByLogin = async login => {
        let user = await User.findOne({
            where: {username: login}
        });

        if (!user) {
            user = await User.findOne({
                where: {email: login}
            });
        }
        return user;
    };

    return User;
}

module.exports = [
    user,

]