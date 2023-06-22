import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { details } from "../features/userDetailsSlice";
import { update } from "../features/userUpdateSlice";
import { deleteUser } from "../features/userDeleteSlice";
import { logout } from "../features/userLoginSlice";
import { reset } from "../features/userDetailsSlice";
import { registerReset } from "../features/userRegisterSlice";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { userInfo: user } = userDetails;

  const userDelete = useSelector((state) => state.userDelete);
  const { success } = userDelete;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (user === null) {
        dispatch(details());
      } else if (user && user.nombre) {
        setNombre(user.nombre);
        setCorreoElectronico(user.correoElectronico);
      }
    }
  }, [userInfo, user, dispatch, navigate]);

  const submitHandler = (e) => {
    if (password === confirmPassword) {
      dispatch(
        update({
          nombre,
          correoElectronico,
          password,
        })
      );
      e.preventDefault();
      dispatch(details());
      setPassword("");
      setConfirmPassword("");
    }
  };

  const deleteAcount = () => {
    dispatch(deleteUser());
    dispatch(logout());
    dispatch(reset());
    dispatch(registerReset());
    navigate("/");
  };

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Button onClick={() => navigate("/")} className="mt-3 rounded">
            Atras
          </Button>
          <h2 className="mt-3">Perfil</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
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
            <Form.Group controlId="confirmPassword">
              <Form.Label className="mb-1 mt-2">Confirmar Pasword</Form.Label>
              <Form.Control
                className="rounded"
                type="password"
                placeholder="Confirmar Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" className="my-3 rounded" variant="primary">
              Actualizar
            </Button>
          </Form>
          <Button
            onClick={deleteAcount}
            className="my-3 rounded"
            variant="danger"
          >
            Eliminar Cuenta
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
