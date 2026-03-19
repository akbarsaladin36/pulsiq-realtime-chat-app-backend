import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

class Helper {
  GetResponse(res, status = 200, message = "", data = null) {
    return res
      .status(status)
      .json({ status: status, message: message, data: data });
  }

  HashPassword(password) {
    const salt = bcrypt.genSaltSync(12);
    const encryptPassword = bcrypt.hashSync(password, salt);
    return encryptPassword;
  }

  CheckPassword(inputPassword, userPassword) {
    const checkPassword = bcrypt.compareSync(inputPassword, userPassword);
    return checkPassword;
  }

  GenerateUuid() {
    const uuid = uuidv4();
    const uuidWithoutHyphens = uuid.replace(/-/g, "");
    return uuidWithoutHyphens;
  }

  GetCurrentUser(req) {
    return req.currentUser;
  }

  GetDateNow() {
    const date = new Date(Date.now());
    const formattedDate = date.toISOString().replace("T", " ").split(".")[0];
    return formattedDate;
  }
}

export default new Helper();
