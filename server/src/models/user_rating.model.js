module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user_rating', {
        value: {
            type: Sequelize.FLOAT,
            unique: false,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });
}