const Contact = require('../model/contact');
const { v4: uuidv4 } = require('uuid');
const multer = require("multer");
const fs = require('fs');
const path =require("path");



const fileStorage = multer.diskStorage({
    destination:(req,image,cb)=>{
      const dir =`./images`
      const exist =fs.existsSync(dir)
      if(!exist){
          return fs.mkdir(dir, error => cb(null, dir))
      }
      return cb(null,dir)
  },
    filename:(req,image,cb)=>{
        if(image!= null && image.originalname!= req.body.imageName){
        req.body.imageName = image.originalname
        cb(null,image.originalname)  
    }
    }
  })
  
  
  
  var uploadImage = multer({storage:fileStorage}).single("image")



exports.deleteContact = async( req, res, next) =>{
    try {
        const contact = await Contact.findByIdAndDelete(req.query._id)
        if(!contact) {
             const error = new Error('cannot get delete contact')
            error.statusCode = 400;
            throw error

        }
        res.status(200).json({ success: true, data:contact})

    }

    catch( err){
        // return res.status(400).json({success : false,data: 'Product deletion failed'})
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
       
    }
}

  exports.createContact = async( req, res, next) => {
    try {
        uploadImage(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            if(req.body.firstname.length < 3){
                return res.status(400).json({error: 'firstname must be morthan 3 charecters exists' })
               
            }
            if(req.body.lastname.length < 1){
                return res.status(400).json({error: 'lastname must be atleast 1 charecter exists' })
               
            }
            if(!req.body.email.includes("@") && !req.body.email.includes(".") && (req.body.email.length <= 6)){
                return res.status(400).json({error: 'email is invalid' })
            }
            if(req.body.phone.length != 10){
                return res.status(400).json({error: 'enter valid phone number' })
               
            }
            
        await Contact.create(req.body).then((contact) => {
        return res.status(200).json({ success: true, data: contact})
        }).catch((err_full) =>{
             
                return res.status(400).json({error: 'Phone NUmber Already exists' })
           
        })
     })
    }

    catch( err){
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
       
    }

}

exports.updateContact = async(req,res,next) => {
    try {
        uploadImage(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            console.log(req.body);
            await Contact.findByIdAndUpdate(req.body._id, {$set : req.body},{
                        new : true,
                        useFindAndModify : false
                    }).then((contact) => {
        return res.status(200).json({ success: true, data: contact})
        }).catch((err_full) =>{
                return res.status(400).json({error: 'error contact update' })           
        })
     })
    }

    catch( err){
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getAllContacts = async( req, res,next) => {

    try {
        const contacts = await Contact.find()
        if(!contacts) {
            const error = new Error('cannot get All contacts')
            error.statusCode = 400;
            throw error

        }
        res.status(200).json({ success: true, data:contacts})

    }

    catch( err){
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
       
    }

}