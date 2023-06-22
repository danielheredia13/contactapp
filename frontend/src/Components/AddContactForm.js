import React, { useState } from "react";
import { InputGroup, Form, Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addContact } from "../features/contactAddSlice";
import { getContacts } from "../features/contactByUserSlice";

const AddContactForm = () => {
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [direccion, setDireccion] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [comentario, setComentario] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const addContactHandler = async () => {
    await dispatch(
      addContact({
        nombre: nombre,
        telefono: telefono,
        correoElectronico: correoElectronico,
        direccion: direccion,
        empresa: empresa,
        comentario: comentario,
        grupo: selectedOption,
      })
    );
    setNombre("");
    setTelefono("");
    setCorreoElectronico("");
    setDireccion("");
    setEmpresa("");
    setComentario("");
    setSelectedOption("");
    dispatch(getContacts());
  };

  return (
    <Card className="p-3 card-add">
      <h4>Nuevo Contacto</h4>
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
        <InputGroup.Text id="basic-addon1">Correo Electronico</InputGroup.Text>
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
      <Button className="btn-add rounded" onClick={addContactHandler}>
        Agregar Contacto
      </Button>
    </Card>
  );
};

export default AddContactForm;
