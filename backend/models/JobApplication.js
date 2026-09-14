const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    position: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      trim: true,
      default: ""
    },
    jobType: {
      type: String,
      enum: ["Full Time", "Part Time", "Internship", "Contract", "Remote"],
      default: "Full Time"
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Rejected", "Offer", "Withdrawn"],
      default: "Applied"
    },
    appliedDate: {
      type: Date,
      default: Date.now
    },
    jobUrl: {
      type: String,
      trim: true,
      default: ""
    },
    salary: {
      type: String,
      trim: true,
      default: ""
    },
    notes: {
      type: String,
      trim: true,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
