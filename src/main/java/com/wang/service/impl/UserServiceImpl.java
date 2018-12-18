package com.wang.service.impl;

import com.wang.domain.User;
import com.wang.mapper.UserMapper;
import com.wang.service.UserService;
import org.springframework.orm.hibernate5.SessionHolder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
    @Resource
    private UserMapper userMapper;
    //验证用户名
    @Override
    public String getUserName(String username) {
        try {
            return userMapper.getUserName(username);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    //注册
    @Override
    public void register(User user) {
        try {
            userMapper.register(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //登录
    @Override
    public List<Map<String,String>> login(User user, HttpServletRequest request) {
        Map<String,String> map=new HashMap<>();
        List<Map<String,String>> list=new ArrayList<>();
        try {
            String name=userMapper.getUserName(user.getUsername());
            if(name==null){
                map.put("1001","用户名不存在");
                list.add(map);
            }
            User user1=userMapper.getPassword(user.getUsername());
            if(user1!=null){
                if(user1.getStatus()==1){
                    map.put("1002","用户不可用");
                    list.add(map);
                }
                if(user1.getPassword().equals(user.getPassword())){
                    map.put("1000","登录成功");
                    list.add(map);
                    HttpSession session=request.getSession();
                    session.setAttribute("username",user.getUsername());
                }else {
                    map.put("1003","密码错误");
                    list.add(map);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    //获取用户
    @Override
    public User getUser(String username) {
        try {
            return userMapper.getUser(username);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    //更新用户图片
    @Override
    public void updateUserImg(User user) {
        try {
            userMapper.updateUserImg(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //更新用户信息
    @Override
    public void updateUser(User user) {
        try {
            userMapper.updateUser(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void setUserMapper(UserMapper userMapper) {
        this.userMapper = userMapper;
    }
}
