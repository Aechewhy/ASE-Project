const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("livestock", "root", "MySQL247004", {
    host: "localhost",
    dialect: "mysql",
});

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");

        const isDev = process.env.NODE_ENV === "development"; // Only sync in development
        if (isDev) {
            await sequelize.sync({ alter: true }); // Use `alter` only in dev environments
            console.log("Database synchronized successfully.");
        }
    } catch (err) {
        console.error("Unable to initialize database:", err);
        throw err; // Rethrow error to prevent app from continuing
    }
}

module.exports = { sequelize, initializeDatabase };
