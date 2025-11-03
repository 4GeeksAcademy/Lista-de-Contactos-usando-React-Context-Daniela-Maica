import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const AddContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (id && store.contacts && store.contacts.length) {
      const existing = store.contacts.find((c) => String(c.id) === String(id));
      if (existing) {
        setForm({
          name: existing.name || "",
          email: existing.email || "",
          phone: existing.phone || "",
          address: existing.address || "",
        });
      }
    }
  }, [id, store.contacts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, address } = form;

    if (!name || !email || !phone || !address) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      if (id) {

        const resp = await fetch(
          `${store.apiUrl}/agendas/${store.agenda_slug}/contacts/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          }
        );

        if (!resp.ok) throw new Error("Error al actualizar contacto");
        const updated = await resp.json();
        dispatch({ type: "update_contact_local", payload: updated });
      } else {

        const resp = await fetch(
          `${store.apiUrl}/agendas/${store.agenda_slug}/contacts`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name.trim(),
              phone: phone.trim(),
              email: email.trim(),
              address: address.trim(),
            }),
          }
        );

        if (!resp.ok) throw new Error("Error al crear contacto");

        const created = await resp.json();

        if (created && created.id) {
          dispatch({ type: "add_contact_local", payload: created });
        } else {
          const reload = await fetch(
            `${store.apiUrl}/agendas/${store.agenda_slug}/contacts`
          );
          const data = await reload.json();
          dispatch({ type: "set_contacts", payload: data.contacts || data });
        }
      }

      navigate("/");
    } catch (err) {
      dispatch({ type: "set_error", payload: err.message });
      console.error(err);
      alert("Hubo un error al guardar el contacto: " + err.message);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-center mt-5 mb-0">Add a new contact</h1>
      </div>
      <div className="container-fluid p-5 pt-2">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fullname" className="form-label fw-semibold">
              Full Name
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label fw-semibold">
              Phone
            </label>
            <input
              required
              type="tel"
              id="phone"
              name="phone"
              className="form-control"
              placeholder="Enter Phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label fw-semibold">
              Address
            </label>
            <input
              required
              type="text"
              id="address"
              name="address"
              className="form-control"
              placeholder="Enter Address"
              value={form.address}
              onChange={handleChange}
            />
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </div>
          <p>
            <Link className="fw-bold" to="/">
              or get back to contacts
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default AddContact;