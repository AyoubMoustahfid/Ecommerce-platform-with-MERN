const express = require("express")
const {salam, signup, singin, signout, signinBuyer, validateBuyer} = require('../controllers/authController')
const {userSignupValidator} = require('../middlewares/userValidator')
const {requireSignIn} = require("../middlewares/auth")


const router = express.Router()

router.get("/",salam)
router.post("/singnup", userSignupValidator, signup)
router.post("/singnin", singin)
router.post("/buyer/singnin", signinBuyer)
router.put("/validationBuyer", validateBuyer)
router.get("/singnout", signout)


router.get("/hello", requireSignIn, (req, res) => {
    res.send("hello there")
})

module.exports = router