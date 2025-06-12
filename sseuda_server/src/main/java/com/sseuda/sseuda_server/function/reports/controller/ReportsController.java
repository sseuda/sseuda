package com.sseuda.sseuda_server.function.reports.controller;

import com.sseuda.sseuda_server.function.reports.dto.ReportsDTO;
import com.sseuda.sseuda_server.function.reports.service.ReportsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportsController {

    private final ReportsService reportsService;

    // 전체 신고 목록 조회
    @GetMapping
    public ResponseEntity<List<ReportsDTO>> getAllReports() {
        return ResponseEntity.ok(reportsService.getAllReports());
    }

    // 특정 신고 상세 조회
    @GetMapping("/{reportsId}")
    public ResponseEntity<ReportsDTO> getReportById(@PathVariable int reportsId) {
        return ResponseEntity.ok(reportsService.getReportById(reportsId));
    }

    // 특정 유저가 신고한 목록
    @GetMapping("/reporter/{reporterId}")
    public ResponseEntity<List<ReportsDTO>> getReportsByReporterId(@PathVariable int reporterId) {
        return ResponseEntity.ok(reportsService.getReportsByReporterId(reporterId));
    }

    // 특정 유저가 신고당한 목록
    @GetMapping("/reported/{reportedId}")
    public ResponseEntity<List<ReportsDTO>> getReportsByReportedId(@PathVariable int reportedId) {
        return ResponseEntity.ok(reportsService.getReportsByReportedId(reportedId));
    }

    // 신고 등록
    @PostMapping
    public ResponseEntity<String> addReport(@RequestBody ReportsDTO reportsDTO) {
        reportsService.addReport(reportsDTO);
        return ResponseEntity.ok("신고가 접수되었습니다.");
    }

    // 신고 상태 변경
    @PutMapping("/status")
    public ResponseEntity<String> updateReportStatus(@RequestBody ReportsDTO reportsDTO) {
        boolean result = reportsService.updateReportStatus(reportsDTO);
        if (result) {
            return ResponseEntity.ok("신고 상태가 업데이트되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("업데이트 실패");
        }
    }
}