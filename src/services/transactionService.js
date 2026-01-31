const TransactionModel = require('../models/transactionModel');

class TransactionService {
    static async addTransaction(data) {
        return await TransactionModel.create(data);
    }

    static async getAllTransactions(query) {
        let transactions = await TransactionModel.findAll();

        // Bonus A: Filter by category or date
        if (query.category) {
            transactions = transactions.filter(t => t.category === query.category);
        }
        if (query.startDate && query.endDate) {
            transactions = transactions.filter(t => {
                const date = new Date(t.date);
                return date >= new Date(query.startDate) && date <= new Date(query.endDate);
            });
        }

        return transactions;
    }

    static async getTransactionById(id) {
        return await TransactionModel.findById(id);
    }

    static async updateTransaction(id, data) {
        return await TransactionModel.update(id, data);
    }

    static async deleteTransaction(id) {
        return await TransactionModel.delete(id);
    }

    static async getSummary() {
        const transactions = await TransactionModel.findAll();
        const summary = transactions.reduce((acc, curr) => {
            const amount = parseFloat(curr.amount);
            if (curr.type === 'income') {
                acc.totalIncome += amount;
            } else if (curr.type === 'expense') {
                acc.totalExpense += amount;
            }
            return acc;
        }, { totalIncome: 0, totalExpense: 0 });

        summary.balance = summary.totalIncome - summary.totalExpense;
        return summary;
    }
}

module.exports = TransactionService;
