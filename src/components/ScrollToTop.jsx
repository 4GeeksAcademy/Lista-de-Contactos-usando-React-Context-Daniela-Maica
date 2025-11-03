import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

// Este componente permite que el scroll vaya al principio cuando se cambia de vista,
// de lo contrario, permanecería en la posición de la vista anterior. 
// Investigar más sobre este comportamiento de React :D 

const ScrollToTop = ({ children }) => {
    const location = useLocation(); 
    const prevLocation = useRef(location);

    useEffect(() => {
        if (location.pathname !== prevLocation.current.pathname) {
            window.scrollTo(0, 0);
        }
        prevLocation.current = location;
    }, [location]);

    return children;
};

export default ScrollToTop;

ScrollToTop.propTypes = {
    children: PropTypes.node.isRequired 
};
