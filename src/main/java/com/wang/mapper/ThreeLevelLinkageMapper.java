package com.wang.mapper;

import com.wang.domain.Areas;
import com.wang.domain.Cities;
import com.wang.domain.Provinces;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThreeLevelLinkageMapper {
    //获取省
    public List<Provinces> getProvinces();
    //根据省id获取市
    public List<Cities> getCity(String provinceid);
    //根据市id获取县区
    public List<Areas> getArea(String cityid);
}
