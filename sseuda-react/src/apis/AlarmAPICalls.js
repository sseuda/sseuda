import { GET_ALARM } from "../modules/AlarmModule";

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

export const callAlarmApi = ()  => {

	let requestURL = `${prefix}/api/alarm/${userId}`;
	console.log('[알람api]요청주소: ' , requestURL)

	return async (dispatch, getState) => {
		const result = await fetch (
			requestURL, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
                	'Accept': '*/*'
				}
			}
		).then((response) => response.json());
        if(result.status === 200){
            console.log('[알람api] RESULT : ', result);
            dispatch({type: GET_ALARM, payload: result.data});
        }
	}

};

