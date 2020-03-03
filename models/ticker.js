module.exports = function (sequelize, DataTypes) {
  const Ticker = sequelize.define("tickers", {
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

  Ticker.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Ticker.belongsTo(models.marketIndex, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Ticker;
};
