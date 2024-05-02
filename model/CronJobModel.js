
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../dbconfig/sequelize");

const CronJob = sequelize.define("CronJob", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    jobName:
     {
        type: DataTypes.STRING,
        allowNull: false
    },
    command: {
        type: DataTypes.STRING,
        allowNull: false
    },
    schedule: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = CronJob;
