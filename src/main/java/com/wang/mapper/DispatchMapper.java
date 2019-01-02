package com.wang.mapper;

import com.wang.domain.Dispatch;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DispatchMapper {
    //添加配送费
    public void addDispatch(Dispatch dispatch);
    //获取配送费列表
    public List<Dispatch> getList(@Param("province")String province,@Param("city")String city,@Param("area")String area,@Param("way")String way,@Param("page")int page,@Param("num")int num);
    //获取
    public Dispatch getDispatch(int id);
    //修改
    public void update(Dispatch dispatch);
    //验证目的地
    public Dispatch testDest(String destination);
    //邮费
    public Dispatch pay(@Param("city")String city);
}
