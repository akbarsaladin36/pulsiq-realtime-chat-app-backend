import helper from "../helper/index.js";
import authRepository from "../repositories/auth.repository.js";
import jwt from "jsonwebtoken";

class AuthService {
  async RegisterService(req, res) {
    try {
      const { username, email, password } = req.body;
      const checkUser = await authRepository.GetOne(username);
      if (checkUser) {
        return helper.GetResponse(
          res,
          400,
          "A user is previously registered! Please try find a new username again!",
        );
      } else {
        const hashedPassword = helper.HashPassword(password);
        const uuid = helper.GenerateUuid();
        const setData = {
          uuid: uuid,
          username: username,
          email: email,
          password: hashedPassword,
          role: "user",
          is_active: 1,
          created_at: new Date(Date.now()),
          created_by: uuid,
          created_by_username: username,
        };
        const data = await authRepository.Create(setData);
        return helper.GetResponse(
          res,
          200,
          "A new user is succesfully registered!",
          data,
        );
      }
    } catch (error) {
      return helper.GetResponse(res, 500, error.message);
    }
  }

  async LoginService(req, res) {
    try {
      const { username, password } = req.body;
      const checkUser = await authRepository.GetOne(username);
      if (checkUser) {
        const checkPassword = helper.CheckPassword(
          password,
          checkUser.password,
        );
        if (checkPassword) {
          const payload = {
            uuid: checkUser.uuid,
            username: checkUser.username,
            email: checkUser.email,
            role: checkUser.role,
            is_active: checkUser.is_active,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES,
          });
          const data = { ...payload, token: token };
          return helper.GetResponse(
            res,
            200,
            "A user is succesfully login!",
            data,
          );
        } else {
          return helper.GetResponse(
            res,
            400,
            "A password is not match! Please try again!",
          );
        }
      } else {
        return helper.GetResponse(
          res,
          400,
          "A user is not registered! Please register now!",
        );
      }
    } catch (error) {
      return helper.GetResponse(res, 500, error.message);
    }
  }

  async CurrentUserService(req, res) {
    try {
      const authUser = helper.GetCurrentUser(req);
      return helper.GetResponse(res, 200, "Authenticated user", authUser);
    } catch (error) {
      return helper.GetResponse(res, 500, error.message);
    }
  }
}

export default new AuthService();
