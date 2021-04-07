const Product = require("../models/productModel")


exports.decreaseQuantity = (req, res, next) => {

    let bulkOps = req.body.products.map(product => {
        return{
            updateOne: {
                filter: { _id: product._id },
                update: { $inc: {quantity: -product.count, sold: +product.count }}
            }
        }
    })

    console.log(JSON.stringify(bulkOps));

    
    Product.bulkWrite(bulkOps, (err, products) => {
        if(err) {
            return res.status(400).json({error: err.message});
        }

        next()
    })
}