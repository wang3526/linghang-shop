package com.wang.mapper;

import com.wang.domain.User;
import org.mybatis.spring.annotation.MapperScan;

@MapperScan
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
}
