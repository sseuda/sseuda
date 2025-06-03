import { createActions, handleActions } from "redux-actions";

// 초기값
const initalState = {

};

// 액션
export const POST_LOGIN = 'member/POST_LOGIN';		// 로그인
export const POST_SIGNUP = 'member/POST_SIGNUP';	// 회원가입
export const POST_FIND_USERNAME = 'member/POST_FIND_USERNAME';	// 아이디찾기


const actions = createActions({
	[POST_LOGIN]: () => {},
	[POST_SIGNUP]: () => {},
	[POST_FIND_USERNAME]: () => {}
})


// 리듀서
const memberReducer = handleActions(
	{
		[POST_LOGIN]: (state, { payload }) => {
			return payload;
		},
		[POST_SIGNUP]: (sate, { payload }) => {
			return payload;
		},
		[POST_FIND_USERNAME]: (state, {payload}) => {
			return payload;
		}
	},
	initalState
);

export default memberReducer;