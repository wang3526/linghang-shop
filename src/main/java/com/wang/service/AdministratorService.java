package com.wang.service;

import com.wang.domain.Administrator;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

public interface AdministratorService {
    public List<Map<String,String>> login(Administrator administrator, String code, HttpSession session);
    //根据用户名获取密码
    public String getPassword(String name);
    //修改密码
    public void update(Administrator administrator);
}
