import authService from "../services/auth.service.js";

class AuthController {
  async RegisterController(req, res) {
    return await authService.RegisterService(req, res);
  }

  async LoginController(req, res) {
    return await authService.LoginService(req, res);
  }

  async CurrentUserController(req, res) {
    return await authService.CurrentUserService(req, res);
  }
}

export default new AuthController();
