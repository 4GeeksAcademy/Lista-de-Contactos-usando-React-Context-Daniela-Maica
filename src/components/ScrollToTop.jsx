import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// This component forces the page to scroll to top every time the route changes.
const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation(); // ✅ obtiene la ruta actual
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      window.scrollTo(0, 0);
      prevPathname.current = pathname;
    }
  }, [pathname]);

  return children;
};

ScrollToTop.propTypes = {
  children: PropTypes.any,
};

export default ScrollToTop;
