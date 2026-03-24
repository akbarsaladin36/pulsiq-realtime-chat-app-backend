import helper from "../helper/index.js";
import contactRepository from "../repositories/contact.repository.js";

class ContactService {
  async GetContactsByUserService(req, res) {
    try {
      const authUser = helper.GetCurrentUser(req);
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || "";
      const offset = (page - 1) * limit;
      const contacts = await contactRepository.GetAllByUuid(
        authUser.uuid,
        search,
        limit,
        offset,
      );
      const data = {
        data: contacts.data,
        pagination: {
          total: contacts.total,
          page: page,
          limit: limit,
          total_pages: Math.ceil(contacts.total / limit),
        },
      };
      if (contacts.data.length > 0) {
        return helper.GetResponse(
          res,
          200,
          "All contacts by user data are succesfully appeared!",
          data,
        );
      } else {
        return helper.GetResponse(
          res,
          400,
          "All contacts by user data are empty!",
        );
      }
    } catch (error) {
      return helper.GetResponse(res, 500, error.message);
    }
  }

  async GetContactService(req, res) {
    try {
      const { contactUuid } = req.params;
      const authUser = helper.GetCurrentUser(req)
      const contact = await contactRepository.GetOne(authUser.uuid, contactUuid);
      if (contact) {
        return helper.GetResponse(
          res,
          400,
          "A contact data for this user is succesfully appeared!",
          contact,
        );
      } else {
        return helper.GetResponse(
          res,
          400,
          "A contact data for this user is not found!",
        );
      }
    } catch (error) {
      return helper.GetResponse(res, 500, error.message());
    }
  }

  async CreateContactService(req, res) {
    try {
      const { contactUuid, fullName } = req.body;
      const contact = await contactRepository.GetOne(contactUuid);
      if (contact) {
        return helper.GetResponse(
          res,
          400,
          "A contact data for this user is previously registered!",
          contact,
        );
      } else {
        const authUser = helper.GetCurrentUser(req);
        const setData = {
          user_uuid: authUser.uuid,
          contact_uuid: contactUuid,
          full_name: fullName,
          created_at: new Date(Date.now()),
          created_by: authUser.uuid,
          created_by_username: authUser.username,
        };
        const result = await contactRepository.Create(setData);
        return helper.GetResponse(
          res,
          200,
          "A new contact data is succesfully created!",
          result,
        );
      }
    } catch (error) {
      return helper.GetResponse(res, 500, error.message());
    }
  }

  async DeleteContactService(req, res) {
    try {
      const { contactUuid } = req.params;
      const authUser = helper.GetCurrentUser(req)
      const contact = await contactRepository.GetOne(authUser.uuid, contactUuid);
      if (contact) {        
        await contactRepository.Delete(authUser.uuid, contactUuid);
        return helper.GetResponse(
          res,
          200,
          "A contact data for this user is succesfully deleted!",
        );
      } else {
        return helper.GetResponse(
          res,
          400,
          "A contact data for this user is not found!",
        );
      }
    } catch (error) {
      return helper.GetResponse(res, 500, error.message());
    }
  }
}

export default new ContactService();
