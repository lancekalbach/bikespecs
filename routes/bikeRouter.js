const express = require("express")
const bikeRouter = express.Router()
const Bike = require('../models/bike.js')
const user = require('../models/user.js')
const multer = require('multer')

//Get All Bikes//not on page load
bikeRouter.get("/", (req,res,next) => {
    Bike.find( async (err, bikes) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        const bikeWithUser = await Promise.all(bikes.map( async bike => {
            const bikeUser = await user.findById(bike.author)
            return {...bike.toObject(), bikeUser: bikeUser?.withoutPassword()}
        }))
        return res.status(200).send(bikeWithUser)
    })
})

//the get all (may use)
bikeRouter.get('/getAll', async (req, res, next) => {
    try {
        const bikeArr = await Bike.find()

        const bikesWithInfo = await Promise.all(bikeArr.map(async bike => {
            const userInfo = await user.findById(bike.author)

            return {...bike.toObject(), userInfo: userInfo?.withoutPassword()}
        }))
        res.status(200).send(bikesWithInfo)
    } catch(err){
        res.status(500)
        return next(err)
    }
})

//Get bikes by user ID
bikeRouter.get("/user", async (req,res,next) => {
    try {
        const bikeArr = await Bike.find({author : req.auth._id})

        const bikesWithInfo = await Promise.all(bikeArr.map(async bike => {
            const userInfo = await user.findById(bike.author)

            return {...bike.toObject(), userInfo : userInfo?.withoutPassword()}
        }))
        res.status(200).send(bikesWithInfo)
    } catch(err){
        res.status(500)
        return next(err)
    }
})

//Bike search
bikeRouter.get('/search', async (req, res) => {
    const { query } = req.query;

    try {
        const result = await Bike.find({ model: { $regex: new RegExp(query, 'i') } })
        console.log('Search result:', result)
        res.json(result)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

//Update Bike 
//need to add edit and delete functionality 


//Add new bike
//pdf handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './files')
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + file.originalname)
    },
  })
  
  const upload = multer({ storage: storage })
  


bikeRouter.post("/", upload.single('pdf'), async (req, res, next) => {
    req.body.author = req.auth._id
    const { year, brand, model, imge } = req.body
    const pdfPath = req.file ? req.file.path : null
    try {
        const newBike = new Bike({
            year,
            brand,
            model,
            imge,
            pdf: pdfPath,
            author: req.auth._id,
        })
        const savedBike = await newBike.save()
        const bikeUser = await user.findById(newBike.author)
        const postWithUser = {
            ...savedBike.toObject(),
            bikeUser: bikeUser?.withoutPassword(),
        };
        return res.status(201).send(postWithUser)
    } catch (err) {
        return handleErrors(res, next, err)
    }
})



module.exports = bikeRouter