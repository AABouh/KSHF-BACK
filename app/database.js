const { Sequelize } = require('sequelize');

const PG_URL = process.env.DATABASE_URL || "postgresql://postgres:QPQ1SUGQ5IHxkJ5CAqFv@containers-us-west-129.railway.app:6128/railway";

const defineAttributes = {
    define: {
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
}

const sequelize = new Sequelize(PG_URL, defineAttributes) // Example for postgres

module.exports = sequelize;