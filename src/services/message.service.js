import helper from "../helper/index.js";
import messageRepository from "../repositories/message.repository.js";
import { getIO } from "../config/socket.js";

class MessageService {
  async GetMessagesService(req, res) {
    try {
      const authUser = helper.GetCurrentUser(req);
      const messages = await messageRepository.GetAllById(authUser.uuid);
      if (messages.length > 0) {
        return helper.GetResponse(
          res,
          200,
          "All messages are succesfully appeared!",
          messages,
        );
      } else {
        return helper.GetResponse(res, 400, "All messages are empty!");
      }
    } catch (error) {
      return helper.GetResponse(res, 500, error.message);
    }
  }

  async GetMessageService(req, res) {
    try {
      const authUser = helper.GetCurrentUser(req);
      const { otherUserUuid } = req.params;
      const limit = parseInt(req.query.limit) || 20;
      const lastId = req.query.lastId ? parseInt(req.query.lastId) : null;
      const messageDetails = await messageRepository.GetOne(
        authUser.uuid,
        otherUserUuid,
        lastId,
        limit,
      );
      if (messageDetails.length > 0) {
        const data = {
          ...messageDetails,
        };
        return helper.GetResponse(
          res,
          200,
          "A message details are succesfully appeared!",
          data,
        );
      } else {
        return helper.GetResponse(res, 400, "A message details are empty!");
      }
    } catch (error) {
      return helper.GetResponse(res, 500, error.message);
    }
  }

  async CreateMessageService(req, res) {
    try {
      const { receiverUuid, message } = req.body;
      const authUser = helper.GetCurrentUser(req);
      if (!message) {
        return helper.GetResponse(res, 400, "A message cannot be empty!");
      } else {
        const data = {
          sender_uuid: authUser.uuid,
          receiver_uuid: receiverUuid,
          message: message,
          created_at: new Date(Date.now()),
          created_by: authUser.uuid,
          created_by_username: authUser.username,
        };
        const result = await messageRepository.Create(data);
        const io = getIO();
        io.to(`user_${authUser.uuid}`).emit("receive_message", result);
        io.to(`user_${receiverUuid}`).emit("receive_message", result);
        return helper.GetResponse(
          res,
          200,
          "A new message is succesfully created!",
          result,
        );
      }
    } catch (error) {
      return helper.GetResponse(res, 500, error.message);
    }
  }
}

export default new MessageService();
