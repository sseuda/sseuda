import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Main from "../pages/Main";

function Layout() {
	return (
		<div>
			<Header />
			<div>
				<Outlet/>
			</div>
			<Footer />
		</div>
	);
}

export default Layout;