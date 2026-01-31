const UserModel = require('../models/userModel');

class UserService {
    static async registerUser(userData) {
        const existingUser = await UserModel.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        return await UserModel.create(userData);
    }
}

module.exports = UserService;
