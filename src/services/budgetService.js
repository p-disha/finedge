const BudgetModel = require('../models/budgetModel');

class BudgetService {
    static async createBudget(data) {
        return await BudgetModel.create(data);
    }

    static async getAllBudgets() {
        return await BudgetModel.findAll();
    }
}

module.exports = BudgetService;
