import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_ALARM = 'api/alarm/GET_ALARM';
export const PUT_ALARM = 'api/alaem/PUT_ALARM';
export const DELETE_ALARM = 'api/alaem/DELETE_ALARM';


const actions = createActions({
	[GET_ALARM]: () => {},
	[PUT_ALARM]: () => {},
	[DELETE_ALARM]: () => {}
})

const alarmReducer = handleActions({
	[GET_ALARM]: (state, {payload}) => {
		return payload
	},
	[PUT_ALARM]: (state, {payload}) => {
		return payload
	},
	[DELETE_ALARM]: (state, {payload}) => {
		return payload
	}
}, initialState);

export default alarmReducer;