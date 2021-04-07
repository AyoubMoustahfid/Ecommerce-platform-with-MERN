const Ads = require('../models/adsModel');
const formidable = require('formidable');
const lodash = require('lodash')
const fs = require('fs')


exports.createAds = async (req, res, next) => {
    let form = new formidable.IncomingForm();
  
    form.keepExtensions = true;
  
    form.parse(req, async (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image could nor update"
            })
        }
  
        let ads = new Ads(fields);
  
        if(files.photo){
  
          if(files.photo.size > Math.pow(10, 6)){
              return res.status(400).json({
                  error: "Image should be less than 1Mo in size !"
              })
          }
            ads.photo.data = fs.readFileSync(files.photo.path)
            ads.photo.contentType = files.photo.type
        }
  
        ads.save((err, ads) => {
            if(err){
                return res.status(400).json({
                    error: err.message
                })
            }
          
            res.json({
                ads
            })
        })
      
    })
  
  }

exports.updateAds = (req, res) => {
    let form = new formidable.IncomingForm();
  
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image could not update"
            })
        }
  
        let ads = req.ads

        ads = lodash.extend(ads, fields)
  
        if(files.photo){
  
          if(files.photo.size > Math.pow(10, 6)){
              return res.status(400).json({
                  error: "Image should be less than 1Mo in size !"
              })
          }
            ads.photo.data = fs.readFileSync(files.photo.path)
            ads.photo.contentType = files.photo.type
        }

        ads.save((err, ads) => {
            if(err){
                return res.status(400).json({
                    error: err.message
                })
            }
  
            res.json({
                ads
            })
        })
    })
  
  }

exports.adsById = (req, res, next, id) => {
    Ads.findById(id)
    .exec((err, ads) => {
        if(err || !ads){
            return res.status(400).json({
                error: "Ads not found"
            })
        }

        req.ads = ads
        next()
    })
}


exports.deleteAds = (req, res) => {
    let ads = req.ads

    ads.remove((err, ads) => {
        if(err) {
            return res.status(404).json({
                error: 'Ads not Found !'
            })
        }

        res.status(204).json({})
    })
}

exports.allAds = (req, res) => {

    Ads.find().exec((err, ads) => {
               if(err){
                   return res.status(404).json({
                       error: "Ads not found"
                   })
               }
               res.json({
                   ads
               })
           })

        

}

// get photo from data base
exports.photoAds = (req, res) => {
    const {contentType, data} = req.ads.photo

    if(data) {
        res.set("Content-Type" , contentType)
        
        return res.send(data)
    }
}