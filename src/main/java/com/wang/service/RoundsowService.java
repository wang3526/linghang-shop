package com.wang.service;

import com.wang.domain.Roundsow;

import java.util.HashMap;
import java.util.List;

public interface RoundsowService {
    //添加轮播图
    public void addRound(Roundsow roundsow);
    //列表显示
    public List<HashMap<String,Object>> showRound(int pageNo, int pageSize);
    //修改状态
    public void updateStatus(Roundsow roundsow);
    //根据状态查询
    public List<HashMap<String,Object>> query(int status,int pageNo,int pageSize);
}
