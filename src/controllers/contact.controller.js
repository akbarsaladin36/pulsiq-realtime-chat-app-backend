import contractService from "../services/contact.service.js";

class ContractController {
    async GetContactsController(req, res) {
        return contractService.GetContactsByUserService(req, res)
    }
    async GetContactController(req, res) {
        return contractService.GetContactService(req, res)
    }
    async CreateContactController(req, res) {
        return contractService.CreateContactService(req, res)
    }
    async DeleteContactController(req, res) {
        return contractService.DeleteContactService(req, res)
    }   
}

export default new ContractController()
