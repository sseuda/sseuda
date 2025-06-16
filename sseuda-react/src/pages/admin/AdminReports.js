import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { callReportsApi, callUpdateReportStatusApi } from "../../apis/ReportsAPICalls";
import "./AdminReports.css";

const STATUS_LIST = ['신고접수', '처리중', '처리완료'];

function AdminReports() {
	const dispatch = useDispatch();
	const reports = useSelector((state) => state.reportsReducer);
	const [sortedReports, setSortedReports] = useState([]);
	const [sortBy, setSortBy] = useState(null); // 'date' or 'reason'
	const [sortOrder, setSortOrder] = useState('asc'); // or 'desc'

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

	return (
		<div className="admin-reports-container">
			<h4 className="report-title">▶︎ 신고 관리</h4>
			<table className="report-table">
				<thead>
					<tr>
						<th>번호</th>
						<th>신고자</th>
						<th>신고 대상</th>
						<th onClick={() => toggleSort('reason')} style={{ cursor: "pointer" }}>
							사유 대분류 {sortBy === 'reason' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
						</th>
						<th>사유 상세</th>
						<th onClick={() => toggleSort('date')} style={{ cursor: "pointer" }}>
							신고 일자 {sortBy === 'date' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
						</th>
						<th>상태</th>
					</tr>
				</thead>
				<tbody>
					{sortedReports && sortedReports.length > 0 ? (
						sortedReports.map((report, index) => (
							<tr key={report.reportsId}>
								<td>{index + 1}</td>
								<td>{report.reporterId}</td>
								<td>{report.reportedId}</td>
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
							<td colSpan="7" style={{ textAlign: "center" }}>
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