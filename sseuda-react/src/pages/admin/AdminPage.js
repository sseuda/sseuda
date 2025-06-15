import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	CallMemberSearchApi,
	callMembersApi,
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

	return (
    <div className="admin-container">
    	<h1 className="admin-title">👑 관리자 전용 페이지</h1>

    	<div className="table-container">
        <h2 className="section-title">회원 목록</h2>

        <div className="search-member-container">
        	<input
            className="search-member-input"
            placeholder="username 또는 이름 입력"
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
				<th>변경</th>
            </tr>
			</thead>
			<tbody>
				{(searchResult ?? members)?.map((member, index) => (
					<tr key={member.userId}>
					<td>{index + 1}</td>
					<td>{member.userFullname}</td>
					<td>{member.username}</td>
					<td>{member.userNickname}</td>
					<td>{member.userEmail}</td>
					<td>{member.userStatus}</td>
					<td>
					<button className="edit-btn">수정</button>
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