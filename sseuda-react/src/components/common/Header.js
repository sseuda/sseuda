import HeaderCSS from "./Global/Header.module.css";
import GlobalCSS from "./Global/Global.module.css";
import ButtonCSS from "./Global/Button.module.css";


function Header() {

	return (
		<div className={HeaderCSS.headerBox}>
			<div className={HeaderCSS.box}>
				<div className={HeaderCSS.headerLogo}/>
				<button className={ButtonCSS.headerBTN}>수정하기</button>
			</div>			
		</div>
	);
}

export default Header;