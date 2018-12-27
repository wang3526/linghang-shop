package com.wang.mapper;

import com.wang.domain.Roundsow;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public interface RoundsowMapper {
    //添加轮播图
    public void addRound(Roundsow roundsow);
    //列表显示
    public List<HashMap<String,Object>> showRound(@Param("pageNo")int pageNo,@Param("pageSize")int pageSize);
    //修改状态
    public void updateStatus(Roundsow roundsow);
    //根据状态查询
    public List<HashMap<String,Object>> query(@Param("status")int status,@Param("pageNo")int pageNo,@Param("pageSize")int pageSize);
    //首页轮播
    public List<Roundsow> getHomeRound();
}
