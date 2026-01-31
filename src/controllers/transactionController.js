const TransactionService = require('../services/transactionService');
const AppError = require('../utils/AppError');

class TransactionController {
    static async addTransaction(req, res, next) {
        try {
            const transaction = await TransactionService.addTransaction(req.body);
            res.status(201).json(transaction);
        } catch (error) {
            next(error);
        }
    }

    static async getAllTransactions(req, res, next) {
        try {
            const transactions = await TransactionService.getAllTransactions(req.query);
            res.json(transactions);
        } catch (error) {
            next(error);
        }
    }

    static async getTransactionById(req, res, next) {
        try {
            const transaction = await TransactionService.getTransactionById(req.params.id);
            if (!transaction) {
                return next(new AppError('Transaction not found', 404));
            }
            res.json(transaction);
        } catch (error) {
            next(error);
        }
    }

    static async updateTransaction(req, res, next) {
        try {
            const updated = await TransactionService.updateTransaction(req.params.id, req.body);
            if (!updated) {
                return next(new AppError('Transaction not found', 404));
            }
            res.json(updated);
        } catch (error) {
            next(error);
        }
    }

    static async deleteTransaction(req, res, next) {
        try {
            const success = await TransactionService.deleteTransaction(req.params.id);
            if (!success) {
                return next(new AppError('Transaction not found', 404));
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    static async getSummary(req, res, next) {
        try {
            const summary = await TransactionService.getSummary();
            res.json(summary);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = TransactionController;
