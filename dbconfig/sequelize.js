const {Sequelize}= require('sequelize');


const sequelize =new Sequelize({
    dialect:"sqlite",
    storage:"database.sqlite",
});


sequelize.sync().then(() => {
   console.log('Product table created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});


module.exports=sequelize;