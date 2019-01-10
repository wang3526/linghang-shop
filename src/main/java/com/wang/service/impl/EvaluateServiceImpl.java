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

    @Override
    public List<HashMap<String, String>> getEvaluate(String datemin, String datemax, String username, int page, int size) {
        return evaluateMapper.getEvaluate(datemin, datemax, username, page, size);
    }

    @Override
    public void updateStatus(Evaluate evaluate) {
        evaluateMapper.updateStatus(evaluate);
    }

    @Override
    public void delete(int id) {
        evaluateMapper.delete(id);
    }
}
