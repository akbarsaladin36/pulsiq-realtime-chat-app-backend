import profileRepository from "../repositories/profile.repository.js";
import helper from "../helper/index.js";

class ProfileService {
  async GetProfileService(req, res) {
    try {
      const authUser = helper.GetCurrentUser(req);
      const profile = await profileRepository.GetOne(authUser.username);
      if (profile) {
        return helper.GetResponse(
          res,
          200,
          "A profile data for this user is succesfully appeared",
          profile,
        );
      } else {
        return helper.GetResponse(
          res,
          400,
          "A profile data for this user is not found!",
        );
      }
    } catch (error) {
      return helper.GetResponse(res, 500, error.message);
    }
  }

  async UpdateProfileService(req, res) {
    try {
      const authUser = helper.GetCurrentUser(req);
      const { firstName, lastName, address, phoneNumber } = req.body;
      const profile = await profileRepository.GetOne(authUser.username);
      if (profile) {
        const setData = {
          first_name: firstName ? firstName : profile.first_name,
          last_name: lastName ? lastName : profile.last_name,
          address: address ? address : profile.address,
          phone_number: phoneNumber ? phoneNumber : profile.phone_number,
        };
        await profileRepository.Update(authUser.username, setData);
        return helper.GetResponse(
          res,
          200,
          "A profile data for this user is succesfully updated!",
          profile,
        );
      } else {
        return helper.GetResponse(
          res,
          400,
          "A profile data for this user is not found!",
        );
      }
    } catch (error) {
      return helper.GetResponse(res, 500, error.message);
    }
  }
}

export default new ProfileService();
