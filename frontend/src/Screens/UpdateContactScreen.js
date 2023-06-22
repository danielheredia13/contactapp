import React, { useState, useEffect } from "react";
import { InputGroup, Form, Card, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateContact } from "../features/contactUpdateSlice";
import { getContactById } from "../features/contactByIdSlice";
import { getContacts } from "../features/contactByUserSlice";

const UpdateContactScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [direccion, setDireccion] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [comentario, setComentario] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const contactById = useSelector((state) => state.contactById);
  const { contact } = contactById;

  useEffect(() => {
    if (contact && contact.nombre) {
      setNombre(contact.nombre);
      setTelefono(contact.telefono);
      setCorreoElectronico(contact.correoElectronico);
      setDireccion(contact.direccion);
      setEmpresa(contact.empresa);
      setComentario(contact.comentario);
      setSelectedOption(contact.selectedOption);
    }

    if (contact && contact._id !== id) {
      dispatch(getContactById(id));
    }
  }, [contact, dispatch]);

  const UpdateContactHandler = async () => {
    await dispatch(
      updateContact({
        _id: contact._id,
        nombre: nombre,
        telefono: telefono,
        correoElectronico: correoElectronico,
        direccion: direccion,
        empresa: empresa,
        comentario: comentario,
        grupo: selectedOption,
      })
    );

    dispatch(getContacts());
    navigate("/");
  };

  return (
    <Container>
      <Button onClick={() => navigate("/")} className="mt-3 rounded">
        Atras
      </Button>
      <Card className="p-3 card-add">
        <h4>Actualizar Contacto</h4>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Nombre</InputGroup.Text>
          <Form.Control
            placeholder=""
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Telefono</InputGroup.Text>
          <Form.Control
            placeholder=""
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            Correo Electronico
          </InputGroup.Text>
          <Form.Control
            placeholder=""
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Direccion</InputGroup.Text>
          <Form.Control
            placeholder=""
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Empresa</InputGroup.Text>
          <Form.Control
            placeholder=""
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Comentario</InputGroup.Text>
          <Form.Control
            as="textarea"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />
        </InputGroup>
        <Form>
          <div key={`inline-radio`} className="mb-3 mt-3">
            <Form.Check
              inline
              label="Personal"
              name="group1"
              type="radio"
              id={`inline-radio-1`}
              value="Personal"
              onChange={(e) => setSelectedOption(e.target.value)}
              checked={selectedOption === "personal"}
            />
            <Form.Check
              inline
              label="Trabajo"
              name="group1"
              type="radio"
              id={`inline-radio-2`}
              value="Trabajo"
              onChange={(e) => setSelectedOption(e.target.value)}
              checked={selectedOption === "trabajo"}
            />
            <Form.Check
              inline
              label="Otro"
              name="group1"
              type="radio"
              id={`inline-radio-3`}
              value="Otro"
              onChange={(e) => setSelectedOption(e.target.value)}
              checked={selectedOption === "otro"}
            />
          </div>
        </Form>
        <Button className="btn-add rounded" onClick={UpdateContactHandler}>
          Actualizar Contacto
        </Button>
      </Card>
    </Container>
  );
};

export default UpdateContactScreen;
