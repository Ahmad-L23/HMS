const router = require("express").Router();
const {verifyTokenAndAdmin} = require("../middleWares/verfiyToken.js") 
const {getAllUsers,getUserById,createUser,updateUser,deleteUser} = require("../controllers/userController.js")



router.post('/', verifyTokenAndAdmin , createUser);


router.get('/',getAllUsers);


router.route("/:id").get(getUserById)
.put( verifyTokenAndAdmin,updateUser)
.delete(verifyTokenAndAdmin,deleteUser)

module.exports=router;
