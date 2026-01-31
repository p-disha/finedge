const BudgetService = require('../services/budgetService');

class BudgetController {
    static async createBudget(req, res, next) {
        try {
            const budget = await BudgetService.createBudget(req.body);
            res.status(201).json(budget);
        } catch (error) {
            next(error);
        }
    }

    static async getBudgets(req, res, next) {
        try {
            const budgets = await BudgetService.getAllBudgets();
            res.json(budgets);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = BudgetController;
