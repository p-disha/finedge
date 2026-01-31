const Joi = require('joi');
const AppError = require('../utils/AppError');

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return next(new AppError(errorMessage, 400));
    }
    next();
};

const schemas = {
    userRegister: Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        preferences: Joi.object().optional()
    }),
    transaction: Joi.object({
        type: Joi.string().valid('income', 'expense').required(),
        category: Joi.string().required(),
        amount: Joi.number().positive().required(),
        date: Joi.date().iso().optional(), // Optional as we set it if missing, but schema allows override
        description: Joi.string().optional()
    }),
    budget: Joi.object({
        amount: Joi.number().positive().required(),
        period: Joi.string().pattern(/^\d{4}-\d{2}$/).required(), // Format YYYY-MM
        category: Joi.string().optional()
    })
};

module.exports = { validate, schemas };
