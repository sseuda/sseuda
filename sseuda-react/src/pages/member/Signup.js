import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { callSignupAPI } from '../../apis/MemberAPICalls';
import { useNavigate } from 'react-router-dom';
import './Signup.css';


function Signup() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// const memberReducer = useSelector(
	// 	(state) => state.memberReducer
	// );

	const [form, setForm] = useState({
		userFullname: '',
		username: '',
		password: '',
		confirmPassword: '',
		userNickname: '',
		userEmail: '',
		userPhone: ''
	});

	// 비밀번호 유효성 검사
	const [passwordValid, setPasswordValid] = useState(true);
	const [passwordsMatch, setPasswordsMatch] = useState(true);

	const validatePassword = (password) => {
		// 8자 이상, 영문/숫자/특수문자 포함 정규식
		const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
		return regex.test(password);
	};

	const onChangeHandler = (e) => {
		const { name, value } = e.target;

		setForm((prev) => {
			const updatedForm = { ...prev, [name]: value };
	
			// 비밀번호 유효성 검사
			if (name === 'password') {
				setPasswordValid(validatePassword(value));
				setPasswordsMatch(value === updatedForm.confirmPassword);
			}
	
			// 비밀번호 확인 일치 검사
			if (name === 'confirmPassword') {
				setPasswordsMatch(updatedForm.password === value);
			}
	
			return updatedForm;
		});
	};

	const onClickSignupHandler = async () => {
		// 1. 모든 입력 필드가 채워졌는지 검사
		const { userFullname, username, password, confirmPassword, userNickname, userEmail, userPhone } = form;

		if (
			!userFullname.trim() || 
			!username.trim() || 
			!password.trim() || 
			!confirmPassword.trim() || 
			!userNickname.trim() || 
			!userEmail.trim() || 
			!userPhone.trim()
		) {
			alert("모든 항목을 입력해주세요.");
			return;
		}

		// 2. 비밀번호 유효성 검사
		if (!passwordValid) {
		alert("비밀번호는 8자 이상, 영문+숫자+특수문자를 포함해야 합니다.");
		return;
		}

		// 3. 비밀번호 일치 검사
		if (!passwordsMatch) {
			alert("비밀번호가 일치하지 않습니다.");
			return;
		}

		// 4. 가입 API 호출
		const result = await dispatch(callSignupAPI(form));
		if (result?.payload) {
			navigate('/auth/login');
		}
	};

	return (
		<div className='big-container'>
			<div className='signup-title'>
				<img src="/images/main/sseudaKorean.png" alt="로고" className="signup-logo" />	
				<p className='title-font'>회원가입</p>
			</div>
			<div className="signup-container">
				<input className="input-yellow" type="text" name="userFullname" placeholder="이름" onChange={onChangeHandler} />
				<input className="input-red" type="text" name="username" placeholder="아이디" onChange={onChangeHandler} />
				<input className="input-yellow" type="password" name="password" placeholder="비밀번호" onChange={onChangeHandler} />
				{!passwordValid && <p className="warning">비밀번호는 8자 이상, 영문+숫자+특수문자를 포함해야 합니다.</p>}
				<input className="input-yellow" type="password" name="confirmPassword" placeholder="비밀번호 확인" onChange={onChangeHandler} />
				{!passwordsMatch && <p className="warning">비밀번호가 일치하지 않습니다.</p>}
				<input className="input-red" type="text" name="userNickname" placeholder="닉네임" onChange={onChangeHandler} />
				<input className="input-yellow" type="email" name="userEmail" placeholder="이메일" onChange={onChangeHandler} />
				<input className="input-red" type="text" name="userPhone" placeholder="전화번호" onChange={onChangeHandler} />
			</div>
			<button onClick={onClickSignupHandler} className='signup-button'>가입하기</button>
		</div>
	);
}

export default Signup;