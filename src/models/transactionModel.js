const path = require('path');
const { v4: uuidv4 } = require('uuid');
const FileHandler = require('../utils/fileHandler');

const transactionsPath = path.join(__dirname, '../data/transactions.json');
const fileHandler = new FileHandler(transactionsPath);

class TransactionModel {
    static async create(transactionData) {
        const transactions = await fileHandler.readData();
        const newTransaction = {
            id: uuidv4(),
            date: new Date().toISOString(),
            ...transactionData
        };
        transactions.push(newTransaction);
        await fileHandler.writeData(transactions);
        return newTransaction;
    }

    static async findAll() {
        return await fileHandler.readData();
    }

    static async findById(id) {
        const transactions = await fileHandler.readData();
        return transactions.find(t => t.id === id);
    }

    static async update(id, updateData) {
        const transactions = await fileHandler.readData();
        const index = transactions.findIndex(t => t.id === id);
        if (index === -1) return null;

        transactions[index] = { ...transactions[index], ...updateData };
        await fileHandler.writeData(transactions);
        return transactions[index];
    }

    static async delete(id) {
        const transactions = await fileHandler.readData();
        const filteredTransactions = transactions.filter(t => t.id !== id);
        if (transactions.length === filteredTransactions.length) return false;

        await fileHandler.writeData(filteredTransactions);
        return true;
    }
}

module.exports = TransactionModel;
