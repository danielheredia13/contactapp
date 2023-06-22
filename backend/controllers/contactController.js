import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";

// desc Crear nuevo contacto
// ruta POST /api/contact
// acceso Publico

const createContact = asyncHandler(async (req, res) => {
  const user = req.user;
  const {
    nombre,
    telefono,
    correoElectronico,
    direccion,
    empresa,
    comentario,
    grupo,
  } = req.body;

  const contactExist = await Contact.findOne({ nombre: nombre });

  if (contactExist) {
    res.status(404);
    throw new Error("Nombre ya existe");
  }

  const contact = await Contact.create({
    user: user._id,
    nombre: nombre,
    telefono: telefono,
    correoElectronico: correoElectronico,
    direccion: direccion,
    empresa: empresa,
    comentario: comentario,
    grupo: grupo,
  });

  if (contact) {
    res.status(201).json({
      _id: contact._id,
      user: contact.user,
      nombre: contact.nombre,
      telefono: contact.telefono,
      correoElectronico: contact.correoElectronico,
      direccion: contact.direccion,
      empresa: contact.empresa,
      comentario: contact.comentario,
      grupo: contact.grupo,
    });
  } else {
    res.status(400);
    throw new Error("Informacion del contacto no es valida");
  }
});

// desc Obtener contactos del usuario
// ruta GET /api/contact/user/:id
// acceso Privado

const getContacts = asyncHandler(async (req, res) => {
  const user = req.user;

  const contactList = await Contact.find({ user: user._id });

  if (contactList) {
    res.json(contactList);
  } else {
    res.status(404);
    throw new Error("Usuario no tiene contactos");
  }
});

// desc obtener contacto por id
// ruta GET /api/contact/:id
// acceso Privado

const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404);
    throw new Error("Contacto no encontrado");
  }
});

// desc actualizar contacto del usuario
// ruta PUT /api/contact/:id
// acceso Privado

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  const {
    nombre,
    telefono,
    correoElectronico,
    direccion,
    empresa,
    comentario,
    grupo,
  } = await req.body;

  if (contact) {
    contact.nombre = nombre || contact.nombre;
    contact.telefono = telefono || contact.telefono;
    contact.correoElectronico = correoElectronico || contact.correoElectronico;
    contact.direccion = direccion || contact.direccion;
    contact.empresa = empresa || contact.empresa;
    contact.comentario = comentario || contact.comentario;
    contact.grupo = grupo || contact.grupo;

    const updatedContact = await contact.save();

    res.json(updatedContact);
  } else {
    res.status(404);
    throw new Error("Contacto no encontrado ");
  }
});

// desc Delete contact
// ruta DELETE /api/contact/:id
// acceso Privado

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (contact) {
    await Contact.deleteOne({ _id: req.params.id });

    res.json({ message: "Contacto borrado" });
  } else {
    res.status(404);
    throw new Error("Contacto no encontrado");
  }
});

export {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
};
