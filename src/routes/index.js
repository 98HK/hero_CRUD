const router = require("express").Router();
const UserRoutes = require("./user");
const CourseRoutes = require("./course");

router.use("/user", UserRoutes);
router.use("/courses", CourseRoutes);


module.exports = router;