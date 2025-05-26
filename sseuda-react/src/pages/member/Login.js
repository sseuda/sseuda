import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import memberReducer from "../../modules/MemberModule";
import { useEffect, useState } from "react";
import { callLoginAPI } from "../../apis/MemberAPICalls";
import './Login.css';
import { Link } from "react-router-dom";

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const loginMember = useSelector((state) => state.memberReducer);

	const loginResult = useSelector(state => state.memberReducer);
	const [form, setForm] = useState({
		username: "",
		password: "",
	});

	useEffect(() => {
		if (loginMember.status === 200) {
			console.log("[Login] Login SUCCESS {}", loginMember);
			navigate("/", { replace: true });
		}
	}, [loginMember]);

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value
		});
	};

	// 로그인 버튼 클릭 핸들러
	const onClickLoginHandler = () => {
		console.log("로그인시도: ", form)
		dispatch(callLoginAPI(form));
	};

	// 로그인 성공 -> 메인페이지 이동
	useEffect(() => {
		if (loginResult?.accessToken) {
			console.log("로그인 성공! 메인페이지로 이동~");
			navigate("/", { replace: true });
		}
	}, [loginResult]);

	return (
		<div className="big-container">
			<div className="logoImage">
				{/* <img src="/images/main/sseudaLogo.png" alt="로고" className="login-logo" /> */}
			</div>
			<div className="login-box">
				
				<div className="form-container">
					<input
						className="form-username"
						type="text"
						name="username"
						placeholder="아이디"
						autoComplete="off"
						onChange={onChangeHandler}
					/>
					<input
						className="form-password"
						type="password"
						name="password"
						placeholder="패스워드"
						autoComplete="off"
						onChange={onChangeHandler}
					/>
					<button onClick={onClickLoginHandler}>로그인</button>
				</div>
	
				<div className="bottom-links">
					<Link to="/find-id">아이디 찾기</Link>
					<span>|</span>
					<Link to="/find-password">비밀번호 찾기</Link>
					<span>|</span>
					<Link to="/signup">회원가입</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;