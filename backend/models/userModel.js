import crypto from "crypto";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    required: [true, "Please put name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      //NOTE: only in create and save
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords do not match",
    },
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
<<<<<<< HEAD
=======
  rating: {
    type: Array,
    default: "",
  },
>>>>>>> 47875cd35ed09c27382313c30aa5f27652654807
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  savedPets: [{ type: mongoose.Schema.ObjectId, ref: "Pet", unique: true }],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

<<<<<<< HEAD
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
=======
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
>>>>>>> 47875cd35ed09c27382313c30aa5f27652654807
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
<<<<<<< HEAD
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
=======
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
>>>>>>> 47875cd35ed09c27382313c30aa5f27652654807
    return JWTTimestamp < changedTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

<<<<<<< HEAD
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
=======
  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
>>>>>>> 47875cd35ed09c27382313c30aa5f27652654807

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
