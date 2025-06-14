import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callMembersApi } from "../../apis/MemberAPICalls";
import './AdminPage.css';

function AdminPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const members = useSelector(state => state.memberReducer.GET_MEMBER_ALL);

	useEffect(() => {
		dispatch(callMembersApi());
	}, [dispatch]);

	console.log('members확인: ' , members);
	
	return (
		<div className="admin-container">
			<h1 className="admin-title">👑 관리자 전용 페이지</h1>

			<div className="table-container">
				<h2 className="section-title">회원 목록</h2>
				<table className="member-table">
					<thead>
						<tr>
							<th>번호</th>
							<th>ID</th>
							<th>이름</th>
							<th>닉네임</th>
							<th>이메일</th>
							<th>상태</th>
							<th>변경</th>
						</tr>
					</thead>
					<tbody>
						{Array.isArray(members) && members.map((member, index) => (
							<tr key={member.userId}>
								<td>{index + 1}</td>
								<td>{member.username}</td>
								<td>{member.userFullname}</td>
								<td>{member.userNickname}</td>
								<td>{member.userEmail}</td>
								<td>{member.userStatus}</td>
								<td>
									<button className="edit-btn">수정</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default AdminPage;