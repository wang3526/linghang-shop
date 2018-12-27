package com.wang.service.impl;

import com.wang.domain.Roundsow;
import com.wang.mapper.RoundsowMapper;
import com.wang.service.RoundsowService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

@Service
public class RoundsowServiceImpl implements RoundsowService {
    @Resource
    private RoundsowMapper roundsowMapper;

    //添加轮播图
    @Override
    public void addRound(Roundsow roundsow) {
        roundsowMapper.addRound(roundsow);
    }

    //列表显示
    @Override
    public List<HashMap<String, Object>> showRound(int pageNo, int pageSize) {
        return roundsowMapper.showRound(pageNo,pageSize);
    }

    //修改状态
    @Override
    public void updateStatus(Roundsow roundsow) {
        roundsowMapper.updateStatus(roundsow);
    }

    @Override
    public List<HashMap<String, Object>> query(int status, int pageNo, int pageSize) {
        return roundsowMapper.query(status,pageNo,pageSize);
    }

    @Override
    public List<Roundsow> getHomeRound() {
        return roundsowMapper.getHomeRound();
    }

    public void setRoundsowMapper(RoundsowMapper roundsowMapper) {
        this.roundsowMapper = roundsowMapper;
    }
}
