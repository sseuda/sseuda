package com.sseuda.sseuda_server.function.alarm.controller;

import com.sseuda.sseuda_server.common.ResponseDTO;
import com.sseuda.sseuda_server.function.alarm.dto.AlarmDTO;
import com.sseuda.sseuda_server.function.alarm.service.AlarmService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alarm")
@RequiredArgsConstructor
public class AlarmController {

    private final AlarmService alarmService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<AlarmDTO>> selectAlarmsByUserId(@PathVariable int userId) {
        List<AlarmDTO> alarms = alarmService.selectAlarmsByUserId(userId);
        return ResponseEntity.ok(alarms);
    }

    @Operation(summary = "알람 확인 상태 변경", description = "알람 확인 상태를 'Y'로 변경합니다.")
    @PutMapping("/{alarmId}/check")
    public ResponseEntity<ResponseDTO> updateAlarmCheck(@RequestBody AlarmDTO alarmDTO) {
        int result = alarmService.updateAlarmCheck(alarmDTO);
        if (result > 0) {
            return ResponseEntity.ok(new ResponseDTO(HttpStatus.OK, "알람 상태 변경 성공", null));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "알람 상태 변경 실패", null));
        }
    }

    @Operation(summary = "알람 삭제", description = "알람을 삭제합니다.")
    @DeleteMapping("/delete/{alarmId}")
    public ResponseEntity<ResponseDTO> deleteAlarm(@PathVariable int alarmId) {
        int result = alarmService.deleteAlarm(alarmId);
        if (result > 0) {
            return ResponseEntity.ok(new ResponseDTO(HttpStatus.OK, "알람 삭제 성공", null));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "알람 삭제 실패", null));
        }
    }
}
