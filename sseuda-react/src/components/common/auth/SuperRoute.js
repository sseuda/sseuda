import { Navigate, Outlet } from "react-router-dom";
import { decodeJwt } from "../../../utils/tokenUtils";
import { useEffect, useState } from "react";

const SuperRoute = () => {
	const accessToken = localStorage.getItem("accessToken");
	const decodedToken = accessToken ? decodeJwt(accessToken) : null;

	const isTokenExpired = (token) => {
		if (!token) return true;
		const currentTime = Math.floor(Date.now() / 1000);
		return token.exp < currentTime;
	};

	const isLogin = accessToken && decodedToken && !isTokenExpired(decodedToken);
	const isSuper = decodedToken?.auth === "SUPER";

	const [showRedirect, setShowRedirect] = useState(false);

	useEffect(() => {
		if (!isSuper || !isLogin) {
			alert("SUPER 권한이 없습니다. 메인 화면으로 이동합니다 :-)");
			setShowRedirect(true);
		}
	}, [isSuper, isLogin]);

	if (showRedirect) {
		return <Navigate to="/" replace />;
	}

	return isLogin && isSuper ? <Outlet /> : null;
};

export default SuperRoute;