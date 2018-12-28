package com.wang.service.impl;

import com.wang.domain.Areas;
import com.wang.domain.Cities;
import com.wang.domain.Provinces;
import com.wang.mapper.ThreeLevelLinkageMapper;
import com.wang.service.ThreeLevelLinkageService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ThreeLevelLinkageServiceImpl implements ThreeLevelLinkageService {
    @Resource
    private ThreeLevelLinkageMapper threeLevelLinkageMapper;

    public void setThreeLevelLinkageMapper(ThreeLevelLinkageMapper threeLevelLinkageMapper) {
        this.threeLevelLinkageMapper = threeLevelLinkageMapper;
    }

    //获取省
    @Override
    public List<Provinces> getProvinces() {
        return threeLevelLinkageMapper.getProvinces();
    }

    //根据省id获取市
    @Override
    public List<Cities> getCity(String provinceid) {
        return threeLevelLinkageMapper.getCity(provinceid);
    }

    @Override
    public List<Areas> getArea(String cityid) {
        return threeLevelLinkageMapper.getArea(cityid);
    }
}
