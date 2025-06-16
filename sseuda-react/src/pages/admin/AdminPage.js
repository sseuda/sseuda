import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	CallMemberSearchApi,
	callMembersApi,
	callUpdateStatusApi,
} from "../../apis/MemberAPICalls";
import "./AdminPage.css";

function AdminPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const members = useSelector((state) => state.memberReducer.GET_MEMBER_ALL);
	const [keyword, setKeyword] = useState("");
	const [searchResult, setSearchResult] = useState(null);

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

	// 상태 변경 함수 (토글 시 호출)
	const toggleUserStatus = (userId, currentStatus) => {
		const newStatus = currentStatus === "활성" ? "비활성" : "활성";
	
		// API 호출해서 상태 변경 요청
		dispatch(callUpdateStatusApi(userId, newStatus))
			.then(() => {
			alert(`회원 상태가 '${newStatus}'로 변경되었습니다.`);
			// 상태 변경 후 회원 목록 다시 불러오기
			dispatch(callMembersApi());
			// 만약 검색결과 상태에 있다면, 검색 결과도 다시 불러오거나 갱신 필요
			})
			.catch(() => {
			alert("회원 상태 변경에 실패했습니다.");
			});
		};

	return (
    <div className="admin-container">
    	<div className="table-container">
        <h2 className="section-title">▶︎ 회원 관리</h2>

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

        <table className="member-table">
        	<thead>
            <tr>
				<th>번호</th>
				<th>이름</th>
				<th>ID</th>
				<th>닉네임</th>
				<th>이메일</th>
				<th>상태</th>
				<th>상태 변경</th>
            </tr>
			</thead>
			<tbody>
				{(searchResult ?? members)?.map((member, index) => (
					<tr key={member.userId}
						style={{ backgroundColor: index % 2 === 0 ? "rgba(252, 239, 159, 0.5)" : "rgba(251, 245, 204, 0.5)" }}>
					<td>{index + 1}</td>
					<td>{member.userFullname}</td>
					<td>{member.username}</td>
					<td>{member.userNickname}</td>
					<td>{member.userEmail}</td>
					<td>{member.userStatus}</td>
					<td>
					<label className="switch">
						<input
						type="checkbox"
						checked={member.userStatus === "활성"}
						onChange={() =>
							toggleUserStatus(member.userId, member.userStatus)
						}
						/>
						<span className="slider round"></span>
					</label>
                </td>
				</tr>
            ))}

            {/* 검색 결과가 없을 경우 메시지 */}
            {searchResult?.length === 0 && (
            	<tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
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

export default AdminPage;