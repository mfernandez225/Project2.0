module.exports = function(sequelize, DataTypes) {
    var Ticker = sequelize.define("tickers", {
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
            len: [1]
        }
    });



    return Ticker;
};