package com.sseuda.sseuda_server.function.alarm.service;

import com.sseuda.sseuda_server.function.alarm.dao.AlarmMapper;
import com.sseuda.sseuda_server.function.alarm.dto.AlarmDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlarmService {

    private final AlarmMapper alarmMapper;

    public List<AlarmDTO> selectAlarmsByUserId(int userId) {
        return alarmMapper.selectAlarmsByUserId(userId);
    }
}
