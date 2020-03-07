// Defined how the model interacts with the database


module.exports = function (sequelize, DataTypes) {
  var TrackedStock = sequelize.define("TrackedStock", {
    symbol: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1],
      primaryKey: true
    }
  }, {
    tableName: "tracked_stocks",
    timestamps: false,
  });
  return TrackedStock;
};
