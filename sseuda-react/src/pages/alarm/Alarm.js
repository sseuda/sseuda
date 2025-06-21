import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAlarmApi, callUpdateAlarmCheckApi, callDeleteAlarmApi } from "../../apis/AlarmAPICalls";
import useLoginInfo from "../../hooks/useLoginInfo";
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

    // 알람 확인 처리 함수
    const handleCheck = async (alarmId) => {
        try {
        await dispatch(callUpdateAlarmCheckApi(alarmId));
        alert("알림을 확인 처리했습니다.");
        dispatch(callAlarmApi(loginUserId));  // 최신 상태 다시 불러오기
        } catch (error) {
        alert("알림 확인 처리 실패");
        }
    };

    // 알람 삭제 처리 함수
    const handleDelete = async (alarmId) => {
        try {
        await dispatch(callDeleteAlarmApi(alarmId));
        alert("알림이 삭제되었습니다.");
        dispatch(callAlarmApi(loginUserId));  // 최신 상태 다시 불러오기
        } catch (error) {
        alert("알림 삭제 실패");
        }
    };

    const unreadCount = alarms.filter(alarm => alarm.alarmCheck === 'N').length;

    return (
        <div className="alarm-modal-overlay">
            <div className="alarm-modal">
                <button className="alarm-close-btn" onClick={onClose}>×</button>
                <h2>🔔 내 알림 목록</h2>
        
                {unreadCount > 0 && (
                <p style={{ color: 'tomato', fontWeight: 'bold' }}>
                    📌 확인하지 않은 알림: {unreadCount}개
                </p>
                )}
        
                {alarms.length > 0 ? (
                <ul className="alarm-list">
                    {alarms.map((alarm) => (
                    <li
                        key={alarm.alarmId}
                        className={`alarm-item ${alarm.alarmCheck === 'Y' ? 'read' : 'unread'}`}
                    >
                        {alarm.userId}님이 회원님의 게시글에 {alarm.alarmType}을 남겼습니다.
                        <br />
                        <span className="alarm-date">
                        {new Date(alarm.createdAt).toLocaleString()}
                        </span>
                        <br />
                        <button onClick={() => handleCheck(alarm.alarmId)}>확인</button>
                        <button
                        onClick={() => handleDelete(alarm.alarmId)}
                        style={{ marginLeft: '8px' }}
                        >
                        삭제
                        </button>
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