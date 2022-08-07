const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Course = require("../models/Course");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all the Courses using: GET "/api/v1/courses/fetchallcourses". Login required
router.get("/fetchallcourses", fetchuser, async (req, res) => {
  try {
    const courses = await Course.find({ user: req.user.id }, { _id: 1, title: 1 });
    res.json(courses);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Get an Existing Course with ID using: GET "/api/v1/courses/fetchcourse". Login required
router.get("/fetchcourse/:id", fetchuser, async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).send("Not Found");
    }
    res.json(course);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 3: Add a new Course using: POST "/api/v1/courses/addcourse". Login required
router.post("/addcourse", fetchuser,
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("universityName", "Enter a valid University Name").isLength({ min: 3 }),
    body("facultyProfileLink"),
    body("learningDuration", "Enter a Duration in Hours"),
    body("price", "Enter a price for the course"),
    body("eligibilityCriteria", "Enter a valid Criteria for the Course"),
    body("certificateUrl"),
    body("imageUrl"),
  ],
  async (req, res) => {
    try {
      const { name, universityName, facultyProfileLink, learningDuration, price, eligibilityCriteria, certificateUrl, imageUrl, tag } = req.body;
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // res.send(req.user.id);
      const course = new Course({
        name,
        universityName, 
        facultyProfileLink, 
        learningDuration, 
        price, 
        eligibilityCriteria, 
        certificateUrl, 
        imageUrl, 
        tag,
        user: req.user.id,
      });
      const checkCourse = await Course.findOne({
        name: course.name,
        universityName: course.universityName,
        facultyProfileLink: course.facultyProfileLink,
        learningDuration: course.learningDuration,
        price: course.price,
        eligibilityCriteria: course.eligibilityCriteria,
        certificateUrl: course.certificateUrl,
        imageUrl: course.imageUrl
      });
      if (checkCourse) {
        throw new Error("Course is already created, please create new Course");
      }
      const savedCourse = await course.save();
      res.json(savedCourse);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// ROUTE 4: Update an Existing Course using: PUT "/api/v1/courses/updatecourse/:id". Login required
router.put("/updatecourse/:id", fetchuser, async (req, res) => {

  // Find the course to be updated and update it
  let course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).send("Not Found");
  }

  if (course.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  course = await Course.findByIdAndUpdate(
    req.params.id,
    { $set: {...req.body}},
    { new: true }
  );
  res.json({ course });
});

// ROUTE 5: Delete an Existing Course using: DELETE "/api/v1/courses/deletecourse". Login required
router.delete("/deletecourse/:id", fetchuser, async (req, res) => {
  try {
    // Find the course to be delete and delete it
    let course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).send("Not Found");
    }

    // Allow dletion only if user owns this Course
    if (course.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    course = await Course.findByIdAndDelete(req.params.id);
    res.json({ Success: "Course has been Deleted", course: course });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;