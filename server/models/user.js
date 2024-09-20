import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name."],
      minLength: [3, "Enter atleast 3 characters."],
      maxLength: [30, "Only 30 chaaracters are allowed."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email."],
      validate: [validator.isEmail, "Enter a valid email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Please provide a Phone Number."],
      validate: {
        validator: function (v) {
          return /^\+?[1-9]\d{1,14}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
      minLength: [8, "Enter atleast 8 characters."],
      maxLength: [32, "Only 32 chaaracters are allowed."],
      select: false,
      validate: {
        validator: function (v) {
          // Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,32}$/.test(
            v
          );
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      },
    },
    role: {
      type: String,
      required: [true, "Please provide your role."],
      enum: ["Job Seeker", "Employer"],
    },
  },
  {
    timestamps: true,
  }
);

//Encrypting the password

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//comparing password

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Generating JWT

userSchema.methods.getJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};

export const User = mongoose.model("User", userSchema);
