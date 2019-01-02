package com.wang.mapper;

import com.wang.domain.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMapper {
    //查询用户名
    public String getUserName(String username);
    //注册
    public void register(User user);
    //获取密码
    public User getPassword(String username);
    //获取用户
    public User getUser(String username);
    //更新图片
    public void updateUserImg(User user);
    //修改用户信息
    public void updateUser(User user);
    //更新密码
    public void updatePwd(User user);
    //分页显示所有用户
    public List<User> showAll(@Param("pageNo")int pageNo,@Param("pageSize")int pageSize);
    //按时间段查询分页
    public List<User> find(@Param("datemin")String datemin,@Param("datemax")String datemax,@Param("pageNo")int pageNo,@Param("pageSize")int pageSize);
    //模糊查询
    public List<User> findUserByKey(@Param("keyword")String keywords,@Param("pageNo")int pageNo,@Param("pageSize")int pageSize);
    //修改状态
    public void updateStatus(User user);
    //根据id获取用户
    public User getUserById(int id);
}
