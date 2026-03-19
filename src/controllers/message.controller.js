import messageService from "../services/message.service.js";

class MessageController {
  async GetMessagesController(req, res) {
    return await messageService.GetMessagesService(req, res);
  }

  async GetMessageController(req, res) {
    return await messageService.GetMessageService(req, res);
  }

  async CreateMessageController(req, res) {
    return await messageService.CreateMessageService(req, res);
  }
}

export default new MessageController();
