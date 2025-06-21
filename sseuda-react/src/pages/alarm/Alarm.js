import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAlarmApi } from "../../apis/AlarmAPICalls";
import useLoginInfo from "../../hooks/useLoginInfo"
import alarmReducer from "../../modules/AlarmModule";
import './Alarm.css'; 

function Alarm({ onClose }) {
	const dispatch = useDispatch();
    const alarms = useSelector(state => state.alarmReducer);
    const { loginUserId, loading } = useLoginInfo();

    useEffect(() => {
        if (!loading && loginUserId) {
            dispatch(callAlarmApi(loginUserId));
        }
    }, [loading, loginUserId, dispatch]);

	console.log("loading: ", loading);
	console.log("loginUserId: ", loginUserId);
	console.log("[알람페이지] 누구꺼? ", loginUserId);
	console.log("[알람페이지] 알람: ", alarms);

    return (
        <div className="alarm-modal-overlay">
            <div className="alarm-modal">
                <button className="alarm-close-btn" onClick={onClose}>×</button>
                <h2>🔔 내 알림 목록</h2>
                {alarms.length > 0 ? (
                    <ul className="alarm-list">
                        {alarms.map((alarm, index) => (
                            <li key={index} className="alarm-item">
                                {alarm.userId}님이 회원님의 게시글에 {alarm.alarmType}을 남겼습니다.
                                <br />
                                <span className="alarm-date">
                                    {new Date(alarm.createdAt).toLocaleString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>📭 알림이 없습니다.</p>
                )}
            </div>
        </div>
    );
}

export default Alarm;