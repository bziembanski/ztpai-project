const crypto = require('crypto');
module.exports = (sequelize, Sequelize) => {
     const User = sequelize.define('user', {
        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: true,
            validate: {
                notEmpty: true
            },
            get() {
                return () => this.getDataValue('password')
            }
        },
        salt: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: true,
            get() {
                return () => this.getDataValue('salt')
            }
        },
        name: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        surname: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        avatar: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: true
        }
    });

    User.generateSalt = () => {
        return crypto.randomBytes(16).toString('base64');
    };

    User.encryptPassword = (plainText, salt) => {
        return crypto
            .createHash('RSA-SHA256')
            .update(plainText)
            .update(salt)
            .digest('hex');
    };

    const setSaltAndPassword = user => {
        if(user.changed('password')){
            user.salt = User.generateSalt();
            user.password = User.encryptPassword(user.password(), user.salt());
        }
    };

    User.beforeCreate(setSaltAndPassword);
    User.beforeBulkUpdate(setSaltAndPassword);

    User.correctPassword = (enteredPassword, user) => {
        return User.encryptPassword(enteredPassword, user.salt()) === user.password();
    };

    return User;
};


