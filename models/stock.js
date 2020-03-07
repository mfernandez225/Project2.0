// Defined how the model interacts with the database

module.exports = function (sequelize, DataTypes) {
    var Stock = sequelize.define("Stock", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        symbol: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        }
    }, {
        tableName: "stocks",
        timestamps: false,
    });
    return Stock;
};
