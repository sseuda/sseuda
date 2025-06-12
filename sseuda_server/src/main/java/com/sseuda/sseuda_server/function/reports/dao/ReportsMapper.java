package com.sseuda.sseuda_server.function.reports.dao;

import com.sseuda.sseuda_server.function.reports.dto.ReportsDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReportsMapper {

    // 신고목록 전체 조회
    List<ReportsDTO> selectAllReports();

    // 신고내역 상세 조회
    ReportsDTO selectReport(int reportsId);

    // 특정 유저가 신고한 목록
    List<ReportsDTO>findReportsByReporterId(int reporterId);

    // 특정 유저가 신고된 목록
    List<ReportsDTO>findReportsByReportedId(int reportedId);

    // 신고 등록
    void insertReport(ReportsDTO reportsDTO);

    // 신고 상태 변경
    int updateReportStatus(ReportsDTO reportsDTO);

}
