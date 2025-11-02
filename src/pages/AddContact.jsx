import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate, useParams } from "react-router-dom"

const AddContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: "",
        agenda_slug: store.agenda_slug
    });

    useEffect(() => {
        if (id && store.contacts && store.contacts.length) {
            const existing = store.contacts.find(c => String(c.id) === String(id));
            if (existing) setForm(existing);
        }
    }, [id, store.contacts]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                const resp = await fetch(`${store.apiUrl}/contacts/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form)
                });
                if (!resp.ok) throw new Error("Update failed");
                const updated = await resp.json();
                dispatch({ type: "update_contact_local", payload: updated });
            } else {
                const resp = await fetch(`${store.apiUrl}/agendas/${store.agenda_slug}/contacts`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form)
                });
                if (!resp.ok) throw new Error("Create failed");
                const created = await resp.json();
                if (created && created.id) {
                    dispatch({ type: "add_contact_local", payload: created });
                } else {
                    const reload = await fetch(`${store.apiUrl}/agendas/${store.agenda_slug}/contacts`);
                    const data = await reload.json();
                    dispatch({ type: "set_contacts", payload: data });
                }
            }
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Hubo un error al guardar el contacto.");
        }
    };

    return (
        <>
            <div>
                <h1 className="text-center mt-5 mb-0">
                    Add a new contact
                </h1>
            </div>
            <div className="container-fluid p-5 pt-2">
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <label
                            htmlFor="fullname"
                            className="form-label fw-semibold"
                        >
                            Full Name
                        </label>
                        <input
                            required
                            type="text"
                            id="fullname"
                            name="full_name"
                            className="form-control"
                            placeholder="Full Name"
                            value={form.full_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="email"
                            className="form-label fw-semibold"
                        >
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
                        <label
                            htmlFor="phone"
                            className="form-label fw-semibold"
                        >
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
                            pattern="[0-9+ -()]{7,20}"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="address"
                            className="form-label fw-semibold"
                        >
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
                        <button className="btn btn-primary" type="submit">Save</button>
                    </div>
                    <p>
                        <Link
                            className="fw-bold"
                            to="/">
                            or get back to contacts
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default AddContact;