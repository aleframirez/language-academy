const { Schema, model } = require("mongoose");

/**
 *       User Schema
 *
 * - Name ( user name )
 * - Username ( alias )
 * - Email
 * - Password
 * - img ( profile img )
 * - Role ( Admin, instructor, student )
 * - Status ( active, inactive )
 * - Google ( connected with google )
 * - Badges ( Obtained by the student )
 * - achievements ( Obtained by the student )
 * - Payment History
 *
 */

const UserSchema = Schema(
  {
    name: {
      type: String,
      require: [true, "Name is Required"],
      trim: true,
    },
    username: {
      type: String,
      require: [true, "Username is Required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      require: [true, "Email is Required"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Password is required"],
    },
    img: {
      type: String,
    },
    role: {
      type: String,
      require: true,
      default: "STUDENT_ROLE",
      enum: ["ADMIN_ROLE", "STUDENT_ROLE", "INSTRUCTOR_ROLE"],
    },
    status: {
      type: Boolean,
      default: true,
    },
    google: {
      type: Boolean,
      default: false,
    },
    //  achievements: [
    //    {
    //      type: Schema.Types.ObjectId,
    //      ref: "Achievements",
    //    },
    //  ],
    //  badges: [
    //    {
    //      type: Schema.Types.ObjectId,
    //      ref: "Badges",
    //    },
    //  ],
    //  paymentHistory: [
    //    {
    //      type: Schema.Types.ObjectId,
    //      ref: "PaymentHistory",
    //    },
    //  ],
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("User", UserSchema);
