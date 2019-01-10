package com.wang.service.impl;

import com.wang.domain.Administrator;
import com.wang.mapper.AdministratorMapper;
import com.wang.service.AdministratorService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdministratorServiceImpl implements AdministratorService {
    @Resource
    public AdministratorMapper administratorMapper;

    public List<Map<String,String>> login(Administrator administrator, String code, HttpSession session) {
        String code1 = "1000";
        String msg = "账号不存在";
        Map<String, String> map = new HashMap<>();
        List<Map<String,String>> list = new ArrayList<>();
        Administrator account = administratorMapper.testName(administrator.getName());
        if (account != null&& account.getName().equals(administrator.getName())) {
            Administrator administrator1=administratorMapper.login(administrator);
            if(administrator1!=null && administrator1.getPassword().equals(administrator.getPassword())){
                String valid = (String) session.getAttribute("code");
                if (code.equalsIgnoreCase(valid)) {
                    session.setAttribute("USER_SESSION_KEY", administrator.getName());
                    code1 = "1002";
                    msg = "登录成功！";
                } else {
                    code1 = "1003";
                    msg = "验证码错误！";
                }
            } else {
                code1 = "1001";
                msg = "密码错误！";
            }
        }
        map.put(code1,msg);
        list.add(map);
        return list;
    }

    @Override
    public String getPassword(String name) {
        return administratorMapper.getPassword(name);
    }

    @Override
    public void update(Administrator administrator) {
        administratorMapper.update(administrator);
    }

    public void setAdministratorMapper(AdministratorMapper administratorMapper) {
        this.administratorMapper = administratorMapper;
    }
}
