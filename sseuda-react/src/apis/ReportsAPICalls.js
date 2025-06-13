import { GET_REPORT, GET_REPORTED_REPORTS, GET_REPORTER_REPORTS, GET_REPORTS, POST_REPORT, PUT_REPORTS_STATUS } from "../modules/ReportsModule";


const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

// 전체 신고 조회
export const callReportsApi = () => {

	let requestURL = `${prefix}/api/reports`;
	console.log('[관리자api]요청url: ' ,requestURL);

	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
                Accept: '*/*'
			}
		}).then((response) => response.json());
		if(result.status === 200){
			console.log('[관리자api]결과: ', result);
			dispatch({type: GET_REPORTS, payload: result.data});
		}
	};
};


// 신고 조회 (개별)
export const callReportApi = () => {

	let requestURL = `${prefix}/api/reports/{reportsId}`;
	console.log('[관리자api]요청url: ' ,requestURL);

	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
                Accept: '*/*'
			}
		}).then((response) => response.json());
		if(result.status === 200){
			console.log('[관리자api]결과: ', result);
			dispatch({type: GET_REPORT, payload: result.data});
		}
	};
};

// 특정 유저가 신고한 목록 (신고자별 목록)
export const callReporterReportsApi = () => {

	let requestURL = `${prefix}/api/reports/reporter/{reporterId}`;
	console.log('[관리자api]요청url: ' ,requestURL);

	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
                Accept: '*/*'
			}
		}).then((response) => response.json());
		if(result.status === 200){
			console.log('[관리자api]결과: ', result);
			dispatch({type: GET_REPORTER_REPORTS, payload: result.data});
		}
	};
};

// 특정 유저가 신고당한 목록
export const callReportedReportsApi = () => {

	let requestURL = `${prefix}/api/reports/reported/{reportedId}`;
	console.log('[관리자api]요청url: ' ,requestURL);

	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
                Accept: '*/*'
			}
		}).then((response) => response.json());
		if(result.status === 200){
			console.log('[관리자api]결과: ', result);
			dispatch({type: GET_REPORTED_REPORTS, payload: result.data});
		}
	};
};

// 신고등록
export const callAddReportApi = (form) => {
	const requestURL = `${prefix}/api/reports/`;
	console.log('[관리자api] 요청 URL: ', requestURL);
	console.log('신고 접수 폼 데이터: ', form);

	return async (dispatch, getState) => {
		try {
			const response = await fetch(requestURL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: '*/*'
				},
				body: JSON.stringify({
					reporterId: form.reporterId,
					reportedId: form.reportedId,
					postId: form.postId,
					commentId: form.commentId,
					reasonCode: form.reasonCode,
					reasonDetail: form.reasonDetail,
					reportsStatus: "신고접수"
				})
			});

			const result = await response.json();

			if (response.ok) {
				console.log('[관리자api] 결과: ', result);
				dispatch({ type: POST_REPORT, payload: result.data });
			} else {
				console.error('[관리자api] 에러 상태 코드: ', response.status);
			}
		} catch (error) {
			console.error('[관리자api] 요청 실패: ', error);
		}
	};
};


// 신고 상태 변경
export const callUpdateReportStatusApi = (form) => {
	const requestURL = `${prefix}/api/reports/status`;
	console.log('[관리자api] 요청 URL: ', requestURL);
	console.log('신고 상태 변경 폼 데이터: ', form);

	return async (dispatch, getState) => {
		try {
			const response = await fetch(requestURL, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Accept: '*/*'
				},
				body: JSON.stringify({
					reportId: form.reportId,
					reportsStatus: form.reportsStatus
				})
			});

			const result = await response.json();

			if (response.ok) {
				console.log('[관리자api] 결과: ', result);
				dispatch({ type: PUT_REPORTS_STATUS, payload: result.data });
			} else {
				console.error('[관리자api] 에러 상태 코드: ', response.status);
			}
		} catch (error) {
			console.error('[관리자api] 요청 실패: ', error);
		}
	};
}
