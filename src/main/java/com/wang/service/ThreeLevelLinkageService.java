package com.wang.service;

import com.wang.domain.Areas;
import com.wang.domain.Cities;
import com.wang.domain.Provinces;

import java.util.List;

public interface ThreeLevelLinkageService {
    //获取省
    public List<Provinces> getProvinces();
    //根据省id获取市
    public List<Cities> getCity(String provinceid);
    //根据市id获取县区
    public List<Areas> getArea(String cityid);
}
