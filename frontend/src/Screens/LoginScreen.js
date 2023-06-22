import React, { useState, useEffect } from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/userLoginSlice";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [correoElectronico, setCorreoElectronico] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.nombre) {
      navigate("/");
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    dispatch(login({ correoElectronico, password }));

    e.preventDefault();

    setCorreoElectronico("");
    setPassword("");
  };

  return (
    <Container className="login-container">
      <h2 className="mt-4">Iniciar Sesion</h2>
      <Form onSubmit={submitHandler}>
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
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="my-3 rounded" variant="primary">
          Iniciar Sesion
        </Button>
      </Form>
      <Row>
        <Col>
          Cliente Nuevo ? <Link to="/register">Registrate</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
