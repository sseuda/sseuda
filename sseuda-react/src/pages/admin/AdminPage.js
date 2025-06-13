import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


function AdminPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const goToReports = () => {
		navigate('/api/reports');
	};

	
	return (
		<div>
			<h1>관리자 페이지</h1>
			<button onClick={goToReports}>
				신고관리
			</button>
			<button>게시글 및 댓글 관리</button>
		</div>
	)
}

export default AdminPage;