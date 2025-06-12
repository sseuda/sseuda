package com.sseuda.sseuda_server.function.alarm.controller;

import com.sseuda.sseuda_server.function.alarm.dto.AlarmDTO;
import com.sseuda.sseuda_server.function.alarm.service.AlarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
