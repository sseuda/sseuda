import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import memberReducer from "../../modules/MemberModule";
import { useEffect, useState } from "react";

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const loginMember = useSelector((state) => state, memberReducer);

	const [form, setForm] = useState({
		username: "",
		password: "",
	});

	useEffect(() => {
		if (loginMember.status === 200) {
			console.log("[Login] Login SUCCESS {}", loginMember);
			navigate("/", { replace: true });
		}

		if (loginMember.status === 201) {
			loginMember.status = 100;
			// dispatch({ type: POST_RESISTER, payload:loginMember});
		}
	}, [loginMember]);

	return (
		<div>
			<input
				type="text"
				name="username"
				placeholder="아이디"
				autoComplete="off"
				// onChange={onChangeHandler}
			/>
			<input
				type="password"
				name="password"
				placeholder="패스워드"
				autoComplete="off"
				// onChange={onChangeHandler}
				// onKeyDown={onKeyPressHandler}
			/>
		</div>
	);
}

export default Login;