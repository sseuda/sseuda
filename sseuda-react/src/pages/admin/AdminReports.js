import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { callReportsApi, callUpdateReportStatusApi } from "../../apis/ReportsAPICalls";
import "./AdminReports.css";
import { callMemberByIdApi } from "../../apis/MemberAPICalls";

const STATUS_LIST = ['신고접수', '처리중', '처리완료'];

function AdminReports() {
	const dispatch = useDispatch();
	const reports = useSelector((state) => state.reportsReducer);
	const [sortedReports, setSortedReports] = useState([]);
	const [sortBy, setSortBy] = useState(null); // 'date' or 'reason'
	const [sortOrder, setSortOrder] = useState('asc'); // or 'desc'
	const [usernames, setUsernames] = useState({});
	const [reportType, setReportType] = useState('post'); // 'post' or 'comment'

	useEffect(() => {
		dispatch(callReportsApi());
	}, [dispatch]);

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

	const formatDate = (isoDate) => {
		const date = new Date(isoDate);
		return date.toLocaleString("ko-KR", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		});
	};

	const handleStatusChange = (reportsId, reportsStatus) => {
		dispatch(callUpdateReportStatusApi( reportsId, reportsStatus ));
	};

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
						<th>번호</th>
						<th>신고자</th>
						<th>신고 대상</th>
						<th>게시글</th>
						<th>댓글</th>
						<th onClick={() => toggleSort('reason')} style={{ cursor: "pointer" }}>
							사유 대분류 {sortBy === 'reason' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
						</th>
						<th>사유 상세</th>
						<th onClick={() => toggleSort('date')} style={{ cursor: "pointer" }}>
							신고 일자 {sortBy === 'date' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
						</th>
						<th onClick={() => toggleSort('status')} style={{ cursor: "pointer" }}>
							상태 {sortBy === 'status' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
						</th>
					</tr>
				</thead>
				<tbody>
				{sortedReports && sortedReports.length > 0 ? (
				sortedReports
					.filter(report => {
					if (reportType === 'post') return report.commentId == null;
					if (reportType === 'comment') return report.commentId !== null;
					return true;
					})
					.map((report, index) => (
					<tr key={report.reportsId}>
						<td>{index + 1}</td>
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
						<td>{report.commentId}</td>
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
		</div>
	);
}

export default AdminReports;