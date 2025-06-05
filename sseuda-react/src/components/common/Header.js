import HeaderCSS from "./Global/Header.module.css";
import ButtonCSS from "./Global/Button.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callLogoutAPI } from "../../apis/MemberAPICalls";
import { useNavigate } from 'react-router-dom';


function Header() {
	const dispatch = useDispatch();	
	const isLogin = !!localStorage.getItem('accessToken');
	const navigate = useNavigate();

	const handleLogout = async () => {
		const result = await dispatch(callLogoutAPI());
		if (result) {
			if (window.location.pathname !== `/`) {
				navigate(`/`);
			}
		}
		window.location.reload();
	};

	return (
		<div className={HeaderCSS.headerBox}>
			<div className={HeaderCSS.box}>
				<Link to={'/'} className={HeaderCSS.headerLogo}/>
				{!isLogin ? (
					<Link to="/auth/login" className={ButtonCSS.headerBTN}>로그인</Link>
				) : (
					<button
						type="button"
						className={ButtonCSS.headerBTN}
						onClick={handleLogout}
					>
						로그아웃
					</button>
				)}
			</div>			
		</div>
	);
}

export default Header;