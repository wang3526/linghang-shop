package com.wang.mapper;

import com.wang.domain.Evaluate;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public interface EvaluateMapper {
    //添加评价
    public void addEvaluate(Evaluate evaluate);
    //根据用户id获取评论
    public List<HashMap<String,Object>> showByUser(int uId);
    //
    public List<HashMap<String,Object>> show(int iId);
    //
    public List<HashMap<String,String>> getEvaluate(@Param("datemin")String datemin,@Param("datemax")String datemax,@Param("username")String username,@Param("page")int page,@Param("size")int size);
    //修改状态
    public void updateStatus(Evaluate evaluate);
    //删除
    public void delete(int id);
}
