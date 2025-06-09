package com.sseuda.sseuda_server.function.reports.service;

import com.sseuda.sseuda_server.function.reports.dao.ReportsMapper;
import com.sseuda.sseuda_server.function.reports.dto.ReportsDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportsService {

    private final ReportsMapper reportsMapper;

    public ReportsService(ReportsMapper reportsMapper) {
        this.reportsMapper = reportsMapper;
    }

    public List<ReportsDTO> getAllReports() {
        return reportsMapper.selectAllReports();
    }

    public ReportsDTO getReportById(int reportId) {
        return reportsMapper.selectReport(reportId);
    }

    public List<ReportsDTO> getReportsByReporterId(int reporterId) {
        return reportsMapper.findReportsByReporterId(reporterId);
    }

    public List<ReportsDTO> getReportsByReportedId(int reportedId) {
        return reportsMapper.findReportsByReportedId(reportedId);
    }

    public void addReport(ReportsDTO reportsDTO) {
        reportsMapper.insertReport(reportsDTO);
    }

    public boolean updateReportStatus(ReportsDTO reportsDTO) {
        return reportsMapper.updateReportStatus(reportsDTO) > 0;
    }
}
