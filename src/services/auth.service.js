"use strict";
const bcrypt = require("bcrypt");
const { generateUUID } = require("../helpers/index");
const db = require("../models/index");
const {
  ConflictRequestError,
  AuthFailureError,
  ForbiddenRequestError,
} = require("../core/error.response");
const { createKeyTokenPair } = require("../utils/authUtils");
const JWT = require("jsonwebtoken");
const UserService = require("../services/user.service");
const CartService = require("../services/cart.service");

class AuthService {
  static signUp = async ({
    first_name,
    last_name,
    email,
    password,
    phone_number,
  }) => {
    // setp1: check if email is already registered
    const isEmailExists = await db.User.findOne(
      { where: { email: email } },
      { raw: true }
    );
    if (isEmailExists)
      throw new ConflictRequestError("Email already registered!");

    // step 2: has password
    const passwordHash = await bcrypt.hash(password, 10);
    const { role_id } = await db.Role.findOne({
      where: { name: 'user' },
      attributes: ["role_id"],
      raw: true,
    });

    if (!role_id) throw new BadRequestError("Role not found");
    const user_id = generateUUID();
    // step3: create token pair
    const tokens = createKeyTokenPair(
      { user_id: user_id, role_id: role_id },
      process.env.ACCESS_TOKEN_KEY_SECRET,
      process.env.REFRESH_TOKEN_KEY_SECRET
    );
    if (!tokens) throw new ConflictRequestError("Failed to create tokens!");

    const newUser = await UserService.create({
      user_id,
      first_name,
      last_name,
      phone_number,
      email,
      hash_password: passwordHash,
      role_id,
      refresh_token: tokens.refreshToken,
    });
    const cart = await CartService.create(newUser.user_id)  
    return tokens;
  };

  static logIn = async ({ email, password }) => {
    const user = await db.User.findOne({ where: { email: email } });
    if (!user) throw new AuthFailureError("Wrong email!");
    const isPassMatch = await bcrypt.compare(password, user.hash_password);
    if (!isPassMatch) throw new AuthFailureError("Wrong password!");

    const token = createKeyTokenPair(
      { user_id: user.id, role_id: user.role_id },
      process.env.ACCESS_TOKEN_KEY_SECRET,
      process.env.REFRESH_TOKEN_KEY_SECRET
    );

    //update refresh token
    user.refresh_token = token.refreshToken;
    await user.save();

    return token;
  };

  static logOut = async (refreshToken) => {
    //verify refreshToken
    let user_id;
    JWT.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY_SECRET,
      (err, decoded) => {
        if (err) throw new AuthFailureError("Invalid refreshToken!");
        user_id = decoded.user_id;
      }
    );

    //check refresh token exists
    const user = await db.User.findOne({
      where: { refresh_token: refreshToken, id: user_id },
    });
    if (!user) return;

    //delete refresh token
    user.refresh_token = null;
    await user.save();
  };

  static handleRefreshToken = async (refreshToken) => {
    //check refresh token exists
    console.log(refreshToken);
    const user = await db.User.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!user) throw new ForbiddenRequestError("Refresh token not found!");

    // verify refreshToken
    JWT.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY_SECRET,
      (err, decoded) => {
        if (err || decoded.user_id !== user.id)
          throw new ForbiddenRequestError("Invalid RefreshToken!");
      }
    );

    const token = createKeyTokenPair(
      { user_id: user.id, role_id: user.role_id },
      process.env.ACCESS_TOKEN_KEY_SECRET,
      process.env.REFRESH_TOKEN_KEY_SECRET
    );

    user.refresh_token = token.refreshToken;
    await user.save();

    return token;
  };
}

module.exports = AuthService;
