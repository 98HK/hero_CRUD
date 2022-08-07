const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    name: { type: String, required: true },
    imageUrl: { type: String, required: false, default: "" },
    universityName: { type: String, required: true },
    facultyProfileLink: { type: String, required: false, default: "" },
    learningDuration: { type: String, required: true },
    price: { type: String, required: true },
    certificateUrl: { type: String, required: false, default: "" },
    eligibilityCriteria: { type: String, required: true },
  },
  { timestamps: true }
);

const Course = mongoose.model("course", CourseSchema);
module.exports = Course;
