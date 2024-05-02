
     const mongoose=require('mongoose');

     const connect =async (req,res)=>{
        
         await mongoose.connect('mongodb://localhost:27017/toggle');
             
            console.log(`Database Successfully connected`)
        
        }
        module.exports=connect




  
// const mongoose = require('mongoose');
const Sequelize = require('sequelize');

let currentDb = null;  // Initialize globally to avoid scoping issues


async function connectToMongo(uri) {
  try {
    currentDb = await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}



async function connectToSqlite(dbPath) {
  try {
  currentDb = new Sequelize({
      dialect: 'sqlite',
      storage: dbPath,
    });
    await currentDb.sync();
    console.log('Connected to SQLite');
  } catch (error) {
    console.error('Error connecting to SQLite:', error);
  }
}



module.exports = {
  connectToMongo,
  connectToSqlite,
  currentDb,
  connect
};

//     {
//     const {Sequelize}= require('sequelize');

//     const sequelize =new Sequelize({
//     dialect:"sqlite",
//     storage:"database.sqlite",
//      });

//     sequelize.sync().then(() => {
//        console.log('Product table created successfully!');
//      }).catch((error) => {
//      console.error('Unable to create table : ', error);
//      });

//      module.exports=sequelize;

//     }

// }
 
// module.exports=helperFunction;