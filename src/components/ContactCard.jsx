import React from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const ContactCard = ({ contact }) => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este contacto?");
    if (!confirm) return;

    try {

      const resp = await fetch(
        `${store.apiUrl}/agendas/${store.agenda_slug}/contacts/${id}`,
        { method: "DELETE" }
      );
      
      if (!resp.ok) throw new Error("Error al eliminar contacto");
      
      dispatch({ type: "delete_contact_local", payload: id });
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el contacto: " + err.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/addcontact/${id}`);
  };

  if (!contact) return null;

  return (
    <>
      <div className="card mx-4 ">
        <div className="row g-0 ">
          <div className="col-md-3 center-image">
            <img
              src={contact.img || "https://randomuser.me/api/portraits/women/63.jpg"}
              alt="Avatar"
              className="img-fluid my-2 circle_img d-block"
            />
          </div>

          <div className="col-md-6">
            <div className="card-body p-2">
              <h2 className="card-title mb-1">{contact.name}</h2>
              <p className="icon-grey mb-1">
                <i className="fa-solid fa-location-dot"></i> {contact.address}
              </p>

              <p className="icon-grey mb-1">
                <i className="fa-solid fa-phone-flip"></i> {contact.phone}
              </p>

              <p className="icon-grey mb-1">
                <i className="fa-solid fa-envelope"></i> {contact.email}
              </p>
            </div>
          </div>
          <div className="col-md-2">
            <div className="row d-flex justify-content-end pe-3">
              <div className="col-auto mx-1 my-4">
                <button className="btn btn-link" onClick={() => handleEdit(contact.id)}>
                  <i className="fa-solid fa-pencil icon-black"></i>
                </button>
              </div>
              <div className="col-auto mx-2 my-4">
                <button className="btn btn-link " onClick={() => handleDelete(contact.id)}>
                  <i className="fa-solid fa-trash-can icon-black"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactCard;