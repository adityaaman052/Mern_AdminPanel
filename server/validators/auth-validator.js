const { z } =require("zod")


const signupSchema=z.object({
    username:z
    .string({ required_error: "Name is required"})
    .trim()
    .min(3, { message: "Name must be atleast of 3 chars. "})
    .max(255, {message: "Name must not be more than 255 characters"}),

    email:z
    .string({ required_error: "Email is required"})
    .trim()
    .min(3, { message: "Email must be atleast of 3 chars. "})
    .max(255, {message: "Email must not be more than 255 characters"}),

    phone:z
    .string({ required_error: "phone is required"})
    .trim()
    .min(10, { message: "phone must be atleast of 10 chars. "})
    .max(255, {message: "phone must not be more than 20 characters"}),

    password:z
    .string({ required_error: "password is required"})
    .trim()
    .min(3, { message: "password must be atleast of 3 chars. "})
    .max(255, {message: "password must not be more than 255 characters"}),
   
});

module.exports=signupSchema;