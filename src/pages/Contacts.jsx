import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactCard from "../components/ContactCard.jsx";
import { Link } from "react-router-dom";

const Contacts = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const loadContacts = async () => {
      dispatch({ type: "set_loading" });
      try {
        const resp = await fetch(
          `${store.apiUrl}/agendas/${store.agenda_slug}/contacts`
        );
        if (!resp.ok) throw new Error("Error al cargar contactos desde la API");
        const data = await resp.json();
        dispatch({ type: "set_contacts", payload: data.contacts || data });
      } catch (err) {
        dispatch({ type: "set_error", payload: err.message });
        console.error(err);
      }
    };

    loadContacts();
  }, [dispatch, store.apiUrl, store.agenda_slug]);

  if (store.loading) {
    return <div className="text-center my-5">Cargando contactos...</div>;
  }
  
  if (store.error) {
    return <div className="text-center text-danger my-5">{store.error}</div>;
  }

  return (
    <>
      <div className="d-flex justify-content-end">
        <Link to="/addcontact">
          <button className="btn btn-success btn-lg my-3 mx-5 me-4">
            Add new contact
          </button>
        </Link>
      </div>

      {store.contacts.length === 0 ? (
        <div className="text-center my-5">
          No hay contactos. Agrega uno nuevo.
        </div>
      ) : (
        <div className="container-fluid ps-4">
          {store.contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      )}
    </>
  );
};

export default Contacts;