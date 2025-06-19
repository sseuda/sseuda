import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { callReportsApi, callUpdateReportStatusApi } from "../../apis/ReportsAPICalls";
import "./AdminReports.css";
import { callMemberByIdApi } from "../../apis/MemberAPICalls";

const STATUS_LIST = ['신고접수', '처리중', '처리완료'];
const ITEMS_PER_PAGE = 10;	// 페이징

function AdminReports() {
	const dispatch = useDispatch();
	const reports = useSelector((state) => state.reportsReducer);
	const [sortedReports, setSortedReports] = useState([]);
	const [sortBy, setSortBy] = useState(null); // 'date' or 'reason'
	const [sortOrder, setSortOrder] = useState('asc'); // or 'desc'
	const [usernames, setUsernames] = useState({});
	const [reportType, setReportType] = useState('post'); // 'post' or 'comment'
	const [currentPage, setCurrentPage] = useState(1);

	// 신고 목록 불러오기
	useEffect(() => {
		dispatch(callReportsApi());
	}, [dispatch]);

	// 정렬 , 타입
	useEffect(() => {
		if (reports && reports.length > 0) {
			let sorted = [...reports];
			if (sortBy === 'date') {
				sorted.sort((a, b) => {
					const dateA = new Date(a.reportsCreateAt);
					const dateB = new Date(b.reportsCreateAt);
					return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
				});
			} else if (sortBy === 'reason') {
				sorted.sort((a, b) => {
					const reasonA = a.reasonCode.toLowerCase();
					const reasonB = b.reasonCode.toLowerCase();
					if (reasonA < reasonB) return sortOrder === 'asc' ? -1 : 1;
					if (reasonA > reasonB) return sortOrder === 'asc' ? 1 : -1;
					return 0;
				});
			} else if (sortBy === 'status') {
				sorted.sort((a, b) => {
					const statusA = a.reportsStatus.toLowerCase();
					const statusB = b.reportsStatus.toLowerCase();
					if (statusA < statusB) return sortOrder === 'asc' ? -1 : 1;
					if (statusA > statusB) return sortOrder === 'asc' ? 1 : -1;
					return 0;
				});
			}
			setSortedReports(sorted);
		}
	}, [reports, sortBy, sortOrder]);

	const toggleSort = (criteria) => {
		if (sortBy === criteria) {
			// 이미 정렬 중이면 방향만 변경
			setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
		} else {
			// 새 기준으로 정렬
			setSortBy(criteria);
			setSortOrder('asc');
		}
	};

	// 날짜 포맷
	const formatDate = (isoDate) => {
		const date = new Date(isoDate);
		const datePart = date.toLocaleDateString("ko-KR", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		});
		const timePart = date.toLocaleTimeString("ko-KR", {
			hour: "2-digit",
			minute: "2-digit"
		});
		return <>{datePart}<br />{timePart}</>
	};

	const handleStatusChange = (reportsId, reportsStatus) => {
		dispatch(callUpdateReportStatusApi( reportsId, reportsStatus ));
	};

	// 사용자 이름 불러오기
	useEffect(() => {
		if (reports && reports.length > 0) {
			// 중복 제거된 userId 목록 만들기
			const userIds = [...new Set(reports.flatMap(report => [report.reporterId, report.reportedId]))];
	
			// 각 userId로 username 불러오기
			const fetchUsernames = async () => {
				const resultMap = {};
				for (const userId of userIds) {
					const result = await dispatch(callMemberByIdApi(userId));
					if (result && result.payload) {
						resultMap[userId] = result.payload.username;
					}
				}
				setUsernames(resultMap);
			};
	
			fetchUsernames();
		}
	}, [reports]);

	// 페이징
	const reportsPage = sortedReports.filter(report => {
		if (reportType === 'post') return report.commentId == null;
		if (reportType === 'comment') return report.commentId !== null;
		return true;
	});

	const totalPages = Math.ceil(reportsPage.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const pagedReports = reportsPage.slice(startIndex, startIndex + ITEMS_PER_PAGE);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<div className="admin-reports-container">
			<h4 className="report-title">▶︎ 신고 관리</h4>

			<div className="report-tabs">
				<button
					className={reportType === 'post' ? 'active' : ''}
					onClick={() => setReportType('post')}
				>
					📄 게시글 신고
				</button>
				<button
					className={reportType === 'comment' ? 'active' : ''}
					onClick={() => setReportType('comment')}
				>
					💬 댓글 신고
				</button>
			</div>

			<table className="report-table">
				<thead>
					<tr>
						<th style={{ width: "50px" }}>번호</th>
						<th style={{ width: "100px" }}>신고자</th>
						<th style={{ width: "100px" }}>신고 대상</th>
						<th style={{ width: "60px" }}>post</th>
						<th style={{ width: "50px" }}>댓글</th>
						<th onClick={() => toggleSort('reason')} style={{ cursor: "pointer", width: "120px" }}>
							사유 대분류 {sortBy === 'reason' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
						</th>
						<th style={{ width: "400px" }}>사유 상세</th>
						<th onClick={() => toggleSort('date')} style={{ cursor: "pointer", width: "130px" }}>
							신고 일자 {sortBy === 'date' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
						</th>
						<th onClick={() => toggleSort('status')} style={{ cursor: "pointer", width: "120px" }}>
							상태 {sortBy === 'status' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
						</th>
					</tr>
				</thead>
				<tbody>
					{pagedReports && pagedReports.length > 0 ? (
						pagedReports.map((report, index) => (
							<tr key={report.reportsId}>
								<td>{startIndex + index + 1}</td>
								<td>{usernames[report.reporterId] || report.reporterId}</td>
								<td>{usernames[report.reportedId] || report.reportedId}</td>
								<td>
									{report.postId ? (
										<a href={`/post/${report.postId}`} target="_blank" rel="noopener noreferrer">
											{report.postId}
										</a>
									) : (
										"-"
									)}
								</td>
								<td>{report.commentId || "-"}</td>
								<td>{report.reasonCode}</td>
								<td>{report.reasonDetail}</td>
								<td>{formatDate(report.reportsCreateAt)}</td>
								<td>
									<select
										value={report.reportsStatus}
										onChange={(e) => handleStatusChange(report.reportsId, e.target.value)}
									>
										{STATUS_LIST.map(status => (
											<option key={status} value={status}>
												{status}
											</option>
										))}
									</select>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="9" style={{ textAlign: "center" }}>
								🚫 신고 내역이 없습니다.
							</td>
						</tr>
					)}
				</tbody>
			</table>

			{/* 📌 페이지네이션 */}
			<div className="pagination">
			{currentPage > 1 && (
				<button onClick={() => handlePageChange(currentPage - 1)}>
				« 이전
				</button>
			)}

			{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
				<button
				key={page}
				className={page === currentPage ? "active-page" : ""}
				onClick={() => handlePageChange(page)}
				>
				{page}
				</button>
			))}

			{currentPage < totalPages && (
				<button onClick={() => handlePageChange(currentPage + 1)}>
				다음 »
				</button>
			)}
			</div>
		</div>
	);
}

export default AdminReports;