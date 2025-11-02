import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop"

const Layout = () => {
    return (
        <ScrollToTop>
            <Outlet />
        </ScrollToTop>
    );
};

export default Layout;