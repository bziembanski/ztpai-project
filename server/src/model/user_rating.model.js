module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user_rating', {
        value: {
            type: Sequelize.FLOAT,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });
}