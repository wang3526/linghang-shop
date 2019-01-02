package com.wang.service.impl;

import com.wang.domain.Evaluate;
import com.wang.mapper.EvaluateMapper;
import com.wang.service.EvaluateService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

@Service
public class EvaluateServiceImpl implements EvaluateService {
    @Resource
    private EvaluateMapper evaluateMapper;

    public void setEvaluateMapper(EvaluateMapper evaluateMapper) {
        this.evaluateMapper = evaluateMapper;
    }

    @Override
    public void addEvaluate(Evaluate evaluate) {
        evaluateMapper.addEvaluate(evaluate);
    }

    @Override
    public List<HashMap<String,Object>> showByUser(int uId) {
        return evaluateMapper.showByUser(uId);
    }

    @Override
    public List<HashMap<String, Object>> show(int iId) {
        return evaluateMapper.show(iId);
    }
}
