const { z } =require("zod")


const loginSchema=z.object({
    

    email:z
    .string({ required_error: "Email is required"})
    .trim()
    .min(3, { message: "Invalid email address "})
    .max(255, {message: "Email must not be more than 255 characters"}),

   

    password:z
    .string({ required_error: "password is required"})
    .trim()
    .min(3, { message: "password must be atleast of 3 chars. "})
    .max(255, {message: "password must not be more than 255 characters"}),
   
});

module.exports=loginSchema;