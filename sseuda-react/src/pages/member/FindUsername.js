import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callFindUsernameAPI } from "../../apis/MemberAPICalls";
import { useState } from "react";
import './FindUsername.css';

function FindUsername() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [form, setForm] = useState({
		userFullname: '',
		userEmail: '',
	});

	const [userEmailValid, setEmailValid] = useState(true);

	const onChangeHandler = (e) => {
		const { name, value } = e.target;

		setForm((prev) => ({
			...prev,
			[name]: value
		}));

		// 이메일 유효성 검사
		if (name === "userEmail") {
			setEmailValid(value.includes("@"));
		}
	};

	const onClickFindUsernameHandler = async () => {
		// 1. 모든 입력 필드가 채워졌는지 검사
		const { userFullname, userEmail } = form;

		if (
			!userFullname.trim() || 
			!userEmail.trim()
		) {
			alert("모든 항목을 입력해주세요.");
			return;
		}

		// 2. 이메일 유효성 검사
		if (!userEmailValid) {
		alert("이메일을 정확히 입력해주세요.");
		return;
		}

		// 3. 아이디 찾기 API 호출
		const result = await dispatch(callFindUsernameAPI(form));
		if (result?.payload) {
			navigate('/auth/login');
		}
	};

	return (
		<div className='big-container'>
			<div className='find-username-title'>
				<img src="/images/main/sseudaKoreanColor.png" alt="로고" className="signup-logo" />	
				<p className='title-font'>아이디 찾기</p>
			</div>
			<div className="find-username-container">
				<input className="input-yellow" type="text" name="userFullname" placeholder="이름" onChange={onChangeHandler} />
				<input className="input-red" type="email" name="userEmail" placeholder="이메일" onChange={onChangeHandler} />
				{!userEmailValid && <p className="warning">올바른 이메일 형식으로 작성해주세요.</p>}
				<button onClick={onClickFindUsernameHandler}>찾기</button>
			</div>
			
		</div>
	);
}

export default FindUsername;