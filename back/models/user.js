module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      firstName: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
