import express from 'express';
const app = express();

import cors from 'cors';
app.use(cors());

// import express from 'express';
import { s3Uploadv2 } from './s3Service.js';
import multer, { memoryStorage } from 'multer';

// const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Connect to mongodb
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const shoeSchema = new mongoose.Schema({
  title: String,
  price: Number,
  gender: String,
  desc: String,
  url: String,
});

// Code to fetch to / from the database
const fetchData = mongoose.model('man', shoeSchema);

app.get('/', (req, res) => {
  fetchData
    .find({})
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

// Code to upload to /api/upload and then to the database
// first send only text data to MongoDB via the backend
const shoeSchema1 = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  url:{
    type: String,
    required: true,
  }
});
const uploadData = mongoose.model('shoes', shoeSchema1);

// then store the image to S3 bucket
const storage = memoryStorage();
const upload = multer({ storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  const body = req.body;
  // console.log('here is the console: ', body);

  if (!body.title || !body.price || !body.gender || !body.desc) {
    return res.status(400).json({ msg: 'All fields are required...' });
  }

  try {
    // Uploading file to S3
    const result = await s3Uploadv2(req.file);

    // Saving the data to the database
    const dbResult = new uploadData({
      title: body.title,
      price: body.price,
      gender: body.gender,
      desc: body.desc,
      url: result.Location, // Assuming you are storing the S3 URL in the database
    });

    await dbResult.save();
    console.log(dbResult)
    // Send a success response
    res.status(200).json({ msg: 'Data uploaded successfully', result });
  } catch (error) {
    console.error('Error uploading data: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// then fetch the link and store the link in the MongoDB database along with the other data fetched from the form

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
