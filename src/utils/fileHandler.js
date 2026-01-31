const fs = require('fs/promises');
const path = require('path');

class FileHandler {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async readData() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                await this.writeData([]); // Initialize if not exists
                return [];
            }
            throw error;
        }
    }

    async writeData(data) {
        await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }
}

module.exports = FileHandler;
