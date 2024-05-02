// const { DataTypes } = require("sequelize");
// const sequelize = require("../dbconfig/sequelize");

// const Product = sequelize.define("Product", {
//   id: {
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//     type: DataTypes.INTEGER
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// module.exports = Product;

// // const Sequelize = require('sequelize');

// // module.exports = (sequelize) => {
// //   const products = sequelize.define('Products', {
// //     name: Sequelize.STRING,
// //     email: Sequelize.STRING,
// //     password:Sequelize.STRING,
// //     otp:Sequelize.STRING,
// //     otpExpiration:Sequelize.D ,
// //   });
// //   return products;
// // };


const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../dbconfig/sequelize");

const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Product;
