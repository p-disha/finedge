const path = require('path');
const { v4: uuidv4 } = require('uuid');
const FileHandler = require('../utils/fileHandler');

const budgetsPath = path.join(__dirname, '../data/budgets.json');
const fileHandler = new FileHandler(budgetsPath);

class BudgetModel {
    static async create(budgetData) {
        const budgets = await fileHandler.readData();
        const newBudget = {
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            ...budgetData
        };
        budgets.push(newBudget);
        await fileHandler.writeData(budgets);
        return newBudget;
    }

    static async findAll() {
        return await fileHandler.readData();
    }
}

module.exports = BudgetModel;
