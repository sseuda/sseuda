import HeaderCSS from "./Global/Header.module.css";
import ButtonCSS from "./Global/Button.module.css";
import { Link } from "react-router-dom";


function Header() {

	return (
		<div className={HeaderCSS.headerBox}>
			<div className={HeaderCSS.box}>
				<Link to={'/'} className={HeaderCSS.headerLogo}/>
				<button className={ButtonCSS.headerBTN}>로그인</button>
			</div>			
		</div>
	);
}

export default Header;