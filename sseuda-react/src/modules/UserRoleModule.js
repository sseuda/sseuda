import { createActions, handleActions } from "redux-actions";

const initalState = {};

// 유저롤 변경 ( super 권한 )
export const PUT_USER_ROLE = 'member/PUT_USER_ROLE';

const actions = createActions({
	[PUT_USER_ROLE]: () => {}
})

const userRoleReducer = handleActions({
	[PUT_USER_ROLE]: (state, {payload}) => {
        return payload
	}
}, initalState);

export default userRoleReducer;