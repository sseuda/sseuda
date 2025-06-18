import { Navigate, Outlet } from "react-router-dom";
import { decodeJwt } from "../../../utils/tokenUtils";
import { useEffect, useState } from "react";

const AdminRoute = () => {
	const accessToken = localStorage.getItem("accessToken");
	const decodedToken = accessToken ? decodeJwt(accessToken) : null;

	const isTokenExpired = (token) => {
		if (!token) return true;
		const currentTime = Math.floor(Date.now() / 1000);
		return token.exp < currentTime;
	};

	const isLogin = accessToken && decodedToken && !isTokenExpired(decodedToken);
	const isAdmin = decodedToken?.auth === "ADMIN" || decodedToken?.auth === "SUPER";

	const [showRedirect, setShowRedirect] = useState(false);

	useEffect(() => {
		if (!isAdmin || !isLogin) {
			console.log("관리자 권한 없음 - alert 실행");
			alert("페이지 권한이 없습니다. 메인 화면으로 이동합니다 :-)");
			setShowRedirect(true);
		}
		}, [isAdmin, isLogin]);

		if (showRedirect) {
		return <Navigate to="/" replace />;
		}

		return isLogin && isAdmin ? <Outlet /> : null;
	};
	
export default AdminRoute;