package com.sseuda.sseuda_server.function.alarm.dao;

import com.sseuda.sseuda_server.function.alarm.dto.AlarmDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AlarmMapper {

    List<AlarmDTO> selectAlarmsByUserId(int userId);

    int insertAlarmForComment(AlarmDTO alarmDTO);

    int updateAlarmCheck(AlarmDTO alarmDTO);

    int deleteAlarm(int alarmId);

}
