import { createActio, createActions, handleActions } from "redux-actions";

// 초기값
const initalState = {

};

// 액션
export const POST_LOGIN = 'member/POST_LOGIN';

const actions = createActions({
	[POST_LOGIN]: () => {}
})


// 리듀서
const memberReducer = handleActions(
	{
		[POST_LOGIN]: (state, { payload }) => {
			return payload;
		}
	},
	initalState
);

export default memberReducer;