module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user_rating_type', {
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });
}