const express = require('express');
const router = express.Router();
const multer = require('multer')

//Setting up multer options

const upload = multer({ dest: 'images', 

limits: {
    fileSize: 3000000,
},
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            
            cb(new Error('Please upload a proper image.'))
        }
        cb(undefined, true)
    } })

router.post('/upload', upload.single('upload'), (req, res) => {
    // try {
    //     const incident = awaitIncident.findById(req.body.id)

    //     incident.image = req.body.buffer

    //     incident.save()

    //     res.send()
    // } catch (e) {
    //     res.status(200).send(e)
    // }
  res.send("Uploaded Successfully");
}, (error, req, res, next) => {
    res.status(200).send({error: error.message})
})

//Multer setting ends here

const { Student } = require("../models/student");

//Get All Students
router.get("/api/student", (req, res) => {
  Student.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

//Save Student (Adding a new student)
router.post("/api/student/add", (req, res) => {
  const std = new Student({
    name: req.body.name,
    matNumber: req.body.matNumber,
    department: req.body.department,
    faculty: req.body.faculty,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
  });
  std.save((err, data) => {
    res
      .status(200)
      .json({
        code: 200,
        message: "Student Added Successfully",
        addStudent: data,
      });
  });
});

//Get Single Student
router.get("/api/student/:id", (req, res) => {
  Student.findById(req.params.id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

//Update Student
router.put("/api/student/edit/:id", (req, res) => {
  const std = {
    name: req.body.name,
    matNumber: req.body.matNumber,
    department: req.body.department,
    faculty: req.body.faculty,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
  };
  Student.findByIdAndUpdate(
    req.params.id,
    { $set: std },
    { new: true },
    (err, data) => {
      if (!err) {
        res
          .status(200)
          .json({
            code: 200,
            message: "Student Updated Successfully",
            updateStudent: data,
          });
      } else {
        console.log(err);
      }
    }
  );
});

//Delete Student
router.delete("/api/student/:id", (req, res) => {
  Student.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      res
        .status(200)
        .json({
          code: 200,
          message: "Student Deleted Successfully",
          deleteStudent: data,
        });
    }
  });
});
module.exports = router;
