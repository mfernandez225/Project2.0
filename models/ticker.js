module.exports = function(sequelize, DataTypes) {
    var Ticker = sequelize.define("ticker", {
        name: DataTypes.STRING,
        symbol: DataTypes.STRING
    });
    return Ticker;
};