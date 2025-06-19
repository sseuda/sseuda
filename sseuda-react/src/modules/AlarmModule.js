import { handleActions } from "redux-actions";

const initialState = [];

export const GET_ALARM = 'alarm/GET_ALARM';

const actions = createActions({
	[GET_ALARM]: () => {}
})

const alarmReducer = handleActions({
	[GET_ALARM]: (state, {payload}) => {
		return payload
	}
}, initialState);

export default alarmReducer;