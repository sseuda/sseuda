import { PUT_USER_ROLE } from "../modules/UserRoleModule";

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

// 유저 역할 변경 (super 권한)
export const callUpdateUserRoleApi = (form) => {
	const requestURL = `${prefix}/member/role`;
	console.log('[관리자api] 요청 URL: ', requestURL);
	console.log('역할 변경 폼 데이터: ', form);

	return async (dispatch, getState) => {
		try {
			const response = await fetch(requestURL, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Accept: '*/*'
				},
				body: JSON.stringify({
					userId: form.userId,
					userRole: form.userRole
				})
			});

			const result = await response.json();

			if (response.ok) {
				console.log('[관리자api] 결과: ', result);
				dispatch({ type: PUT_USER_ROLE, payload: result.data });
			} else {
				console.error('[관리자api] 에러 상태 코드: ', response.status);
			}
		} catch (error) {
			console.error('[관리자api] 요청 실패: ', error);
		}
	};
}