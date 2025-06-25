import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CallMemberSearchApi, callMembersApi } from "../../apis/MemberAPICalls";
import { callUpdateUserRoleApi } from "../../apis/UserRoleAPICalls";
import "./SuperAdminPage.css";

function SuperAdminPage() {
	const dispatch = useDispatch();
	const members = useSelector((state) => state.memberReducer.GET_MEMBER_ALL);
	const [keyword, setKeyword] = useState("");
	const [searchResult, setSearchResult] = useState(null);

	// 회원 목록 불러오기
	useEffect(() => {
		dispatch(callMembersApi());
	}, [dispatch]);

	// 회원 검색
	const searchMemberHandler = async () => {
		if (!keyword.trim()) {
			alert("username 또는 이름을 입력하세요.");
			return;
		}
	
		const result = await dispatch(CallMemberSearchApi(keyword));
	
		if (result && result.payload) {
			setSearchResult(result.payload);
			console.log('payload: ', [result.payload]);
		} else {
		  setSearchResult([]); // 검색 결과 없음
		}
		};

	// 검색결과 저장
	const displayedMembers = searchResult ?? members;

	// 역할 변경 처리
	const handleRoleToggle = async (userId, currentRole, userFullname) => {
		const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
	
		const confirmChange = window.confirm(`${userFullname}님의 역할을 '${newRole}'로 변경하시겠습니까?`);
		if (!confirmChange) return;
	
		try {
			await dispatch(callUpdateUserRoleApi({
				userId,
				userRole: newRole
			}));
	
			alert(`${userFullname}님의 역할이 '${newRole}'로 변경되었습니다.`);
			dispatch(callMembersApi());  // ✅ 변경 후 목록 다시 불러오기
		} catch (error) {
			alert("역할 변경 중 오류가 발생했습니다.");
		}
	};

	return (
		<div className="super-admin-container">
			<div className="super-table-container">

			<h2 className="super-title">▶︎ SUPER - 권한 관리</h2>

			<div className="search-member-container">
				<input
				className="search-member-input"
				placeholder="username 또는 이름"
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
				/>
				<button className="search-member-btn" onClick={searchMemberHandler}>
				회원 찾기
				</button>
			</div>

			<table className="super-admin-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>이름</th>
						<th>아이디</th>
						<th>닉네임</th>
						<th>현재 권한</th>
						<th>변경</th>
					</tr>
				</thead>ㄴ
				<tbody>
					{displayedMembers && displayedMembers.length > 0 ? (
						displayedMembers
							.filter((member) => member.userRole !== "SUPER")
							.map((member) => (
								<tr
									key={member.userId}
									style={{
										backgroundColor:
											member.userRole === "ADMIN"
												? "rgba(251, 245, 204, 0.5)"
												: "rgba(252, 239, 159, 0.5)"
									}}
								>
									<td>{member.userId}</td>
									<td>{member.userFullname}</td>
									<td>{member.username}</td>
									<td>{member.userNickname}</td>
									<td>{member.userRole}</td>
									<td>
										<button
											onClick={() =>
												handleRoleToggle(member.userId, member.userRole, member.userFullname)
											}
											style={{
												padding: "5px 10px",
												borderRadius: "6px",
												border: "1px solid #ccc",
												cursor: "pointer",
												backgroundColor:
													member.userRole === "ADMIN" ? "#ffd54f" : "#90caf9"
											}}
										>
											{member.userRole === "ADMIN" ? "USER로 변경" : "ADMIN으로 변경"}
										</button>
									</td>
								</tr>
							))
					) : (
						<tr>
							<td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
								🔍 일치하는 회원이 없습니다.
							</td>
						</tr>
					)}
				</tbody>
			</table>
						</div>
		</div>
	);
}

export default SuperAdminPage;