const Product = require("../models/productModel")
const formidable = require('formidable');
const fs = require("fs")
const Joi = require("joi")
const lodash = require("lodash")
const User = require("../models/userModel")

exports.createProduct = async (req, res, next) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
      if(err){
          return res.status(400).json({
              error: "Image could nor update"
          })
      }

      let product = new Product(fields);

      if(files.photo){

        if(files.photo.size > Math.pow(10, 6)){
            return res.status(400).json({
                error: "Image should be less than 1Mo in size !"
            })
        }
          product.photo.data = fs.readFileSync(files.photo.path)
          product.photo.contentType = files.photo.type
      }

      const schema = Joi.object({
          name: Joi.string().required(),
          description: Joi.string().required(),
          price: Joi.required(),
          quantity: Joi.required(),
          category: Joi.required(),
          user_id: Joi.required()
      })

      const {error} = schema.validate(fields)
       
      if(error){
          return res.status(400).json({
              error: error.details[0].message
          })
      }

    const user = await User.find({_id: req.params.userId})


    if(user[0].priceTotale < 10 && user[0].productTotal < 10){

       
        user[0].productTotal += 1;
        product.save( async (err, product) => {
            if(err){
                return res.status(400).json({
                    error: err.message
                })
            }
            
            res.json({
                product
            })
        })

        await user[0].save();


    }else if (user[0].priceTotale >= 10 && user[0].priceTotale < 20  && user[0].productTotal >= 10  && user[0].productTotal < 20){
        product.save(async (err, product) => {
            if(err){
                return res.status(400).json({
                    error: err.message
                })
            }
            res.json({
                product
            })
        })
        
        user[0].productTotal += 1;
        await user[0].save();

    }else if(user[0].priceTotale >= 20 && user[0].productTotal >= 20){
        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error: err.message
                })
            }
          
            res.json({
                product
            })
        })

        user[0].productTotal += 1;
        await user[0].save();
    }
    
  })

}


exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
  
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image could not update"
            })
        }
  
        let product = req.product

        product = lodash.extend(product, fields)
  
        if(files.photo){
  
          if(files.photo.size > Math.pow(10, 6)){
              return res.status(400).json({
                  error: "Image should be less than 1Mo in size !"
              })
          }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
  
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.required(),
            quantity: Joi.required(),
            category: Joi.required()
        })
  
        const {error} = schema.validate(fields)
         
        if(error){
            return res.status(400).json({
                error: error.details[0].message
            })
        }


        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error: err.message
                })
            }
  
            res.json({
                product
            })
        })
    })
  
  }

exports.productById = (req, res, next, id) => {
    Product.findById(id)
    .populate('category')
    .exec((err, product) => {
        if(err || !product){
            return res.status(400).json({
                error: "Product not found"
            })
        }

        req.product = product
        next()
    })
}


exports.showProduct = (req, res) => {
    req.product.photo = undefined

    res.json({
        product : req.product
    })
}


exports.deleteProduct = (req, res) => {
    let product = req.product

    product.remove((err, product) => {
        if(err) {
            return res.status(404).json({
                error: 'Product not Found, And not Deleted'
            })
        }

        res.status(204).json({})
    })
}

exports.allProducts = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let order = req.query.order ? req.query.order : "asc"; // a-z not z-a il prend en consédiration l'alhabétique de les mots les produits
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    
    let query = {}

    let {search, category} = req.query;

    if(search){
        query.name = {$regex: search, $options: 'i'}
    }

    if(category){
        query.category = category
    }

    Product.find(query)
           .select("-photo") //not show url photo in query uri
           .populate('category') // afficher la category de la produit dans uri
           .sort([[sortBy, order]])
           .limit(limit)
           .exec((err, products) => {
               if(err){
                   return res.status(404).json({
                       error: "Products not found"
                   })
               }
               res.json({
                   products
               })
           })

           // localhost:8000/api/product?limit=4&sortBy=category&order=desc
           // ---> limit = 4 product
           // ---> sortBy = {category, description, name} tu choix le propritie que tu peux filtrer
           // ---> order= (desc || asc)  ++++ decroissante || croissante ++

}

exports.relatedProduct =(req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 2;

    Product.find({category: req.product.category,
                 _id: {$ne : req.product._id} // not give to me id of the product 
           })
    .limit(limit)
    .select("-photo")
    .populate('category', 'id name')
    .exec((err, products) => {
        if(err){
            res.status(404).json({
                error: "Product not found !"
            })
        }

        res.json({
            products
        })
    })

}

// search product 
exports.searchProduct = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let order = req.query.order ? req.query.order : "asc"; // a-z not z-a il prend en consédiration l'alhabétique de les mots les produits
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip)
    let findArgs = {}

    console.log(req.body.filters)

    for(let key in req.body.filters){
        if(req.body.filters[key].length > 0){
       
     if(key === "price"){
                // gte - greater than price [0-10]
                // lte - less than

                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            }else{
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
           .select("-photo") //not show url photo in query uri
           .populate('category') // afficher la category de la produit dans uri
           .sort([[sortBy, order]])
           .limit(limit)
           .skip(skip)
           .exec((err, products) => {
               if(err){
                   return res.status(404).json({
                       error: "Products not found"
                   })
               }
               res.json({
                   products
               })
           })


}

// get photo from data base
exports.photoProduct = (req, res) => {
    const {contentType, data} = req.product.photo

    if(data) {
        res.set("Content-Type" , contentType)
        
        return res.send(data)
    }
}

