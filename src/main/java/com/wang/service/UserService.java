package com.wang.service;

import com.wang.domain.User;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public interface UserService {
    //获取用户名
    public String getUserName(String username);
    //注册
    public void register(User user);
    //登录
    public List<Map<String,String>> login(User user, HttpServletRequest request);
    //获取用户
    public User getUser(String username);
    //更新用户图片
    public void updateUserImg(User user);
    //更新用户信息
    public void updateUser(User user);
}
