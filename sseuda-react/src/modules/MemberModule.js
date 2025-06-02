import { createActions, handleActions } from "redux-actions";
import { POST_USER_POSTING } from "./PostModule";

// 초기값
const initalState = {

};

// 액션
export const POST_LOGIN = 'member/POST_LOGIN';		// 로그인
export const POST_SIGNUP = 'member/POST_SIGNUP';	// 회원가입


const actions = createActions({
	[POST_LOGIN]: () => {},
	[POST_USER_POSTING]: () => {}
})


// 리듀서
const memberReducer = handleActions(
	{
		[POST_LOGIN]: (state, { payload }) => {
			return payload;
		},
		[POST_SIGNUP]: (sate, { payload }) => {
			return payload;
		}
	},
	initalState
);

export default memberReducer;