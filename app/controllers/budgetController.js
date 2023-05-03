const { Budget, User } = require('../models');
const jwt = require('jsonwebtoken');

const budgetController = {

    getAllBudgets: async (req, res) => {
        try {
            const budgets = await Budget.findAll({
                include: "operations"
            });
            res.status(200).json(budgets);
        } catch (error) {
            console.error(error);
            console.trace(error);
            res.status(500).json(error);
        }
    },

    getAllBudgetsFromOneUser : async (req, res) => {
        try {
            const userId = req.params.userId;
            const budgets = await Budget.findAll({
                attributes: ['id', 'name', 'amount', 'color', 'created_at'],
                where: {
                    user_id: userId
                }
            });
            res.status(200).json(budgets);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },

    getOneBudget: async (req, res) => {
        try {
            const budgetId = req.params.id;
            const budget = await Budget.findByPk(budgetId, {
                include: "operations"
            });
            if (budget) {
                res.status(200).json(budget);
            } else {
                res.status(404).json('Budget with the id: ' + budgetId + ' does not exist');
            }
        } catch (error) {
            console.error(error);
            console.trace(error);
            res.status(500).json(error);
        }
    },

    createBudget: async (req, res) => {
        // Je récupère l'userId grâce au token d'authentification
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'secret-key');
        const userId = decodedToken?.userId;


        try  {
            const { name, amount, color} = req.body.lastBudget;
            const errors = [];
            
            if (!name) {
                errors.push('name can not be empty');
            }
            if (!amount) {
                errors.push('amount can not be empty');
            }
            if (!color) {
                errors.push('color can not be empty');
            }


            if (errors.length) {
                res.status(400).json(errors);
            } else {
                let newBudget = Budget.build({
                    name,
                    amount,
                    color,
                    user_id:userId,
                });
            await newBudget.save();
            const budgets = await Budget.findAll({
                attributes: ['id', 'name', 'amount', 'color', 'created_at'],
                where: {
                    user_id: userId
                }
            });

            const allBudgets = budgets.map(budget => budget.dataValues)

            res.status(200).json(allBudgets);
            }
        } catch (error) {
            console.error(error);
            console.trace(error);
            res.status(500).json(error);
        }
    },

    modifyBudget: async (req, res) => {
        try {
            const budgetId = req.params.id;
            const budget = await Budget.findByPk(budgetId);

            if (!budget) {
                res.status(404).json('Budget with the id: ' + questId + ' does not exist');
            } else {
                const { name, amount, } = req.body;

                if (name) {
                    budget.name = name;
                }
                if (amount) {
                    budget.amount = amount;
                }

                await budget.save();

                res.status(200).json(budget);
            }
        } catch (error) {
            console.error(error);
            console.trace(error);
            res.status(500).json(error);
        }
    },

    deleteBudget: async (req, res) => {
        try {
            const budgetId = req.params.id;
            const budget = await Budget.findByPk(budgetId);
            await budget.destroy();
            res.status(200).json("Budget deleted");
        } catch (error) {
            console.error(error);
            console.trace(error);
            res.status(500).json(error);
        }
    }
};

module.exports = budgetController;