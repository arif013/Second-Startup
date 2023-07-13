import dotenv from 'dotenv'
dotenv.config()
// Imports
import express from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors'

const app = express();
const port = 3000;
app.use(cors())

// Middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }));

// Database 
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,
useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected');
    app.listen(3001, () => {
      console.log('Database started on port 3001');
    });
  })
  .catch((error) => {
    console.log(error);
  });

const shoeSchema = new mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    gender: String,
    desc: String,
    url: String,
})
const man = mongoose.model("man", shoeSchema)

app.get("/",(req,res)=>{
    man.find({}).then(
        items=>res.json(items)
    ).catch(err=>console.log(err))
    // res.send("express here")
})

// Connect to mongodb to upload data
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const Shoe = mongoose.model('Shoe', shoeSchema);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Using multer to upload data to db
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null,join(__dirname, 'uploads/'));
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Serve static files from the uploads directory
app.use('/uploads', express.static(join(__dirname, 'uploads')));

app.post("/upload", upload.single("image"), async(req, res) => {

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ message: 'File uploaded successfully' });
  console.log(req.file.path)
  console.log(req.body)

  // Stuff to be added later
  // const formData = req.body;
  // const fileData = req.file;
  // // Create a new shoe document
  const shoe = new Shoe({
    title: req.body.title,
    price: req.body.price,
    gender: req.body.gender,
    desc: req.body.desc,
    url: req.file.path,
  });
  // // Save the shoe document to the database using promises
  shoe.save()
    .then(() => {
      console.log('Shoe data saved successfully');
      // return res.redirect("/upload");
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send('Error saving shoe data');
    });
  // console.log(fileData, formData);
  console.log(shoe)
  // res.json({message:"Form data received"})
});

// app.set("view engine", "html");
// app.set("views", path.resolve("./uploadForm/views"));


 

// Fetch data from frontend to backend

// app.post("/upload", async(req,res)=>{
//   const formData = req.body;
//   const data ={
//     title:formData.title,
//     price:formData.price,
//     desc:formData.desc,
//     file:formData.file
//   }
//   res.json({message:"Form data received"})
//   console.log(formData);
// })




app.listen(port,()=>console.log(`Server started on port ${port}`));