import mongoose from "mongoose";
import validator from "validator";

// Define the Applicant sub-schema
const applicantSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Job Seeker"],
      required: true,
    },
  },
  { _id: false }
);

// Define the Employer sub-schema
const employerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Employer"],
      required: true,
    },
  },
  { _id: false }
);

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter your name"],
      minLength: [3, "Enter atleast 3 characters."],
      maxLength: [50, "Only 50 chaaracters are allowed."],
    },
    email: {
      type: String,
      validator: [validator.isEmail, "Enter a valid email"],
      required: [true, "Enter an email"],
    },
    coverLetter: {
      type: String,
      required: [true, "Provide cover letter with your application"],
      minlength: [10, "Cover letter should be at least 10 characters."],
      maxlength: [2000, "Cover letter cannot exceed 2000 characters."],
    },
    phone: {
      type: String,
      required: [true, "Enter phone number "],
      validate: {
        validator: function (v) {
          return /\d{10,15}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    address: {
      type: String,
      required: [true, "Enter your address"],
      minlength: [5, "Address should be at least 5 characters."],
      maxlength: [100, "Address cannot exceed 100 characters."],
    },
    resume: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
        validate: {
          validator: validator.isURL,
          message: "Enter a valid URL for the resume.",
        },
      },
    },
    applicantID: {
      type: applicantSchema,
      required: true,
    },
    employerID: {
      type: employerSchema,
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

applicationSchema.index({ "applicantID.user": 1 });
applicationSchema.index({ "employerID.user": 1 });
applicationSchema.index({ jobId: 1 });

applicationSchema.virtual("applicant", {
  ref: "User",
  localField: "applicantID.user",
  foreignField: "_id",
  justOne: true,
});

applicationSchema.virtual("employer", {
  ref: "User",
  localField: "employerID.user",
  foreignField: "_id",
  justOne: true,
});

applicationSchema.set("toObject", { virtuals: true });
applicationSchema.set("toJSON", { virtuals: true });

export const Application = mongoose.model("Application", applicationSchema);
