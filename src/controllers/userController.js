const UserService = require('../services/userService');
const AppError = require('../utils/AppError');

class UserController {
    static async register(req, res, next) {
        try {
            const user = await UserService.registerUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            if (error.message === 'User already exists') {
                return next(new AppError('User already exists', 409));
            }
            next(error);
        }
    }
}

module.exports = UserController;
