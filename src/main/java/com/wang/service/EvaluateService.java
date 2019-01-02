package com.wang.service;

import com.wang.domain.Evaluate;

import java.util.HashMap;
import java.util.List;

public interface EvaluateService {
    //添加评价
    public void addEvaluate(Evaluate evaluate);
    //根据用户id获取评论
    public List<HashMap<String,Object>> showByUser(int uId);
    //
    public List<HashMap<String,Object>> show(int iId);
}
