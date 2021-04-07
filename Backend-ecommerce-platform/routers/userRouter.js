const express = require("express")
const {getOneUser, updateOneUser,getAllUser} = require("../controllers/userController")
const {userById} = require("../middlewares/user")
const {requireSignIn, isAuth, isAdmin, isSuperAdmin, isBuyer} = require("../middlewares/auth")

const router = express.Router();

router.get("/:userId",[requireSignIn, isAuth, isAdmin], getOneUser)
router.put("/:userId",[requireSignIn, isAuth, isAdmin], updateOneUser)
router.get("/:userId", [requireSignIn, isAuth, isAdmin], getAllUser);
router.get("/:userId", [requireSignIn, isAuth, isSuperAdmin], getAllUser);


router.param("userId", userById)

module.exports = router