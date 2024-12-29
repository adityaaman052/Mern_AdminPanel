const express=require("express");//using power of express
require('dotenv').config();

const app=express();
const cors=require("cors")
const authRouter=require("./router/auth-router")
const contactRoute=require("./router/contact-router")
const connectDb=require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");


//handling cors policy
const corsOptions={
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    Credentials:true,
};


app.use(cors(corsOptions));
app.use(express.json());


app.use("/",authRouter)
app.use("/form",contactRoute)
app.use(errorMiddleware)

// app.get("/",(req,res)=>{
//     res.status(200).send("hello ji");

// });
// app.get("/register",(req,res)=>{
//     res.status(200).send("welcome to register page")
// })

const PORT=5000;

connectDb().then(()=>{

    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
    });
});