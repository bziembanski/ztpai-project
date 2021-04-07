module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user', {
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
            allowNull: false,
            validate: {
                notEmpty: true
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
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });
}