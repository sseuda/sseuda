import HeaderCSS from "./Global/Header.module.css";
import ButtonCSS from "./Global/Button.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callLogoutAPI } from "../../apis/MemberAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";
import { useState } from "react";
import Alarm from "../../pages/alarm/Alarm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserShield, faRightToBracket, faRightFromBracket, faBold } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from "react";
import { callAlarmApi } from "../../apis/AlarmAPICalls";
import useLoginInfo from "../../hooks/useLoginInfo";

function Header() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const accessToken = localStorage.getItem('accessToken');
	const decodedToken = accessToken ? decodeJwt(accessToken) : null;

	// 알람관련
	const alarms = useSelector(state => state.alarmReducer);
	const unreadCount = alarms.filter(alarm => alarm.alarmCheck === 'N').length;
	const [showAlarm, setShowAlarm] = useState(false);
	const { loginUserId, loading } = useLoginInfo();

    useEffect(() => {
        if (!loading && loginUserId) {
        dispatch(callAlarmApi(loginUserId));
        }
    }, [loading, loginUserId, dispatch]);

	const handleAlarmClick = () => {
	setShowAlarm(!showAlarm);
	};

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

	// 내 블로그 버튼 관련
	const username = isLogin ? decodedToken.sub : null;

	const userMyPageList = () => {
		if (username) {
			navigate(`/mypage/${username}`, {replace:false});
		} else {
			alert("로그인이 필요합니다.");
			navigate("/auth/login");
			}
		}

	return (
		<div className={HeaderCSS.headerBox}>
			<div className={HeaderCSS.box}>
				<Link to='/' className={HeaderCSS.headerLogo} />

				{/* 오른쪽 아이콘 모음 */}
				<div className={HeaderCSS.rightControls}>
					{/* 관리자 아이콘 */}
					{isLogin && (decodedToken?.auth === "ADMIN" || decodedToken?.auth === "SUPER") && (
						<Link to="/admin/members" className={HeaderCSS.iconButton} title="관리자 페이지">
							<FontAwesomeIcon icon={faUserShield} />
						</Link>
					)}

					{/* 내블로그 바로가기 아이콘 */}
					{isLogin && (
						<button className={HeaderCSS.iconButton} onClick={userMyPageList} title="내 블로그">
							<FontAwesomeIcon icon={faBold} />
						</button>
					)}

					{/* 알림 아이콘 */}
					{isLogin && (
						<div className={HeaderCSS.iconButton} onClick={handleAlarmClick} title="알림">
							<FontAwesomeIcon icon={faBell} className={HeaderCSS.alarmIcon} />
							{unreadCount > 0 && (
								<span className={HeaderCSS.alarmBadge}>{unreadCount}</span>
							)}
						</div>
					)}

					{/* 로그인 / 로그아웃 */}
					{!isLogin ? (
						<Link to="/auth/login" className={HeaderCSS.iconButton} title="로그인">
							<FontAwesomeIcon icon={faRightToBracket} />
						</Link>
					) : (
						<button type="button" className={HeaderCSS.iconButton} onClick={handleLogout} title="로그아웃">
							<FontAwesomeIcon icon={faRightFromBracket} />
						</button>
					)}
				</div>
			</div>

			{/* 알림 모달 */}
			{showAlarm && <Alarm onClose={() => setShowAlarm(false)} />}
		</div>
			);
}

export default Header;