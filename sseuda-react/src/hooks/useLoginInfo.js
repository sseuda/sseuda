import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeJwt } from '../utils/tokenUtils';
import { callMemberApi } from '../apis/MemberAPICalls';

const useLoginInfo = () => {
	const dispatch = useDispatch();
	const [loginUserId, setLoginUserId] = useState(null);
	const [loginUsername, setLoginUsername] = useState(null);
	const [loginUserNickname, setLoginUserNickname] = useState(null);
	const [loading, setLoading] = useState(true);

	const accessToken = localStorage.getItem('accessToken');
	const decoded = accessToken ? decodeJwt(accessToken) : null;

	useEffect(() => {
		const fetchLoginUser = async () => {
		if (!accessToken || !decoded?.sub) {
			setLoading(false);
			return;
		}

		try {
			const response = await dispatch(callMemberApi(decoded.sub));
			console.log("로그인한 사람? ", loginUserId, loginUsername, loginUserNickname);
			if (response) {
			setLoginUserId(response.userId);
			setLoginUsername(response.username);
			setLoginUserNickname(response.userNickname);
			}
		} catch (e) {
			console.error('유저 정보 가져오기 실패', e);
		} finally {
			setLoading(false);
		}
		};

		fetchLoginUser();
	}, [accessToken, decoded, dispatch]);

	return { loginUserId, loginUsername, loginUserNickname, loading };
	};

export default useLoginInfo;