const express = require('express');
const TransactionController = require('../controllers/transactionController');
const { validate, schemas } = require('../middleware/validator');

const router = express.Router();

router.post('/', validate(schemas.transaction), TransactionController.addTransaction);
router.get('/', TransactionController.getAllTransactions);
router.get('/summary', TransactionController.getSummary); // Specific route before parameterized
router.get('/:id', TransactionController.getTransactionById);
router.patch('/:id', TransactionController.updateTransaction);
router.delete('/:id', TransactionController.deleteTransaction);

module.exports = router;
