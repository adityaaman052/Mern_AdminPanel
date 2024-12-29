const express=require("express");
const router=express.Router();//class for simplifying the routing
const authcontrollers =require("../controllers/auth-controller")
const signupSchema=require("../validators/auth-validator")
const validate=require("../middlewares/validate-middleware")
const loginSchema=require("../validators/login-validator")
const aurthMiddleware=require("../middlewares/auth-middleware")
// router.get("/",(req,res)=>{
//     res.status(200).send("hello bhaiya hi");
// });


// router.route("/register").get((req,res)=>{
//     res.status(200).send("welcome to registration page");

// });

router.route("/").get(authcontrollers.home);
router.route("/register").post(validate(signupSchema),authcontrollers.register);
router.route("/login").post(validate(loginSchema),authcontrollers.login);
router.route("/user").get(aurthMiddleware,authcontrollers.user);


module.exports =router;