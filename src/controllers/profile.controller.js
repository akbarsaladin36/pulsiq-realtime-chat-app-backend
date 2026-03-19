import profileService from "../services/profile.service.js";

class ProfileController {
  async GetProfileController(req, res) {
    return await profileService.GetProfileService(req, res);
  }

  async UpdateProfileController(req, res) {
    return await profileService.UpdateProfileService(req, res);
  }
}

export default new ProfileController();
