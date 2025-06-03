import React, { useState } from 'react';
import { callResetPasswordRequestAPI } from '../../apis/MemberAPICalls';
import { useDispatch } from 'react-redux';

function ResetPasswordRequest() {
	const dispatch = useDispatch();

	// 상태값
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');

	// 폼 제출
	const handleSubmit = async (e) => {
		e.preventDefault();

		setError('');
		setMessage('');

		try {
			const result = await dispatch(callResetPasswordRequestAPI(email, username));
			setMessage(result);  // 서버에서 준 성공 메시지
		} catch (err) {
			setError(err.message);  // 서버에서 준 실패 메시지
		}
	};

	return (
		<div className="reset-password-request-container">
			<h2>비밀번호 재설정</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="아이디"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<input
					type="email"
					placeholder="이메일"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<button type="submit">재설정 링크 보내기</button>
			</form>

			{error && <p style={{ color: 'red' }}>{error}</p>}
			{message && <p style={{ color: 'green' }}>{message}</p>}
		</div>
	);
}

export default ResetPasswordRequest;