import express from 'express'
const app = express()

import cors from 'cors'
app.use(cors())

// import bodyParser from 'body-parser'
// app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
const port = 3000


// Connect to mongodb
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

const shoeSchema = new mongoose.Schema({
  title: String,
  price: Number,
  gender: String,
  desc: String,
  url: String,
})

// Code to fetch to / from database

const fetchData = mongoose.model("man", shoeSchema)

app.get("/",(req,res)=>{
  fetchData.find({}).then(
    items=>res.json(items)
  ).catch(err=>console.log(err))
})


// Code to upload to /api/upload and then to database
// first send only text data to mongodb via backend 
const shoeSchema1 = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
})
const uploadData = mongoose.model("shoes", shoeSchema1)

// then store the image to S3 bucket 
import multer, { memoryStorage } from "multer";
import { s3Uploadv2 } from "./s3Service.js";

const storage = memoryStorage()
const upload = multer({storage})


// const storage = multer.memoryStorage();

app.post("/upload",upload.single('file'), async(req, res)=>{

  // Uploading file to S3
  const result = await s3Uploadv2(req.file)

    res.json({status:"success", result})

  const body = req.body
  console.log("here is the console: ",body)
  if(
    
    !body.title ||
    !body.price ||
    !body.gender ||
    !body.desc
  ){
    return res.status(400).json({msg: "All fields are required..."})
  }

  try {
  
    // Saving the data to the database
    const result = new uploadData({
      title: body.title,
      price: body.price,
      gender: body.gender,
      desc: body.desc
    })
    await result.save()

    // Send a success response
    res.status(200).json({msg: "Data uploaded successfully"})
  
  }catch(error){
    console.error("Error uploading data: ", error)
    res.status(500).json({msg: "Server error"})
  }
})




// then fetch the link and store the link to mongodb database along with the other data fetched from the form


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})