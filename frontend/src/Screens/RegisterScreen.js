import React, { useState, useEffect } from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../features/userRegisterSlice";
import { login } from "../features/userLoginSlice";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [Message, setMessage] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;
  const userCorreoElectronico = userInfo.correoElectronico;

  useEffect(() => {
    if (userInfo && userInfo._id) {
      navigateHome();
    }
  }, [userInfo, navigate]);

  const navigateHome = () => {
    let correoElectronico = userCorreoElectronico;
    let password = loginPassword;

    dispatch(login({ correoElectronico, password }));

    navigate("/");
  };

  const submitHandler = (e) => {
    if (password !== ConfirmPassword) {
      setMessage("Password y confirmacion de password no son iguales");
    } else {
      dispatch(
        register({
          nombre,
          correoElectronico,
          password,
        })
      );
    }
    e.preventDefault();

    setLoginPassword(password);
    setNombre("");
    setCorreoElectronico("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Container className="login-container">
      <h2 className="mt-4">Registro</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="nombre">
          <Form.Label className="mb-1 mt-2">Nombre</Form.Label>
          <Form.Control
            className="rounded"
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label className="mb-1 mt-2">Correo Electronico</Form.Label>
          <Form.Control
            className="rounded"
            type="email"
            placeholder="Correo Electronico"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label className="mb-1 mt-2">Pasword</Form.Label>
          <Form.Control
            className="rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="Confirmpassword">
          <Form.Label className="mb-1 mt-2">Confirmar Pasword</Form.Label>
          <Form.Control
            className="rounded"
            type="password"
            placeholder="Confirmar Password"
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="my-3 rounded" variant="primary">
          Registrarme
        </Button>
      </Form>
      <Row>
        <Col>
          Ya estas registrado ? <Link to="/login">Inicia Sesion</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;
