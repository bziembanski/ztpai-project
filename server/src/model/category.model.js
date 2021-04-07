module.exports = (sequelize, Sequelize) => {
    return sequelize.define('category', {
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