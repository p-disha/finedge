const path = require('path');
const { v4: uuidv4 } = require('uuid');
const FileHandler = require('../utils/fileHandler');

const usersPath = path.join(__dirname, '../data/users.json');
const fileHandler = new FileHandler(usersPath);

class UserModel {
    static async create(userData) {
        const users = await fileHandler.readData();
        const newUser = { id: uuidv4(), ...userData };
        users.push(newUser);
        await fileHandler.writeData(users);
        return newUser;
    }

    static async findByEmail(email) {
        const users = await fileHandler.readData();
        return users.find(user => user.email === email);
    }

    static async findAll() {
        return await fileHandler.readData();
    }
}

module.exports = UserModel;
