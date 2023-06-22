import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import ContactTable from "../Components/ContactTable";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import { useNavigate } from "react-router-dom";
import ContactCard from "../Components/ContactCard";
import { getContacts } from "../features/contactByUserSlice";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState(false);
  const contactByUser = useSelector((state) => state.contactByUser);
  const { contactList } = contactByUser;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const text = "Iniciar Sesion o Registrarse para crear nuevos contactos";
  const [contactDisplayToggle, setContactDisplayToggle] = useState(true);

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  const toggleHandler = (e) => {
    if (userInfo) {
      navigate("/contact");
    } else {
      setLoginError(true);
    }
  };

  const loginErrorReset = () => {
    setLoginError(false);
  };

  const contactDisplayToggleCardsHandler = () => {
    setContactDisplayToggle(true);
  };

  const contactDisplayToggleTableHandler = () => {
    setContactDisplayToggle(false);
  };

  return (
    <Container className="home">
      <Button
        onClick={toggleHandler}
        variant="outline-primary"
        className="my-4 btn-add"
      >
        <i className="fa-solid fa-plus"></i>
      </Button>
      {loginError && (
        <Message
          loginErrorReset={loginErrorReset}
          variant="danger"
          text={text}
        />
      )}
      <Container>
        <Button
          className="btn-contact-display"
          onClick={contactDisplayToggleCardsHandler}
        >
          Tarjeta
        </Button>
        <Button
          className="btn-contact-display"
          onClick={contactDisplayToggleTableHandler}
        >
          Tabla
        </Button>
      </Container>
      {contactDisplayToggle ? (
        <Container className="contact-card-box mt-3">
          {contactList &&
            contactList.length > 0 &&
            contactList.map((contact) => {
              return <ContactCard key={contact._id} contact={contact} />;
            })}
        </Container>
      ) : (
        <Container>{userInfo && userInfo.nombre && <ContactTable />}</Container>
      )}
    </Container>
  );
};

export default HomeScreen;
