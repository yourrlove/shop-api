"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Discount.init(
    {
      discount_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      discount_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      discount_desc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      discount_type: {
        type: DataTypes.ENUM,
        values: ["fixed_amount", "percentage"],
        allowNull: false,
      },
      discount_value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      discount_max_value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      discount_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      discount_start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      discount_end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      discount_max_use: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discount_used_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      discount_limit_per_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      discount_min_order_value: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      discount_applies_to: {
        type: DataTypes.ENUM,
        values: ["all", "specific"],
        allowNull: true,
      },
      discount_sku_ids: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      discount_is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Discount",
      tableName: "discounts",
    }
  );
  return Discount;
};
