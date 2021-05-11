module.exports = (sequelize, Sequelize) => {
    return sequelize.define('announcement', {
        title: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        wage: {
            type: Sequelize.FLOAT,
            unique: false,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    });
}