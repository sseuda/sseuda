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

