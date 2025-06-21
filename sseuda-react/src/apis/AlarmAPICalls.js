import { GET_ALARM } from "../modules/AlarmModule";


const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;


// 내 알람 목록
export const callAlarmApi = (userId) => {
    return async (dispatch, getState) => {
        const requestURL = `${prefix}/api/alarm/${userId}`;
        console.log("📡 [callAlarmApi] 호출됨. userId:", userId);
        console.log("🔗 요청 주소:", requestURL);

        try {
            const response = await fetch(requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                },
            });

            console.log("🌐 response:", response);

            const result = await response.json();
            console.log("📦 result:", result);

            if (response.status === 200) {
                console.log("[알람api] 정상 응답 도착");
                dispatch({ type: GET_ALARM, payload: result });
            } else {
                console.warn("상태 코드가 200이 아님:", response.status);
            }
        } catch (e) {
            console.error("❌ 알람 API fetch 실패:", e);
        }
    };
};

// 알람 상태 변경 (N -> Y)
export const callUpdateAlarmCheckApi = (alarmId) => {
    return async (dispatch) => {
        const requestURL = `${prefix}/api/alarm/${alarmId}/check`;
        console.log("📡 [callUpdateAlarmCheckApi] 호출됨. alarmId:", alarmId);
        console.log("🔗 요청 주소:", requestURL);
    
        const body = JSON.stringify({ alarmId }); // ✅ alarmId만 JSON으로 보냄
    
        try {
            const response = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
            },
            body: body
            });
    
            const result = await response.json();
            console.log("📦 알람 상태 변경 응답:", result);
    
            if (response.status === 200) {
            dispatch({ type: 'UPDATE_ALARM_CHECK_SUCCESS', payload: alarmId });
            return result;
            } else {
            console.warn("알람 상태 변경 실패 상태 코드:", response.status);
            throw new Error('알람 상태 변경 실패');
            }
        } catch (e) {
            console.error("❌ 알람 상태 변경 API 실패:", e);
            throw e;
        }
        };
    };

// 알람 삭제
export const callDeleteAlarmApi = (alarmId) => {
    return async (dispatch) => {
        const requestURL = `${prefix}/api/alarm/delete/${alarmId}`;
        console.log("📡 [callDeleteAlarmApi] 호출됨. alarmId:", alarmId);
        console.log("🔗 요청 주소:", requestURL);
    
        try {
            const response = await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
            }
            });
    
            const result = await response.json();
            console.log("📦 알람 삭제 응답:", result);
    
            if (response.status === 200) {
            dispatch({ type: 'DELETE_ALARM_SUCCESS', payload: alarmId });
            return result;
            } else {
            console.warn("알람 삭제 실패 상태 코드:", response.status);
            throw new Error('알람 삭제 실패');
            }
        } catch (e) {
            console.error("❌ 알람 삭제 API 실패:", e);
            throw e;
        }
        };
    };
