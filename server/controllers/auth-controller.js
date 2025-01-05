const User = require("../models/user-model");
const bcrypt=require("bcryptjs")

const home=async(req,res)=>{
    try{
        res.status(200).send("welcome to home page");
    }
    catch(error){
        console.log(error);

    }
};
const register=async(req,res)=>{
    try{
        const {username,email,phone,password}=req.body;

        const userExist=await User.findOne({email:email});
        if(userExist){
            return res.status(400).json({message: "email already exist"});
        }
        
        const saltRound=await bcrypt.genSalt(10);
        const hash_password= await bcrypt.hash(password,saltRound);
        console.log("Hashed Password:", hash_password); 
      const userCreated=  await User.create({username,email,phone,
        password: hash_password,});
        const token=await userCreated.generateToken();
        console.log("generated token", token)
        console.log(req.body)
        res.status(201).json({message:"registration successful",token:token,userId:userCreated._id.toString(),
//in message, we can also write userCreated
        });
    }
    catch(error){
        // res.status(500).json("internal server error");
        console.log(error);
        next(error) //it will make sure that error middleware is called

    }
};


const login= async(req,res)=>{
    try{
        const {email,password}= req.body;
        const userExist=await User.findOne({email});
        if(!userExist){
            return res.status(400).json({message: "Invalid credentials"});
        }
        // const user=await bcrypt.compare(password,userExist.password);
        const user=await userExist.comparePassword(password);//calling the function to compare password
        if(user){
            res.status(200).json({
                msg:"Login successful",
                token: await userExist.generateToken(),
                userId:userExist._id.toString(),
                
            });
        }
        else{
            res.status(401).json({message: "Invalid email or password"});
        }



    }
    catch(error){
        res.status(500).json("internal server error");
    }
};


//to send user data - user logic

const user=async (req,res)=>{
    try{
        const userData=req.user;
        console.log(userData);
        return res.status(200).json({userData});
    }
    catch(error){
        console.log(`error from the user route ${error}`);

    }
};

module.exports={home,register,login,user}

