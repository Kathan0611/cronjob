const products = require("../model/ProductModel");
const sequelize=require('./../dbconfig/db')
const User = require("./../model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cron = require('node-cron');
const Product = require("../model/ProductModel");
const CronJob=require('./../model/CronJobModel')



//create User
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      req.flash()
      
      
      
      return res.staus(204).json({
        message: "fill required filed ",
        data: {
          User: User,
        },
      });
    }
    const existUser=  await User.findOne({email:email});
     if(existUser){
        return res.status(400).json({message:"Updated Username"})
     }
    const hashPassword = bcrypt.hashSync(password, 12);
    const user = new User({ name: name, email: email, password: hashPassword });
    await user.save();
    function logMessage() {
         console.log('Cron job executed at:',res.status(201).json({
          data: {
         status: "Success",
         User: user,
        },
        }));
           }
           cron.schedule('*/10 * * * * *', () => {
            logMessage();
             });

    // return res.status(201).json({
    //   data: {
    //     status: "Success",
    //     User: user,
    //   },
    // });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



//getTop5 User
exports.get5document = async (req, res) => {
  try {
    const token = req.headers.authorization.toString().split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is missing in headers" });
    }
    
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    const userId = decoded;
    const user = await User.find({ _id: userId }).limit(5);
    if (!user) {
      return res.status(404).json({
        message: "document not found",
      });
    }
    
    return res.status(200).json({
      data: {
        staus: "Success",
        result: user.length,
        data: {
          user: user,
        },
      },
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};


//get SingleUser
exports.singleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.toString().split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is missing in headers" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded === id) {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          message: "document not found",
        });
      }
      
      return res.status(200).json({
        data: {
          staus: "Success",
          data: {
            user: user,
          },
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};


//Update User
exports.upadateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const token = req.headers.authorization.toString().split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is missing in headers" });
    }
    
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    if (decoded === id) {
      const UpdatedUser = await User.findByIdAndUpdate(
        id,
        { name: name, email: email, password: bcrypt.hashSync(password, 12) },
        { new: true }
      );
      if (!UpdatedUser) {
        res.status(404).json("Document is not found");
      }
      await UpdatedUser.save();

      return res.status(200).json({
        status: "Success",
        data: {
          UpdateUser: UpdatedUser,
        },
      });
    } else {
      return res.status(401).json({ message: "Unauthorization User" });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};


//deleteUser
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.toString().split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is missing in headers" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    console.log(decoded);
    if (decoded === id) {
      const deleteUser = await User.findByIdAndDelete(id);
      
      if (!deleteUser) {
        res.status(404).json({ message: "document is not found" });
      }

      res.status(200).json({
        status: "success",
        data: {
          deleteUser: deleteUser,
        },
      });
    } else {
      return res.status(401).json({ message: "Unauthorized User" });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};


//dashbord

exports.dashbord = async (req, res) => {
  try {
    const { connectToMongo, connectToSqlite, currentDb } = require('./../dbconfig/db'); 
    const toggleValue=req.query.toggleValue;
    if(toggleValue=="ON"){
      const currentDb= await connectToMongo('mongodb://localhost:27017/toggle');
      const user = await User.aggregate([{ $count: "name" }]);
           const user2 = await User.find({}).sort({ createdAt: -1 }).limit(5);
    


        if (!user) {
        return  res.status(404).json({ message: "User document Not Found " });
      }
      return  res.render("dashbord", { email:"kathan", count: user[0].name,users:user2, user_active:1});
      
    }
    else{
      const  currentDb=  await connectToSqlite('database.sqlite');
      const count=await products.count();
      const product = await products.findAll({ order: [['createdAt', 'DESC']], limit: 5});
      return res.render("dashbord",{email:"kathan",count:count,users:product,user_active:1})
    }

    
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


//getAll product for sequelize
exports.getAllProduct = async (req, res) => {
  try {
  
    const cronjob= await CronJob.findAll()
    console.log(cronjob);
    const product = await products.findAll(
      {
        order: [['createdAt', 'DESC']],
        limit: 5
      }
    );
    return res.status(200).json({
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(500).json({
      data: {
        message: error.message,
      },
    });
  }
};


//create Product
exports.createProduct=async (req,res)=>{
  try{
    console.log(req.body)
    const product= await products.create(req.body);


        return res.status(200).json({
            data:{
                status:'success',
                data:product
            }
        })
    }
    catch(err){
        res.status(400).json({
            data:{
                message:err.message
            }
        })
    }
}


exports.cronJob = async (req, res) => {
  let { jobName, schedule, command } = req.body;

  // Validate the API request.
  if (!jobName || !schedule || !command) {
    return res.status(400).send('Invalid API request.');
  }

  // Define the command function
  // command = () => {
  //   // Your function or code to execute
  //   console.log('Cron job executed.');
  // };

  // Create the cron job.
  const job = cron.schedule(schedule, ()=>{
    console.log("Cron job executed.")
  }, {
    jobName,
  });

  // Start the cron job.
  job.start();

  try {
    // Create a record in the database
    await CronJob.create({
      jobName,
      schedule,
      command // Store the command function as a string in the database
    });
    // console.log(newCronJob)
    // Respond to the API request.
    return res.status(200).send('Cron job created successfully.');
  } catch (error) {
    console.error('Error creating cron job:', error.message);
    return res.status(500).send('Internal Server Error');
  }
};
