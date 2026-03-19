import jwt from "jsonwebtoken";
import helper from "../helper/index.js";
import dotenv from "dotenv";
dotenv.config();

class AuthMiddleware {
  userAuthentication(req, res, next) {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (error, result) => {
        if (
          (error && error.name === "JsonWebTokenError") ||
          (error && error.name === "TokenExpiredError")
        ) {
          return helper.GetResponse(res, 403, error.message);
        } else {
          req.currentUser = result;
          next();
        }
      });
    } else {
      return helper.GetResponse(res, 403, "Please login first to website!");
    }
  }

  checkRole(role) {
    return (req, res, next) => {
      const currentUser = req.currentUser;
      const roleText = role == "admin" ? "admin" : "user";
      if (role == currentUser.role) {
        next();
      } else {
        return helper.GetResponse(
          res,
          403,
          `This url can be accessed by ${roleText}`,
          null,
        );
      }
    };
  }
}

export default new AuthMiddleware();
