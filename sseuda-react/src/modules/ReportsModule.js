import { createActions, handleActions } from "redux-actions";

const initalState = {};

// 신고관련
export const GET_REPORTS = 'api/reports/GET_REPORTS';		// 신고 전체 조회
export const GET_REPORT = 'api/reports/GET_REPORT';			// 신고글 조회
export const GET_REPORTER_REPORTS = 'api/reports/GET_REPORTER_REPORTS';		// 특정 유저가 신고한 신고 전체 조회
export const GET_REPORTED_REPORTS = 'api/reports/GET_REPORTED_REPORTS';		// 특정 유저가 신고당한 신고 전체 조회
export const POST_REPORT = 'api/reports/POST_REPORT';	// 신고 등록
export const PUT_REPORTS_STATUS ='api/reports/PUT_REPORTS_STATUS';	// 신고 상태 변경


const actions = createActions({
	[GET_REPORTS]: () => {},
	[GET_REPORT]: () => {},
	[GET_REPORTER_REPORTS]: () => {},
	[GET_REPORTED_REPORTS]: () => {},
	[POST_REPORT]: () => {},
	[PUT_REPORTS_STATUS]: () => {}
})

const reportsReducer = handleActions({
	[GET_REPORTS]: (state, {payload}) => {
        return payload
	},
	[GET_REPORT]: (state, {payload}) => {
        return payload
	},
	[GET_REPORTER_REPORTS]: (state, {payload}) => {
        return payload
	},
	[GET_REPORTED_REPORTS]: (state, {payload}) => {
        return payload
	},
	[POST_REPORT]: (state, {payload}) => {
        return payload
	},
	[PUT_REPORTS_STATUS]: (state, {payload}) => {
        return payload
	}
}, initalState);

export default reportsReducer;