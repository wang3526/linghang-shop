package com.wang.mapper;

import com.wang.domain.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMapper {
    //查询用户名
    public String getUserName(String username)throws Exception;
    //注册
    public void register(User user) throws Exception;
    //获取密码
    public User getPassword(String username) throws Exception;
    //获取用户
    public User getUser(String username)throws Exception;
    //更新图片
    public void updateUserImg(User user)throws Exception;
    //修改用户信息
    public void updateUser(User user)throws Exception;
    //更新密码
    public void updatePwd(User user)throws Exception;
    //分页显示所有用户
    public List<User> showAll(@Param("pageNo")int pageNo,@Param("pageSize")int pageSize)throws Exception;
    //按时间段查询分页
    public List<User> find(@Param("datemin")String datemin,@Param("datemax")String datemax,@Param("pageNo")int pageNo,@Param("pageSize")int pageSize)throws Exception;
    //模糊查询
    public List<User> findUserByKey(@Param("keyword")String keywords,@Param("pageNo")int pageNo,@Param("pageSize")int pageSize)throws Exception;
    //修改状态
    public void updateStatus(User user)throws Exception;
}
