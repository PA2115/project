const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const multer = require("multer");
const path = "./uploads";

//middleware
app.use(cors());
app.use(express.json()); //req.body


const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); //important this is a direct path fron our current file to storage location
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

// Route To Load Index.html page to browser
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// The Multer Middleware that is passed to routes that will receive income requests with file data (multipart/formdata)
// You can create multiple middleware each with a different storage engine config so save different files in different locations on server
const upload = multer({ storage: fileStorageEngine });

// Single File Route Handler
app.post("/single", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("Single FIle upload success");
});

// Multiple Files Route Handler
app.post("/multiple", upload.array("images", 3), (req, res) => {
  console.log(req.files);
  res.send("Multiple Files Upload Success");
});

// app.post("/single", upload.single("image"), async (req, res) => {
//   const { filename, filepath, mimetype, size } = req.body;
//     try{
//     const add = await pool.query("INSERT INTO image_files (filename, filepath, mimetype, size) VALUES ($1, $2, $3, $4) ",
//     [
//       filename, filepath, mimetype, size  
//     ]);
//     res.json(add.rows);
//     res.send("Single FIle upload success");
  
//     }catch(err){
//       console.error(err.message);
//     }
//     console.log(req.file);
//   }
//   );
// app.post('/single', upload.single('profile'), (req, res) => {
//   try {
//     res.send(req.file);
//   }catch(err) {
//     res.send(400);
//   }
// });
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//       cb(null, upload);
//    },
//   filename: function (req, file, cb) {
//       cb(null , file.originalname);
//   }
// });
// var uploadFiles = multer({ storage: storage });

// app.post('/bulk', upload.array('profiles', 4) , (req, res) =>{
//   try {
//       res.send(req.files);
//   } catch(error) {
//         console.log(error);
//          res.send(400);
//   }
// });
// app.use(fileUpload({createParentPath: true}));
// app.post('/upload-avatar', async (req, res) => {
//   try {
//       if(!req.files) {
//           res.send({
//               status: false,
//               message: 'No file uploaded'
//           });
//       } else {
//           //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
//           let avatar = req.files.avatar;

//           //Use the mv() method to place the file in upload directory (i.e. "uploads")
//           avatar.mv('./uploads/' + avatar.name);

//           //send response
//           res.send({
//               status: true,
//               message: 'File is uploaded',
//               data: {
//                   name: avatar.name,
//                   mimetype: avatar.mimetype,
//                   size: avatar.size
//               }
//           });
//       }
//   } catch (err) {
//       res.status(500).send(err);
//   }
// });
app.use("/bmgs", require("./routes/distribution"));
app.use("/bmgs", require("./routes/offer"));
app.use("/bmgs", require("./routes/transaction"));
app.use("/bmgs", require("./routes/locations"));
app.use("/bmgs", require("./routes/merchant"));
app.use("/authentication", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) {
    return console.log("Error", err);
  }
  console.log(`Server running on port ${port}`);
});
