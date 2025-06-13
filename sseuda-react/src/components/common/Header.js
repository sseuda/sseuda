import HeaderCSS from "./Global/Header.module.css";
import ButtonCSS from "./Global/Button.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { callLogoutAPI } from "../../apis/MemberAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";

function Header() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const accessToken = localStorage.getItem('accessToken');
	const decodedToken = accessToken ? decodeJwt(accessToken) : null;

	const isTokenExpired = (decodedToken) => {
		if (!decodedToken) return true;
		const currentTime = Math.floor(Date.now() / 1000);
		return decodedToken.exp < currentTime;
	};

	const isLogin = accessToken && decodedToken && !isTokenExpired(decodedToken);

	const handleLogout = async () => {
		if (!isLogin) {
			alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
			navigate("/auth/login");
			return;
		}

		const result = await dispatch(callLogoutAPI());
		if (result) {
			if (window.location.pathname !== '/') {
				navigate('/');
			} else {
				window.location.reload();
			}
		}
	};

	return (
		<div className={HeaderCSS.headerBox}>
			<div className={HeaderCSS.box}>
				<Link to='/' className={HeaderCSS.headerLogo} />
				<Link to={"/admin"}>관리자 페이지 가기</Link>
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