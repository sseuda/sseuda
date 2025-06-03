import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ResetPassword() {
	const location = useLocation();
	const navigate = useNavigate();

	const queryParams = new URLSearchParams(location.search);
	const token = queryParams.get('token');

	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');

	// 비밀번호 유효성 검사 함수
	const isValidPassword = (pw) => {
		const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+-]).{8,}$/;
		return regex.test(pw);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setMessage('');

		if (!isValidPassword(password)) {
			setError("비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.");
			return;
		}

		if (password !== confirmPassword) {
			setError("비밀번호가 일치하지 않습니다.");
			return;
		}

		try {
			const response = await fetch('/member/reset-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams({ token, password })
			});

			const result = await response.text();

			if (!response.ok || result.includes("유효하지 않습니다.")) {
				setError(result || "비밀번호 재설정 중 오류가 발생했습니다.");
			} else {
				setMessage("비밀번호가 성공적으로 재설정되었습니다.");
				setTimeout(() => {
					navigate('/auth/login');
				}, 2000);
			}
		} catch (err) {
			setError("요청 중 오류가 발생했습니다.");
		}
	};

	return (
		<div className="reset-password-container">
			<h2>새 비밀번호 설정</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="password"
					placeholder="새 비밀번호"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="비밀번호 확인"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
				<button type="submit">비밀번호 재설정</button>
			</form>

			{error && <p style={{ color: 'red' }}>{error}</p>}
			{message && <p style={{ color: 'green' }}>{message}</p>}
		</div>
	);
}

export default ResetPassword;