module.exports = function (sequelize, DataTypes) {
  var MarketIndex = sequelize.define("marketIndex", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING
  });

  MarketIndex.associate = function (models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    MarketIndex.hasMany(models.tickers, {
      onDelete: "cascade"
    });
  };

  return MarketIndex;
};
