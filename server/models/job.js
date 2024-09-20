import mongoose from "mongoose";
import validator, { trim } from "validator";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Provide a Job Title"],
      minLength: [3, "Enter atleast 3 characters."],
      maxLength: [50, "Only 50 chaaracters are allowed."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Provide a Job Description"],
      minLength: [50, "Enter atleast 50 characters."],
      maxLength: [1000, "Only 1000 chaaracters are allowed."],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Provide a Job Category"],
      enum: {
        values: ["IT", "Finance", "Design", "Marketing", "Healthcare", "Other"],
        message: "Please select a valid job category.",
      },
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Provide Country"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "Provide City"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Provide your location"],
      minLength: [10, "Enter atleast 10 characters."],
      trim: true,
    },
    fixedSalary: {
      type: Number,
      min: [1000, "Salary must be at least 1000."],
      max: [1000000, "Salary cannot exceed 1,000,000."],
      validate: {
        validator: function (v) {
          // If fixedSalary is provided, salaryFrom and salaryTo should not be set
          if (v && (this.salaryFrom || this.salaryTo)) {
            return false;
          }
          return true;
        },
        message: "Provide either a fixed salary or a salary range, not both.",
      },
    },
    salaryFrom: {
      type: Number,
      min: [1000, "Salary From must be at least 1000."],
      max: [1000000, "Salary From cannot exceed 1,000,000."],
      validate: {
        validator: function (v) {
          // If salaryFrom is provided, fixedSalary should not be set
          if (v && this.fixedSalary) {
            return false;
          }
          return true;
        },
        message: "Provide either a fixed salary or a salary range, not both.",
      },
    },
    salaryTo: {
      type: Number,
      min: [1000, "Salary To must be at least 1000."],
      max: [1000000, "Salary To cannot exceed 1,000,000."],
      validate: {
        validator: function (v) {
          // If salaryTo is provided, fixedSalary should not be set
          if (v && this.fixedSalary) {
            return false;
          }
          // salaryTo should be greater than or equal to salaryFrom
          if (v && this.salaryFrom && v < this.salaryFrom) {
            return false;
          }
          return true;
        },
        message:
          "Provide either a fixed salary or a valid salary range (salaryTo >= salaryFrom), not both.",
      },
    },
    expired: {
      type: Boolean,
      default: false,
    },
    jobPostedOn: {
      type: Date,
      default: Date.now,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

jobSchema.index({ postedBy: 1 });
jobSchema.index({ category: 1 });
jobSchema.index({ country: 1, city: 1 });

export const Job = mongoose.model("Job", jobSchema);
