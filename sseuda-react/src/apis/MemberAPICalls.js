// 멤버api
import { GET_MEMBER, GET_MEMBER_ALL, GET_MEMBER_BY_ID, GET_MEMBER_SEARCH, POST_LOGIN, POST_LOGOUT, PUT_DEACTIVATE, PUT_USER_INFO } from "../modules/MemberModule";

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

// 로그인
export const callLoginAPI = ( form ) => {
	let requestURL = `${prefix}/auth/login`;
	// console.log("폼데이터: ", form);

	return async (dispatch, getState) => {
		try{
			const response = await fetch(requestURL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: "*/*"
				},
				body: JSON.stringify({
					username: form.username,
					password: form.password
				})
			});

			console.log("응답 status: ", response.status);

			const result = await response.json();

			console.log('[MemberAPICalls] callLoginAPI RESULT : ', result);
		
			if (response.status === 200) {
				console.log("[LoginAPI] 로그인 성공", result)
				alert(`${form.username}님, 환영합니다😊`);
				window.localStorage.setItem('accessToken', result.accessToken);
				dispatch({type: POST_LOGIN, payload:result});
			} else if (response.status === 401) {
				// ✅ 서버에서 받은 에러 메시지 확인
				if (result.message === "비활성화된 계정입니다. 관리자에게 문의하세요.") {
					alert("해당 계정은 현재 비활성 상태입니다. 관리자에게 문의하세요.");
				} else {
					alert("아이디 또는 비밀번호가 틀렸습니다.");
				}
			} else {
				console.error("예상치 못한 에러 발생:", response.status);
			}
		} catch (error) {
			console.log("로그인 요청 실패!: ", error)
			alert("로그인에 실패했습니다🥲")
		}
	};
};

// 로그아웃
export const callLogoutAPI = () => {
	const token = window.localStorage.getItem('accessToken');
	const requestURL = `${prefix}/auth/logout`;

	return async (dispatch) => {
		try {
			const response = await fetch(requestURL, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});

			// 서버 응답이 정상일 경우
			if (response.ok) {
				alert("로그아웃 되었습니다.");
			} else {
				const msg = await response.text();
				console.warn(`서버 로그아웃 실패: ${msg}`);
				alert("서버 로그아웃 실패, 클라이언트에서 강제 로그아웃합니다.");
			}
		} catch (error) {
			console.error("로그아웃 요청 중 오류 발생:", error);
			alert("로그아웃 오류, 클라이언트에서 강제 로그아웃합니다.");
		} finally {
			// 서버 응답 성공/실패 관계 없이 클라이언트에서는 강제로 로그아웃 처리
			localStorage.removeItem('accessToken');
			dispatch({ type: 'POST_LOGOUT', payload: { member: null } });
			window.location.reload();
		}
	};
};

// 회원가입
export const callSignupAPI = (form) => {
	let requestURL = `${prefix}/member/signup`;
	console.log("회원가입 폼 데이터: ", form);

	return async (dispatch, getState) => {
		try {
			const response = await fetch(requestURL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: "*/*"
				},
				body: JSON.stringify({
					userFullname: form.userFullname,
					username: form.username,
					password: form.password,
					userNickname: form.userNickname,
					userEmail: form.userEmail,
					userPhone: form.userPhone,
					userStatus: "활성"
				})
			});

			let result = {};
			try {
				const contentType = response.headers.get('Content-Type');
				if (contentType && contentType.includes('application/json')) {
					result = await response.json();
				}
			} catch (e) {
				console.warn("JSON 파싱 실패 또는 응답 없음", e);
			}

			if (response.status === 201 || response.status === 200) {
				alert("회원가입이 완료되었습니다! 로그인해주세요.");
				dispatch({ type: 'POST_SIGNUP', payload: result });
				return { status: response.status, payload: result };
			} else {
				alert(result?.message || "회원가입 중 오류가 발생했습니다.");
				console.error("에러 응답:", result);
				return { status: response.status, payload: result };
			}
			
			const finalResult = { status: response.status, payload: result };
			dispatch({ type: 'POST_SIGNUP', payload: finalResult.payload });
			return finalResult;

		} catch (error) {
			console.log("회원가입 요청 실패!: ", error);
			alert("서버 연결 실패!");
			const errorResult = { status: 500, payload: { message: "서버 연결 실패" } };
			dispatch({ type: 'POST_SIGNUP', payload: errorResult.payload });
			return errorResult;
		}
	};
};

// 아이디 찾기
export const callFindUsernameAPI = (form) => {
	let requestURL = `${prefix}/member/find-username`;

	return async (dispatch, getState) => {
		try {
			const response = await fetch(requestURL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: '*/*'
				},
				body: JSON.stringify({
					fullname: form.userFullname,
					to: form.userEmail
				})
			});

			const result = await response.text();

			if (response.ok) {
				alert('아이디 찾기 결과가 이메일로 전송되었습니다 :-)');
			} else {
				alert(`아이디 찾기 실패: ${result}`);
			}
		
		} catch (error) {
			console.error('아이디 찾기 중 오류 발생: ', error);
			alert('서버 오류로 아이디 찾기에 실패했습니다.')
		}
	}
}

// 비밀번호 재설정 요청 API
export const callResetPasswordRequestAPI = (email, username) => {
	const requestURL = `/member/reset-password-request`;

	return async () => {
		const response = await fetch(requestURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({ email, username })
		});

		const result = await response.text();

		
		if (!response.ok) {
			// HTTP 상태가 400/500번대일 경우
			throw new Error(result);
		}

		return result;
	};
};

// 전체 회원 조회
export const callMembersApi = () => {
	const requestURL = `${prefix}/member/all`;
	console.log('[멤버api] 요청 URL:', requestURL);

	return async (dispatch) => {
		try {
			const response = await fetch(requestURL, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: '*/*',
				},
			});

			const result = await response.json();
			console.log('[멤버api] raw result:', result);

			let members = [];

			if (Array.isArray(result)) {
				members = result;
			} else if (Array.isArray(result?.data)) {
				members = result.data;
			} else {
				console.warn('[멤버api] 응답이 배열 형식이 아님. 빈 배열로 대체합니다.');
			}

			console.log('[멤버api] 최종 members:', members);

			dispatch({ type: GET_MEMBER_ALL, payload: members });

		} catch (error) {
			console.error('[멤버api] 오류 발생:', error);
			dispatch({ type: GET_MEMBER_ALL, payload: [] }); // 실패 시에도 안전하게 빈 배열
		}
	};
};


// 특정 회원 조회 (username)
export const callMemberApi = (username) => {

	const requestURL = `${prefix}/member/${username}`;
	// console.log('[멤버api] 요청 URL:', requestURL);
	
		return async (dispatch, getState) => {
		try {
			const response = await fetch(requestURL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: '*/*'
			}
			});
	
			if (!response.ok) {
			console.error(`서버 응답 오류: ${response.status}`);
			alert("회원 정보를 찾을 수 없습니다.");
			return;
			}
	
		const data = await response.json();
		// console.log('[멤버api] 받은 데이터:', data);

			dispatch({ type: GET_MEMBER, payload: data });

			return data;
	
		} catch (error) {
			console.error("회원 정보 호출 실패:", error);
			alert("회원 정보를 불러오는 중 오류가 발생했습니다.");
		}
		};
	};

// 특정 회원 조회 (userId)
export const callMemberByIdApi = (userId) => {

	let requestURL = `${prefix}/member/user/${userId}`;
	console.log('[멤버api]요청url: ' ,requestURL);

	return async (dispatch, getState) => {
		const response = await fetch(requestURL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
                Accept: '*/*'
			}
		});
		if (!response.ok) {
            console.error(`서버 응답 오류: ${response.status}`);
            alert("회원 정보를 찾을 수 없습니다.");
            return null;
        }

        const text = await response.text();
        if (!text) {
            alert("회원 정보를 찾을 수 없습니다.");
            return null;
        }

        const result = JSON.parse(text);
        // console.log("회원 응답 결과:", result);

        if (result && result.userId) {
            dispatch({ type: GET_MEMBER_BY_ID, payload: result });
            return { payload: result };
        } else {
            alert("회원 조회에 실패했습니다.");
            return null;
        }
    };
};

// 회원 정보 수정
export const callUpdateUserInfoApi = (form) => {
	const requestURL = `${prefix}/member/{id}/update`;

	console.log('[회원정보 수정 API] 요청 URL:', requestURL);
	console.log('[회원정보 수정 API] 수정할 데이터:', form);

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
					userFullname: form.userFullname,
					userNickname: form.userNickname,
					userEmail: form.userEmail,
					userPhone: form.userPhone
				})
			});

			const result = await response.json();

			if (response.ok) {
				console.log('[회원정보 수정 API] 성공:', result);
				dispatch({ type: PUT_USER_INFO, payload: result.data });
			} else {
				console.error('[회원정보 수정 API] 실패 상태 코드:', response.status);
			}
		} catch (error) {
			console.error('[회원정보 수정 API] 요청 실패:', error);
		}
	};
};

// 회원 탈퇴
// export const callDeactivateApi = (userId) => {
// 	const requestURL = `${prefix}/member/{id}/deactivate`;

// 	console.log('[회원 탈퇴 API] 요청 URL:', requestURL);
// 	console.log('[회원 탈퇴 API] 탈퇴할 사용자 ID:', userId);

// 	return async (dispatch, getState) => {
// 		try {
// 			const response = await fetch(requestURL, {
// 				method: 'PUT',
// 				headers: {
// 					'Content-Type': 'application/json',
// 					Accept: '*/*'
// 				},
// 				body: JSON.stringify({ userId: userId })
// 			});

// 			const result = await response.json();

// 			if (response.ok) {
// 				console.log('[회원 탈퇴 API] 성공:', result);
// 				dispatch({ type: PUT_DEACTIVATE, payload: result.data });
// 			} else {
// 				console.error('[회원 탈퇴 API] 실패 상태 코드:', response.status);
// 			}
// 		} catch (error) {
// 			console.error('[회원 탈퇴 API] 요청 실패:', error);
// 		}
// 	};
// };
export const callUpdateStatusApi = (userId, userStatus) => {
	const requestURL = `${prefix}/member/${userId}/status`;

	return async (dispatch) => {
		try {
			const response = await fetch(requestURL, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Accept: '*/*'
				},
				body: JSON.stringify({ userId, userStatus })
			});

			const result = await response.json();

			if (response.ok) {
				dispatch({ type: PUT_DEACTIVATE, payload: result.data });
			} else {
				console.error("회원 상태 변경 실패:", result.message);
			}
		} catch (error) {
			console.error("회원 상태 변경 중 예외 발생:", error);
		}
	};
};

// 회원 검색 [api]
export const CallMemberSearchApi = (keyword) => {
    const requestURL = `${prefix}/member/search?keyword=${encodeURIComponent(keyword)}`;

    console.log('[CallMemberSearchApi] 요청 URL:', requestURL);

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*'
                }
            });

            if (!response.ok) {
                console.error(`[CallMemberSearchApi] 에러 응답: ${response.status}`);
                alert("회원 검색 실패");
                return;
            }

            const result = await response.json();

            if (result.status === 200) {
                console.log('[CallMemberSearchApi] 검색 결과:', result.data);
                dispatch({ type: GET_MEMBER_SEARCH, payload: result.data });
				return { payload: result.data };
            } else {
                alert("회원 검색 실패: " + result.message);
            }
        } catch (error) {
            console.error('[CallMemberSearchApi] 예외 발생:', error);
            alert("검색 중 오류가 발생했습니다.");
        }
    };
};