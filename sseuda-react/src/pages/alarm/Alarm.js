import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAlarmApi, callUpdateAlarmCheckApi, callDeleteAlarmApi } from "../../apis/AlarmAPICalls";
import useLoginInfo from "../../hooks/useLoginInfo";
import styles from './Alarm.module.css';
import { useNavigate } from "react-router-dom";

function Alarm({ onClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alarms = useSelector(state => state.alarmReducer);
    const { loginUserId, loading } = useLoginInfo();

    useEffect(() => {
        if (!loading && loginUserId) {
        dispatch(callAlarmApi(loginUserId));
        }
    }, [loading, loginUserId, dispatch]);

    // 알람 정렬
    const sortedAlarms = [...alarms].sort((a, b) => {
        // 1순위: 읽지 않은 것 먼저 (alarmCheck: 'N')
        if (a.alarmCheck !== b.alarmCheck) {
            return a.alarmCheck === 'N' ? -1 : 1;
        }
        // 2순위: 생성 시간 최신 순
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

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

    // 읽지 않은 알람 갯수 카운트
    const unreadCount = alarms.filter(alarm => alarm.alarmCheck === 'N').length;

    // 모두 확인
    const handleAllCheck = async () => {
        const unchecked = alarms.filter(alarm => alarm.alarmCheck === 'N');
        try {
            await Promise.all(unchecked.map(alarm => dispatch(callUpdateAlarmCheckApi(alarm.alarmId))));
            alert("모든 알림을 확인 처리했습니다.");
            dispatch(callAlarmApi(loginUserId));
            } catch (error) {
            alert("모두 확인 실패");
        }
    };
        
    // 모두 삭제
    const handleAllDelete = async () => {
        try {
        await Promise.all(alarms.map(alarm => dispatch(callDeleteAlarmApi(alarm.alarmId))));
        alert("모든 알림을 삭제했습니다.");
        dispatch(callAlarmApi(loginUserId));
        } catch (error) {
        alert("모두 삭제 실패");
        }
    };

    // 알림 클릭시 해당 게시글로 이동
    const handleNavigateToPost = (postId) => {
        navigate(`/post/${postId}`);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <h2>🔔 내 알림 목록</h2>
        
                {unreadCount > 0 && (
                <p className={styles.checkC}>
                    미확인 알림 <b>{unreadCount}</b>개
                </p>
                )}

            <div className={styles.actions}>
            {alarms.length > 0 && (
                <>
                <button onClick={handleAllCheck} className={styles.actionButton}>
                    ✅ 모두 확인
                </button>
                <button onClick={handleAllDelete} className={styles.actionButton}>
                    🗑️ 모두 삭제
                </button>
                </>
            )}
            </div>
        
                {alarms.length > 0 ? (
                <ul className={styles.list}>
                    {sortedAlarms.map((alarm) => (
                        <li
                        key={alarm.alarmId}
                        className={`${styles.item} ${alarm.alarmCheck === 'Y' ? styles.read : styles.unread}`}
                        onClick={() => handleNavigateToPost(alarm.postId)}
                        style={{ cursor: 'pointer' }}
                        >

                        <button
                        onClick={(e) => {
                            e.stopPropagation(); // 부모 클릭 방지
                            handleDelete(alarm.alarmId);
                        }}
                        className={styles.deleteButton}
                        >
                        ×
                        </button>
                    
                        <b>{alarm.alarmType === 'LIKE' ? alarm.likeUserNickname : alarm.commentUserNickname}</b>님이&nbsp;
                        <b>{alarm.alarmType === 'LIKE' ? '좋아요' : '댓글'}</b>을 남겼습니다.          
                        <br />
                        <span className={styles.date}>
                        {new Date(alarm.createdAt).toLocaleString()}
                        </span>
                    
                        {alarm.alarmCheck === 'N' && (
                        <button
                            onClick={(e) => {
                            e.stopPropagation(); // 부모 클릭 방지
                            handleCheck(alarm.alarmId);
                            }}
                            className={styles.confirmButton}
                            >
                            확인
                        </button>
                        )}
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