const User = require("../models/userModel")
const Product = require("../models/productModel")


exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {

        if(err || !user) {
            return res.status(404).json({
                error: "user not found !"
            })
        }

        req.profile = user
        next()
    })
}


exports.addProductsUserHistory = (req, res, next) => {

    let history = []

    history = req.body.products.map(product => {
        return {
            _id: product._id,
            name: product.name,
            description: product.description,
            quantity: product.quantity,
            amount: product.price * product.count, 
            transact_id: req.body.transactionId
        }
    })

   if(history.length) {
    User.findByIdAndUpdate({_id: req.profile._id}, {$push: {history}}, {new: true}, (err, data) => {

     if(err) {
         return res.status(400).json({error: "Couldn't update user history !"})
     }
     return next()
        
    })
   }

   next()
}



exports.increasePriceTotal = (req, res, next) => {

    User.find({_id : req.profile._id})
          .then(item => {

           let bulkOps = item.map(u => {
               return{
                   updateOne: {
                       filter: { _id: u._id },
                       update: { $inc: {priceTotal: +1 }}
                   }
               }
           })

           console.log(bulkOps);

   
           User.bulkWrite(bulkOps, (err, user) => {
               if(err) {
                   return res.status(400).json({error: err.message});
               }
       
               next()
           })

          })

}
