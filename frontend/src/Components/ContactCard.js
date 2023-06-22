import React from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteContact } from "../features/contactDeleteSlice";
import { getContacts } from "../features/contactByUserSlice";

const ContactCard = ({ contact }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = contact._id;
  const nombre = contact.nombre;
  const telefono = contact.telefono;
  const correoElectronico = contact.correoElectronico;
  const direccion = contact.direccion;
  const empresa = contact.empresa;
  const comentario = contact.comentario;
  const grupo = contact.grupo;

  const updateBtnHandler = (id) => {
    navigate(`/contact/${id}`);
  };

  const deleteBtnHandler = async (id) => {
    await dispatch(deleteContact(id));
    dispatch(getContacts());
  };

  return (
    <Card className="contact-card">
      <Card.Body>
        <Card.Title>{nombre}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{telefono}</Card.Subtitle>
        <Card.Text>
          <p>{correoElectronico}</p>
          <p>{direccion}</p>
          <p>{empresa}</p>
          <p>{comentario}</p>
          <p>{grupo}</p>
        </Card.Text>
        <Button onClick={() => updateBtnHandler(id)} className="btn-sm rounded">
          <i className="fa-sharp fa-solid fa-pen"></i>
        </Button>

        <Button
          onClick={() => deleteBtnHandler(id)}
          className="btn-sm rounded btn-trash"
          variant="danger"
        >
          <i className="fa-solid fa-trash"></i>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ContactCard;
