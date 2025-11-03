export const initialStore = () => {
  return {
  apiUrl: "https://playground.4geeks.com/contact",
  agenda_slug: "ajsb",
  contacts: [],
  loading: false,
  error: null
};
};

export default function storeReducer (state, action) {
  switch (action.type) {
    case "set_contacts":
      return {
        ...state,
        contacts: action.payload,
        loading: false,  
        error: null      
      };

    case "add_contact_local":
        return {
            ...state,
            contacts: [...state.contacts, action.payload],
            loading: false
        };

    case "update_contact_local":
        return {
            ...state,
            contacts: state.contacts.map(c =>
                c.id === action.payload.id ? action.payload : c
            )
        };

    case "delete_contact_local":
        return {
        ...state,
        contacts: state.contacts.filter(c => c.id !== action.payload)
        };

    case "set_loading":
        return{
            ...state,
            loading: true,
            error: null
        };

    case "set_error":
        return {
            ...state,
            loading: false,
            error: action.payload
        };
        default:
            return state;
  }
}