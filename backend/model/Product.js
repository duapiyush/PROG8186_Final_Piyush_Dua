module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    imageUrl: DataTypes.STRING
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Category);
    Product.belongsToMany(models.Order, { through: models.OrderItem });
  };

  return Product;
};
