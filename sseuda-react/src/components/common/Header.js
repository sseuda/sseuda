import HeaderCSS from "./Global/Header.module.css";
import ButtonCSS from "./Global/Button.module.css";
import { Link } from "react-router-dom";


function Header() {

	return (
		<div className={HeaderCSS.headerBox}>
			<div className={HeaderCSS.box}>
				<Link to={'/'} className={HeaderCSS.headerLogo}/>
				<Link to={'auth/login'} className={ButtonCSS.headerBTN}>로그인</Link>
			</div>			
		</div>
	);
}

export default Header;