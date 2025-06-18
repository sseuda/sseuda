import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './ReportPopup.module.css';
import { callAddReportApi } from '../../apis/ReportsAPICalls';

function ReportPopup({ reporterId, reportedId, postId = null, commentId = null, onClose }) {
	const dispatch = useDispatch();
	const [reasonCode, setReasonCode] = useState('');
	const [reasonDetail, setReasonDetail] = useState('');

	const handleSubmit = () => {
    const form = {
		reporterId,
		reportedId,
		postId,
		commentId,
		reasonCode,
		reasonDetail,
    };

    console.log('신고 폼 제출:', form);
    dispatch(callAddReportApi(form));
    alert('신고가 접수되었습니다.');
    onClose();
	};

	const targetLabel = commentId ? '댓글 신고' : '게시글 신고';

	return (
    <div className={styles.popupOverlay}>
	<div className={styles.popupBox}>
        <h3>{targetLabel}</h3>

        {/* <label>신고 사유</label> */}
        <select value={reasonCode} onChange={(e) => setReasonCode(e.target.value)}>
			<option value="" disabled hidden>신고 사유 선택</option>
			<option value="ABUSE">욕설/비방</option>
			<option value="SPAM">도배/광고</option>
			<option value="FALSE_INFO">허위정보</option>
			<option value="PRIVACY">개인정보 노출</option>
			<option value="HARASSMENT">괴롭힘/따돌림</option>
			<option value="HATE">혐오/차별</option>
			<option value="ETC">기타</option>
        </select>

        <textarea
			placeholder="신고 상세 내용을 입력해주세요"
			value={reasonDetail}
			onChange={(e) => setReasonDetail(e.target.value)}
        />

        <div className={styles.popupButtons}>
			<button onClick={onClose}>취소</button>
			<button onClick={handleSubmit}>신고 제출</button>
			</div>
		</div>
		</div>
	);
}

export default ReportPopup;