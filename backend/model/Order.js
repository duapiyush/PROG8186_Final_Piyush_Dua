module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending'
        }
    });

    Order.associate = (models) => {
        Order.belongsTo(models.User);
        Order.belongsToMany(models.Product, { through: models.OrderItem });
    };

    return Order;
};
