const UserService = require('../services/userService');
const responseHelper = require('../helpers/responseHelper');

const UsersController = {};

UsersController.show = async(req, res, next) => {
    try {
        const { user } = req;
        const result = await UserService.getUser(user.id);
        responseHelper.setSuccessResponse(result, res);
    } catch (error) {
        next(error);
    }
};

UsersController.create = async(req, res, next) => {
    try {
        const {
            name,
            email,
            phone,
            address,
            password,
            city,
            state,
            zipCode,
            salary,
            workAddress
        } = req.body;
        const result = await UserService.createUser({
            name,
            email,
            phone,
            address,
            password,
            city,
            state,
            zipCode,
            salary,
            workAddress
        });
        responseHelper.setSuccessResponse(result, res);
    } catch (error) {
        next(error);
    }
};

module.exports = UsersController;