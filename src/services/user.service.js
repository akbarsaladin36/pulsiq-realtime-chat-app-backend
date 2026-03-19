import userRepository from "../repositories/user.repository.js";
import helper from "../helper/index.js";

class UserService {
  async GetUsersService(req, res) {
    try {
      const users = await userRepository.GetAll();
      if (users.length > 0) {
        return helper.GetResponse(
          res,
          400,
          "All users data are succesfully appeared!",
          users,
        );
      } else {
        return helper.GetResponse(res, 400, "All users data are empty!");
      }
    } catch (error) {
      return helper.GetResponse(res, 500, error.message);
    }
  }

  async GetUserService(req, res) {
    try {
      const { username } = req.params;
      const user = await userRepository.GetOne(username);
      if (user) {
        return helper.GetResponse(
          res,
          400,
          "A user data is succesfully appeared!",
          user,
        );
      } else {
        return helper.GetResponse(res, 400, "A user data is not found!");
      }
    } catch (error) {
      return helper.GetResponse(res, 500, error.message);
    }
  }

  async CreateUserService(req, res) {
    try {
      const {
        username,
        email,
        password,
        firstName,
        lastName,
        address,
        phoneNumber,
        role,
      } = req.body;
      const user = await userRepository.GetOne(username);
      if (user) {
        return helper.GetResponse(
          res,
          400,
          "A user data is previously registered! Please try to find a new username!",
        );
      } else {
        const hashedPassword = helper.HashPassword(password);
        const uuid = helper.GenerateUuid();
        const authUser = helper.GetCurrentUser(req);
        const setData = {
          uuid: uuid,
          username: username,
          email: email,
          password: hashedPassword,
          first_name: firstName,
          last_name: lastName,
          address: address,
          phone_number: phoneNumber ? phoneNumber : "01234567890",
          role: role ? role : "user",
          is_active: 1,
          created_at: new Date(Date.now()),
          created_by: authUser.uuid,
          created_by_username: authUser.username,
        };
        const result = await userRepository.Create(setData);
        return helper.GetResponse(
          res,
          200,
          "A new user is succesfully registered!",
          result,
        );
      }
    } catch (error) {
      return helper.GetResponse(res, 500, error.message);
    }
  }

  async UpdateUserService(req, res) {
    try {
      const { username } = req.params;
      const { firstName, lastName, address, phoneNumber, role, isActive } =
        req.body;
      const user = await userRepository.GetOne(username);
      if (user) {
        const authUser = helper.GetCurrentUser(req);
        const setData = {
          first_name: firstName ? firstName : user.first_name,
          last_name: lastName ? lastName : user.last_name,
          address: address ? address : user.address,
          phone_number: phoneNumber ? phoneNumber : user.phone_number,
          role: role ? role : user.role,
          is_active: isActive ? isActive : user.is_active,
          updated_at: new Date(Date.now()),
          updated_by: authUser.uuid,
          updated_by_username: authUser.username,
        };
        await userRepository.Update(username, setData);
        return helper.GetResponse(
          res,
          400,
          "A user data is succesfully updated!",
          setData,
        );
      } else {
        return helper.GetResponse(res, 400, "A user data is not found!");
      }
    } catch (error) {
      return helper.GetResponse(res, 500, error.message);
    }
  }

  async DeleteUserService(req, res) {
    try {
      const { username } = req.params;
      const user = await userRepository.GetOne(username);
      if (user) {
        await userRepository.Delete(username);
        return helper.GetResponse(
          res,
          400,
          "A user data is succesfully deleted!",
        );
      } else {
        return helper.GetResponse(res, 400, "A user data is not found!");
      }
    } catch (error) {
      return helper.GetResponse(res, 500, error.message);
    }
  }
}

export default new UserService();
