import React, { useState } from 'react';
import './ResetPasswordRequest.css';

function ResetPasswordRequest() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch('/member/reset-password-request', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams({ username, email })
			});

			const result = await response.text();

			if (!response.ok || result.includes("일치하는")) {
				alert(result || '재설정 링크 요청 중 오류가 발생했습니다.');
			} else {
				alert('비밀번호 재설정 링크가 이메일로 전송되었습니다.');
			}
		} catch (err) {
			alert('요청 중 오류가 발생했습니다.');
		}
	};

	return (
		<div className='big-container'>
			<div className='reset-password-request-title'>
				<img src="/images/main/sseudaKoreanColor.png" alt="로고" className="sseuda-logo" />
				<p className='title-font'>비밀번호 재설정</p>
			</div>
			<div className="reset-password-request-container">
				<form onSubmit={handleSubmit}>
					<input 
						className='input-yellow'
						type="text"
						placeholder="아이디"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					<input
						className='input-red'
						type="email"
						placeholder="이메일"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<button type="submit">재설정 링크 보내기</button>
				</form>
			</div>
		</div>
	);
}

export default ResetPasswordRequest;