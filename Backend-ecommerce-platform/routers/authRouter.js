const express = require("express")
const {salam, signup, singin, signout, signinBuyer, validateBuyer, validateAdmin, getAllUser, allUser, findUser} = require('../controllers/authController')
const {userSignupValidator} = require('../middlewares/userValidator')
const {requireSignIn, isAuth, isAdmin, isSuperAdmin} = require("../middlewares/auth")
const {userById} = require('../middlewares/user')


const router = express.Router()

router.get("/",salam)
router.post("/singnup", userSignupValidator, signup)
router.post("/singnin", singin)
router.post("/buyer/singnin", signinBuyer)
router.put("/validationSeller/:id/:userId", [requireSignIn, isAuth, isAdmin],validateBuyer)
router.put("/validationAdmin/:id/:userId", [requireSignIn, isAuth, isSuperAdmin], validateAdmin)
router.get('/all_user/:userId', [requireSignIn, isAuth, isSuperAdmin], getAllUser);
router.get('/all_user_seller/:userId', [requireSignIn, isAuth, isAdmin], allUser)

router.get('/find/:id', findUser)

router.get("/singnout", signout)

router.param('userId', userById)


router.get("/hello", requireSignIn, (req, res) => {
    res.send("hello there")
})

module.exports = router