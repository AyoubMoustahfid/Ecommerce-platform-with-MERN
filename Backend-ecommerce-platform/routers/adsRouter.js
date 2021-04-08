// const express = require("express")
// const {createAds, updateAds, allAds, photoAds, adsById, deleteAds} = require('../controllers/adsController')
// const {userById} = require("../middlewares/user")
// const {requireSignIn, isAuth, isAdmin} = require("../middlewares/auth")


// const router = express.Router()

// router.get('/', allAds)
// router.get('/photo/:adsId', photoAds)
// router.post('/create/:userId', [requireSignIn, isAuth, isAdmin] , createAds)
// router.delete('/:adsId/:userId', [requireSignIn, isAuth, isAdmin] ,deleteAds )
// router.put('/:adsId/:userId', [requireSignIn, isAuth, isAdmin] , updateAds )


// router.param("userId", userById)
// router.param("adsId", adsById)

// module.exports = router 

const express = require("express")
const router = express.Router();
const { uploadImage }=require("./../middlewares/uploadFiles")
const { getAllAds ,addAds,deleteAds, getAdsPagin} = require("./../controllers/adsController");

router.get("/getAll", getAllAds);
router.get("/get", getAdsPagin);
router.post('/add', uploadImage.array('picture',1),addAds);
router.delete("/delete/:id",deleteAds);

module.exports = router;