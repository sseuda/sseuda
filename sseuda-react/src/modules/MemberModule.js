import { createActions, handleActions } from "redux-actions";

// 초기값
const initalState = {
	member: null,
	GET_MEMBER_ALL: []
};

// 액션
export const POST_LOGIN = 'auth/POST_LOGIN';		// 로그인
export const POST_LOGOUT = 'auth/POST_LOGOUT';	// 로그아웃
export const POST_SIGNUP = 'member/POST_SIGNUP';	// 회원가입
export const POST_FIND_USERNAME = 'member/POST_FIND_USERNAME';	// 아이디찾기
export const GET_RESET_PASSWORD = 'member/GET_RESET_PASSWORD';	// 비밀번호 재설정 get
export const POST_RESET_PASSWORD_REQUEST = 'member/POST_RESET_PASSWORD_REQUEST';	// 비밀번호 재설정 폼
export const POST_RESET_PASSWORD = 'member/POST_RESET_PASSWORD';	// 비밀번호 재설정

// 회원 관리
export const GET_MEMBER_ALL = 'member/all';			// 회원 전체 조회
export const GET_MEMBER = 'member/{username}';		// 특정 회원 조회
export const GET_MEMBER_BY_ID = 'member/user/{userID}';		// 특정 회원 조회
export const PUT_USER_INFO = 'member/{id}/update';	// 회원 정보 수정
export const PUT_DEACTIVATE = 'member/{id}/deactivate';		// 탈퇴
export const GET_MEMBER_SEARCH = 'member/search';			// 회원 검색


const actions = createActions({
	[POST_LOGIN]: () => {},
	[POST_LOGOUT]: () => {},
	[POST_SIGNUP]: () => {},
	[POST_FIND_USERNAME]: () => {},
	[GET_RESET_PASSWORD]: () => {},
	[POST_RESET_PASSWORD_REQUEST]: () => {},
	[POST_RESET_PASSWORD]: () => {},
	[GET_MEMBER_ALL]: () => {},
	[GET_MEMBER]: () => {},
	[GET_MEMBER_BY_ID]: () => {},
	[PUT_USER_INFO]: () => {},
	[PUT_DEACTIVATE]: () => {},
	[GET_MEMBER_SEARCH]: () => {}
})


// 리듀서
const memberReducer = handleActions(
	{
		[POST_LOGIN]: (state, { payload }) => {
			return payload;
		},
		[POST_LOGOUT]: (state, { payload }) => {
			return {
				...state,
				member: null
			};
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
		},
		[GET_MEMBER_ALL]: (state, { payload }) => {
			return {
				...state,
				GET_MEMBER_ALL: payload
			};
		},
		[GET_MEMBER]: (state, { payload }) => {
			return payload;
		},
		[GET_MEMBER_BY_ID]: (state, { payload }) => {
			return {
				...state,
				member: payload
			};
		},
		[GET_MEMBER]: (state, { payload }) => {
			return {
				...state,
				member: payload
			};
		},
		[PUT_USER_INFO]: (state, { payload }) => {
			return {
				...state,
				member: payload
			};
		},
		[GET_MEMBER_SEARCH]: (state, { payload }) => {
			return {
				...state,
				searchResult: payload
			};
		}
	},
	initalState
);

export default memberReducer;