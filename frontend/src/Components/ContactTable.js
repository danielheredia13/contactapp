import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getContacts } from "../features/contactByUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../features/contactDeleteSlice";

const ContactTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const contactByUser = useSelector((state) => state.contactByUser);
  const { contactList, fetched } = contactByUser;

  useEffect(() => {
    if (!fetched) {
      dispatch(getContacts());
    }
  }, [dispatch, fetched]);

  const updateBtnHandler = (id) => {
    navigate(`/contact/${id}`);
  };

  const deleteBtnHandler = async (id) => {
    await dispatch(deleteContact(id));
    dispatch(getContacts());
  };

  return (
    <div className="custom-table">
      <Table bordered hover responsive className="table-sm mt-3 mb-5">
        <thead className="top-letf">
          <tr className="top-letf">
            <th className="top-letf">Nombre</th>
            <th>Telefono</th>
            <th>Correo Electronico</th>
            <th>Direccion</th>
            <th>Empresa</th>
            <th>Grupo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contactList &&
            contactList.length > 0 &&
            contactList.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.nombre}</td>
                <td>{contact.telefono}</td>
                <td>{contact.correoElectronico}</td>
                <td>{contact.direccion}</td>
                <td>{contact.empresa}</td>
                <td>{contact.grupo}</td>
                <td>
                  <Button
                    onClick={() => updateBtnHandler(contact._id)}
                    className="btn-sm rounded"
                  >
                    <i className="fa-sharp fa-solid fa-pen"></i>
                  </Button>

                  <Button
                    onClick={() => deleteBtnHandler(contact._id)}
                    className="btn-sm rounded btn-trash"
                    variant="danger"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ContactTable;
