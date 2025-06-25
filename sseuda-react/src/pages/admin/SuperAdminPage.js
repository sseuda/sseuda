import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callMembersApi } from "../../apis/MemberAPICalls";
import { callUpdateUserRoleApi } from "../../apis/UserRoleAPICalls";
import "./SuperAdminPage.css";

function SuperAdminPage() {
	const dispatch = useDispatch();
	const members = useSelector(state => state.memberReducer.GET_MEMBER_ALL);

  const [selectedRoleMap, setSelectedRoleMap] = useState({}); // userId별 선택된 역할

  // 전체 회원 목록 불러오기
	useEffect(() => {
		dispatch(callMembersApi());
	}, [dispatch]);

  // 역할 선택 변경
	const handleRoleChange = (userId, role) => {
		setSelectedRoleMap(prev => ({ ...prev, [userId]: role }));
	};

  // 역할 변경 버튼 클릭
	const handleRoleUpdate = (userId) => {
		const newRole = selectedRoleMap[userId];
		if (!newRole) {
		alert("변경할 역할을 선택하세요.");
		return;
		}

		dispatch(callUpdateUserRoleApi({
		userId: userId,
		userRole: newRole
		}));
	};

	return (
		<div className="super-admin-container">
		<h2>🌟 SUPER 권한 - 회원 역할 관리</h2>
		<table className="super-admin-table">
			<thead>
			<tr>
				<th>이름</th>
				<th>아이디</th>
				<th>현재 권한</th>
				<th>변경 권한</th>
				<th>변경</th>
			</tr>
			</thead>
			<tbody>
			{members?.map((member) => (
				<tr key={member.userId}>
				<td>{member.userFullname}</td>
				<td>{member.username}</td>
				<td>{member.userRole}</td>
				<td>
					<select
					value={selectedRoleMap[member.userId] || ""}
					onChange={(e) => handleRoleChange(member.userId, e.target.value)}
					>
					<option value="">선택</option>
					<option value="USER">USER</option>
					<option value="ADMIN">ADMIN</option>
					<option value="SUPER">SUPER</option>
					</select>
				</td>
				<td>
					<button onClick={() => handleRoleUpdate(member.userId)}>
					역할 변경
					</button>
				</td>
				</tr>
			))}
			</tbody>
		</table>
		</div>
	);
}

export default SuperAdminPage;