package com.wang.service;

import com.wang.domain.User;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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
    //验证密码
    public String originCode(String username);
    //更新密码
    public void updatePwd(User user);
    //分页显示所有用户信息
    public List<User> showAll(int pageNo,int pageSize);
    //按时间段查询分页
    public List<User> find(String datemin,String datemax,int pageNo,int pageSize);
    //模糊查询
    public List<User> findUserByKey(String keywords,int pageNo,int pageSize);
    //修改状态
    public void updateStatus(User user);
    //根据id获取用户
    public User getUserById(int id);
    //保存手机号
    public void updatePhone(String phone, String code, HttpSession session);
}
