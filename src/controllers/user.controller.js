import userService from "../services/user.service.js";

class UserController {
  async GetUsersController(req, res) {
    return await userService.GetUsersService(req, res);
  }

  async GetUserController(req, res) {
    return await userService.GetUserService(req, res);
  }

  async CreateUserController(req, res) {
    return await userService.CreateUserService(req, res);
  }

  async UpdateUserController(req, res) {
    return await userService.UpdateUserService(req, res);
  }

  async DeleteUserController(req, res) {
    return await userService.DeleteUserService(req, res);
  }
}

export default new UserController();
