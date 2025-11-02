export const initialStore = () => {
  return {
    message: null,
    apiUrl: "https://playground.4geeks.com/contact", // API base
    agenda_slug: "mi_agenda_personal", // cámbialo si usas otro nombre
    contacts: [] // lista vacía al iniciar
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case "set_contacts":
      return { ...store, contacts: action.payload };

    case "add_contact_local":
      return { ...store, contacts: [...store.contacts, action.payload] };

    case "update_contact_local":
      return {
        ...store,
        contacts: store.contacts.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };

    case "delete_contact_local":
      return {
        ...store,
        contacts: store.contacts.filter((c) => c.id !== action.payload),
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
