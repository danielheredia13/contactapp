import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    nombre: {
      type: String,
      required: true,
      unique: false,
    },
    telefono: {
      type: String,
    },
    correoElectronico: {
      type: String,
      unique: false,
    },
    direccion: {
      type: String,
    },
    empresa: {
      type: String,
    },
    comentario: {
      type: String,
    },
    grupo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
