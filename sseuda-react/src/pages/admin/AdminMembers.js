import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	CallMemberSearchApi,
	callMembersApi,
	callUpdateStatusApi,
} from "../../apis/MemberAPICalls";
import "./AdminMembers.css";

const ITEMS_PER_PAGE = 10;

function AdminMembers() {
	const dispatch = useDispatch();

	const [keyword, setKeyword] = useState("");
	const [searchResult, setSearchResult] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	// 전체 회원 조회
	useEffect(() => {
		dispatch(callMembersApi());
	}, [dispatch]);

	const members = useSelector((state) => state.memberReducer.GET_MEMBER_ALL);

	// 회원 검색
	const searchMemberHandler = async () => {
		if (!keyword.trim()) {
			alert("username 또는 이름을 입력하세요.");
			return;
		}

		const result = await dispatch(CallMemberSearchApi(keyword));

		if (result && result.payload) {
			setSearchResult(result.payload);
			setCurrentPage(1); // 검색 결과 있을 경우 첫 페이지로
		} else {
			setSearchResult([]);
		}
	};

	// 회원 상태 토글
	const toggleUserStatus = (userId, currentStatus) => {
		const newStatus = currentStatus === "활성" ? "비활성" : "활성";

		dispatch(callUpdateStatusApi(userId, newStatus))
			.then(() => {
				alert(`회원 상태가 '${newStatus}'로 변경되었습니다.`);
				dispatch(callMembersApi());
			})
			.catch(() => {
				alert("회원 상태 변경에 실패했습니다.");
			});
	};

	// 페이지네이션 계산
	const displayedMembers = (searchResult ?? members) || [];
	const totalPages = Math.ceil(displayedMembers.length / ITEMS_PER_PAGE);
	const pagedMembers = displayedMembers.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
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
						{pagedMembers.length > 0 ? (
							pagedMembers.map((member, index) => (
								<tr
									key={member.userId}
									style={{
										backgroundColor:
											index % 2 === 0
												? "rgba(252, 239, 159, 0.5)"
												: "rgba(251, 245, 204, 0.5)",
									}}
								>
									<td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
									<td>{member.userFullname}</td>
									<td>{member.username}</td>
									<td>{member.userNickname}</td>
									<td>{member.userEmail}</td>
									<td>{member.userStatus}</td>
									<td>
										{member.userStatus === "탈퇴" ? (
											<span style={{ color: "gray" }}>변경 불가</span>
										) : (
											<label className="switch">
												<input
													type="checkbox"
													checked={member.userStatus === "활성"}
													onChange={() =>
														toggleUserStatus(
															member.userId,
															member.userStatus
														)
													}
												/>
												<span className="slider round"></span>
											</label>
										)}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="7" style={{ textAlign: "center" }}>
									🔍 일치하는 회원이 없습니다.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* 페이지네이션 */}
			{totalPages > 1 && (
				<div className="pagination">
					{currentPage > 1 && (
						<button onClick={() => handlePageChange(currentPage - 1)}>« 이전</button>
					)}

					{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
						<button
							key={page}
							className={page === currentPage ? "active-page" : ""}
							onClick={() => handlePageChange(page)}
						>
							{page}
						</button>
					))}

					{currentPage < totalPages && (
						<button onClick={() => handlePageChange(currentPage + 1)}>다음 »</button>
					)}
				</div>
			)}
		</div>
	);
}

export default AdminMembers;