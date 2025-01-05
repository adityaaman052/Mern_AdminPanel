
const express=require('express');
const admincontroller = require("../controllers/admin-controller");
const authMiddleware=require("../middlewares/auth-middleware")
const adminMiddleware=require("../middlewares/admin-middleware")

const router=express.Router();


router.route('/users').get(authMiddleware,adminMiddleware,admincontroller.getAllUsers);
router.route('/users/:id').get(authMiddleware,adminMiddleware,admincontroller.getUserById);
router.route('/users/update/:id').patch(authMiddleware,adminMiddleware,admincontroller.updateUserById);

router.route("/users/delete/:id").delete(authMiddleware,admincontroller.deleteUserById);
router.route("/contacts/delete/:id").delete(authMiddleware,admincontroller.deleteContactById);
router.route('/contacts').get(authMiddleware,adminMiddleware,admincontroller.getAllContacts);
module.exports=router;