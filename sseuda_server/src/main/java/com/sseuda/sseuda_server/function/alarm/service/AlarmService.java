package com.sseuda.sseuda_server.function.alarm.service;

import com.sseuda.sseuda_server.function.alarm.dao.AlarmMapper;
import com.sseuda.sseuda_server.function.alarm.dto.AlarmDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlarmService {

    private final AlarmMapper alarmMapper;

    public List<AlarmDTO> selectAlarmsByUserId(int userId) {
        return alarmMapper.selectAlarmsByUserId(userId);
    }

    @Transactional
    public int updateAlarmCheck(AlarmDTO alarmDTO) {
        return alarmMapper.updateAlarmCheck(alarmDTO);
    }

    @Transactional
    public int deleteAlarm(int alarmId) {
        return alarmMapper.deleteAlarm(alarmId);
    }
}
