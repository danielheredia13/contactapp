import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    correoElectronico: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
