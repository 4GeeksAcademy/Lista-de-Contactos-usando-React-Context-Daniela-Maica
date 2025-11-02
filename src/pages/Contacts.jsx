import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactCard from "../components/ContactCard.jsx"
import { useNavigate } from "react-router-dom";


export const Contacts = () => {
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	const loadContacts = async () => {
		try {
			const resp = await fetch(`${store.apiUrl}/agendas/${store.agenda_slug}/contacts`);
			if (!resp.ok) throw new Error("Failed to load contacts");
			const data = await resp.json();
			dispatch({ type: "set_contacts", payload: data });
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		loadContacts();
	}, []);

	const handleDelete = async (id) => {
		if (!confirm("¿Eliminar este contacto?")) return;
		try {
			const resp = await fetch(`${store.apiUrl}/contacts/${id}`, { method: "DELETE" });
			if (!resp.ok) throw new Error("Delete failed");
			dispatch({ type: "delete_contact_local", payload: id });
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<div className="d-flex justify-content-end">
				<button
					className="btn btn-success  btn-lg my-3 mx-5 me-4 "
					onClick={() => navigate("/add")}
				>
					Add new contact
				</button>
			</div>
			<div className="container-fluid ps-4">
				{(!store.contacts || store.contacts.length === 0) ? (
					<p>No contacts yet...</p>
				) : (
					store.contacts.map((c) => <ContactCard key={c.id} contact={c} onDelete={handleDelete} />)
				)}
			</div>
		</>
	);
}; 