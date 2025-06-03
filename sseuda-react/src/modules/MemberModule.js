import { createActions, handleActions } from "redux-actions";

// 초기값
const initalState = {

};

// 액션
export const POST_LOGIN = 'member/POST_LOGIN';		// 로그인
export const POST_SIGNUP = 'member/POST_SIGNUP';	// 회원가입
export const POST_FIND_USERNAME = 'member/POST_FIND_USERNAME';	// 아이디찾기
export const GET_RESET_PASSWORD = 'member/GET_RESET_PASSWORD';	// 비밀번호 재설정 get
export const POST_RESET_PASSWORD_REQUEST = 'member/POST_RESET_PASSWORD_REQUEST';	// 비밀번호 재설정 폼
export const POST_RESET_PASSWORD = 'member/POST_RESET_PASSWORD';	// 비밀번호 재설정


const actions = createActions({
	[POST_LOGIN]: () => {},
	[POST_SIGNUP]: () => {},
	[POST_FIND_USERNAME]: () => {},
	[GET_RESET_PASSWORD]: () => {},
	[POST_RESET_PASSWORD_REQUEST]: () => {},
	[POST_RESET_PASSWORD]: () => {}
})


// 리듀서
const memberReducer = handleActions(
	{
		[POST_LOGIN]: (state, { payload }) => {
			return payload;
		},
		[POST_SIGNUP]: (state, { payload }) => {
			return payload;
		},
		[POST_FIND_USERNAME]: (state, { payload }) => {
			return payload;
		},
		[GET_RESET_PASSWORD]: (state, { payload }) =>  {
			return payload;
		},
		[POST_RESET_PASSWORD_REQUEST]: (state, { payload }) => {
			return payload;
		},
		[POST_RESET_PASSWORD]: (state, { payload }) => {
			return payload;
		}
	},
	initalState
);

export default memberReducer;