import React from "react";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ contact, onDelete }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="card mx-3">
                <div className="row g-0">
                    <div className="col-md-2 center-image">
                        <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(contact.full_name || "No Name")}`}
                            alt={contact.full_name}
                            className="img-fluid my-2 circle_img d-block" />
                    </div>

                    <div className="col-md-4">
                        <div className="card-body p-2">
                            <h2 className="card-title mb-3">{contact.full_name}</h2>
                            <p className="icon-grey">
                                <i className="fa-solid fa-location-dot"></i>
                                {contact.address}
                            </p>
                            <p className="icon-grey">
                                <i className="fa-solid fa-phone-flip"></i>
                                {contact.phone}
                            </p>
                            <p className="icon-grey">
                                <i className="fa-solid fa-envelope"></i>
                                {contact.email}
                            </p>
                        </div>
                    </div>
                    <div className="col-md-5 ">
                        <div className="row d-flex justify-content-end">
                            <div className="col-auto  mx-1 my-4">
                                <i className="fa-solid fa-pencil" onClick={() => navigate(`/edit/${contact.id}`)}></i>
                            </div>
                            <div className="col-auto mx-2 my-4">
                                <i className="fa-solid fa-trash-can" onClick={() => onDelete(contact.id)}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ContactCard;