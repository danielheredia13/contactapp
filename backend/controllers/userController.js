import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// desc Autorizacion de usuario y generacion de token
// route POST /api/users/login
// acceso Publico

const authUsers = asyncHandler(async (req, res) => {
  const { correoElectronico, password } = req.body;

  const user = await User.findOne({ correoElectronico: correoElectronico });

  const auth =
    user && user.password
      ? await bcrypt.compare(password, user.password)
      : false;

  if (user && auth) {
    res.json({
      _id: user._id,
      nombre: user.nombre,
      correoelectronico: user.correoElectronico,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Correo electronico o password invalidos");
  }
});

// desc obtener usuario login
// ruta GET /api/users/profile
// acceso Privado

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      nombre: user.nombre,
      correoElectronico: user.correoElectronico,
    });
  } else {
    res.status(404);
    throw new Error("Usuario no encontrado");
  }
});

// desc registro nuevo usuario
// ruta POST /api/users
// acceso Publico

const registerUser = asyncHandler(async (req, res) => {
  const { nombre, correoElectronico, password } = req.body;

  const userExist = await User.findOne({
    correoElectronico: correoElectronico,
  });

  if (userExist) {
    res.status(400);
    throw new Error("Usuario ya registrado");
  }

  const user = await User.create({
    nombre: nombre,
    correoElectronico: correoElectronico,
    password: bcrypt.hashSync(password, 10),
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      nombre: user.nombre,
      correoElectronico: user.correoElectronico,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Informacion del usuario invalida");
  }
});

// desc actualizar perfil del usuario
// ruta PUT /api/users/profile
// acceso Privado

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { nombre, correoElectronico, password } = await req.body;

  if (user) {
    user.nombre = nombre || user.nombre;
    user.correoElectronico = correoElectronico || user.correoElectronico;
    if (password) {
      user.password = bcrypt.hashSync(password, 10);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      nombre: updatedUser.nombre,
      correoElectronico: updatedUser.correoElectronico,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("Usuario no encontrado ");
  }
});

// desc Delete user
// ruta DELETE /api/users/:id
// acceso Privado

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const userId = user._id.toString();
  const userLoginId = req.user._id.toString();

  if (user && userId == userLoginId) {
    await User.deleteOne({ _id: userLoginId });

    res.json({ message: "Usuario borrado" });
  } else {
    res.status(404);
    throw new Error("Usuario no encontrado");
  }
});

export {
  authUsers,
  registerUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
};
