const express = require('express');
const BudgetController = require('../controllers/budgetController');
const { validate, schemas } = require('../middleware/validator');

const router = express.Router();

router.post('/', validate(schemas.budget), BudgetController.createBudget);
router.get('/', BudgetController.getBudgets);

module.exports = router;
