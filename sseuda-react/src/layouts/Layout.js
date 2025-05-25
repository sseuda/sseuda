import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Main from "../pages/Main";

function Layout() {
	return (
		<div>
			<Header />
			
				<Outlet/>
			
			<Footer />
		</div>
	);
}

export default Layout;