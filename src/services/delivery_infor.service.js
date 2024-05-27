const db = require("../models/index");
const { generateUUID } = require("../helpers/index");
const { NotFoundError, BadRequestError } = require("../core/error.response");
const UserService = require("./user.service");
const { checkRequestParams, removeNull } = require("../utils/index");


class DeliveryInforService {
  static create = async (
    user_id,
    { province_city, district, ward, street, is_default }
  ) => {
    checkRequestParams({
      province_city,
      district,
      ward,
      street,
      is_default,
    })
    const user = await db.User.findOne({ user_id: user_id });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    if (is_default) {
      const deliveryDefault = await db.DeliveryInfor.findOne({
        where: { user_id: user_id, is_default: true },
      });
      if (deliveryDefault) {
        throw new BadRequestError("User already have default delivery infor");
      }
    }
    try {
      const deliveryinfor = await db.DeliveryInfor.create({
        delivery_id: generateUUID(),
        user_id: user_id,
        province_city: province_city,
        district: district,
        ward: ward,
        street: street,
        is_default: is_default,
      });
      return deliveryinfor;
    } catch (error) {
      throw new BadRequestError("Duplicate delivery infor: street");
    }
  };

  static getAll = async (user_id) => {
    const user = await db.User.findOne({ user_id: user_id });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const deliveryinfors = await db.DeliveryInfor.findAll({
      where: { user_id: user_id },
      raw: true,
    });
    return deliveryinfors;
  };

  static update = async (user_id, delivery_id, updateBody) => {
    updateBody = removeNull(updateBody);
    checkRequestParams(updateBody);
    
    const user = await db.User.findOne({
      user_id: user_id,
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    if (updateBody.is_default) {
      const deliveryDefault = await db.DeliveryInfor.findOne({
        where: {
          user_id: user_id,
          is_default: true,
        },
      });
      if (deliveryDefault) {
        throw new BadRequestError("User already have default delivery infor");
      }
    }
    let delivery_infor = await db.DeliveryInfor.findByPk(delivery_id);
    if (!delivery_infor) {
      throw new NotFoundError("DeliveryInfor not found");
    }
    delivery_infor = await db.DeliveryInfor.update(updateBody, {
      where: {
        delivery_id: delivery_id,
        user_id: user_id,
      },
    });
    return delivery_infor[0];
  };

  static delete = async (user_id, delivery_id) => {
    const user = await db.User.findOne({
      user_id: user_id,
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    let delivery_infor = await db.DeliveryInfor.findByPk(delivery_id);
    if (!delivery_infor) {
      throw new NotFoundError("DeliveryInfor not found");
    }
    delivery_infor = await db.DeliveryInfor.destroy({
      where: {
        delivery_id: delivery_id,
        user_id: user_id,
      },
    });
    return delivery_infor;
  };

  static getDeliveryDetail = async (user_id, delivery_id) => {
    const user = await db.User.findOne({
      user_id: user_id,
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const delivery_infor = await db.DeliveryInfor.findByPk(delivery_id);
    if (!delivery_infor) {
      throw new NotFoundError("DeliveryInfor not found");
    }
    return delivery_infor;
  };

  static getDeliveryDefault = async (user_id) => {
    const user = await db.User.findOne({
      user_id: user_id,
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const delivery_infor = await db.DeliveryInfor.findOne({
      where: {
        user_id: user_id,
        is_default: true,
      },
      attributes: { exclude: ["delivery_id", "user_id"] },
      raw: true,
    });
    return delivery_infor;
  };
}

module.exports = DeliveryInforService;
