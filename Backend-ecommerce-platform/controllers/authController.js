const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')


exports.salam = (req, res) => {
    res.send({message: "users module"})
}

exports.signup = (req, res) => {
    const user = new User(req.body)

    user.save((err, user) => {
        if(err) {
            return res.status(400).send(err)
        }
    user.hashed_password = undefined
    user.salt = undefined
        res.send(user)
    })
}

exports.singin = (req, res) => {
    const {email, password} = req.body

    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User not found with this email, Please Signup!"
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email ans Password dont mutch !"
            })
        }

        const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET);

        res.cookie("token", token, {expire: new Date() + 902600})

        const {_id, name, email, role} = user;

        res.json({
            token, user: {_id, name, email, role}
        })
    })
}

exports.signinBuyer = (req, res) => {

    const {email, password} = req.body
    User.findOne({email, role: 'BUYER'}, (err, user) => {
        if(err || !user){
            return res.status(401).json({
                error: "is not Buyer in data base User !!"
            })
         }

         if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email ans Password dont mutch !"
            })
        }

        const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET);

        res.cookie("token", token, {expire: new Date() + 902600})

        const {_id, name, email, role} = user;

        res.json({
            token, user: {_id, name, email, role}
        })
    })
  
}

exports.validateBuyer = (req, res) => {

    User.findByIdAndUpdate(req.params.id, {role: 'SELLER'})
        .exec((err, user) => {
            if(!user){
                return res.status(404).json({
                    error: 'User not found with id :' + req.params.id
                })
            }

            res.json({
                user
            })

        })
}


exports.validateAdmin = (req, res) => {

    User.findByIdAndUpdate(req.params.id, {role: 'ADMIN'})
        .exec((err, user) => {
            if(!user){
                return res.status(404).json({
                    error: 'User not found with id :' + req.params.id
                })
            }

            res.json({
                user
            })

        })
}

exports.getAllUser = (req, res) => {

    User.find({role: {$ne: 'SUPER_ADMIN'}}).exec((err, users) => {
           if(err){
               return res.status(404).json({
                   error: "bad request"
               })
           }

           res.json({
               users
           })
    })
}

exports.allUser = (req, res) => {

    // User.find({role:  'SELLER'})
    User.find({$or : [{role:  'SELLER'},{role:  'USER'}]})
    .exec((err, users) => {
           if(err){
               return res.status(404).json({
                   error: "bad request"
               })
           }

           res.json({
               users
           })
    })
}

exports.signout = (req, res) => {
    res.clearCookie("token")

    res.json({
        message : "User is Signout"
    })
}