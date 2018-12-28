package com.wang.service.impl;

import com.wang.domain.Dispatch;
import com.wang.mapper.DispatchMapper;
import com.wang.service.DispatchService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class DispatchServiceImpl implements DispatchService {
    @Resource
    private DispatchMapper dispatchMapper;
    @Override
    public void addDispatch(Dispatch dispatch) {
        dispatchMapper.addDispatch(dispatch);
    }

    @Override
    public List<Dispatch> getList(String province, String city, String area,String way, int page, int num) {
        return dispatchMapper.getList(province,city,area,way,page,num);
    }

    @Override
    public Dispatch getDispatch(int id) {
        return dispatchMapper.getDispatch(id);
    }

    @Override
    public void update(Dispatch dispatch) {
        dispatchMapper.update(dispatch);
    }

    @Override
    public Dispatch testDest(String destination) {
        return dispatchMapper.testDest(destination);
    }

    public void setDispatchMapper(DispatchMapper dispatchMapper) {
        this.dispatchMapper = dispatchMapper;
    }
}
