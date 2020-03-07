// Defined how the model interacts with the database

module.exports = function (sequelize, DataTypes) {
    var Stock = sequelize.define("Stock", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        symbol: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1],
            primaryKey: true,
        }
    }, {
        tableName: "stocks",
        timestamps: false,
    });
    return Stock;
};
