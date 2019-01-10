package com.wang.controller;

import com.alibaba.fastjson.JSON;
import com.wang.domain.Administrator;
import com.wang.service.AdministratorService;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/administrator")
public class AdministratorController {
    @Resource
    public AdministratorService administratorService;

    @RequestMapping("/login.do")
    @ResponseBody
    public String login(Administrator administrator, String code, HttpSession session){
        List<Map<String,String>> list=administratorService.login(administrator,code,session);
        return JSON.toJSONString(list);
    }

    @RequestMapping("/getName.do")
    @ResponseBody
    public String getName(HttpSession session){
        String name=(String)session.getAttribute("USER_SESSION_KEY");
        return JSON.toJSONString(name);
    }

    @RequestMapping("/testPwd.do")
    @ResponseBody
    public String testPwd(String password,HttpSession session){
        String name=(String)session.getAttribute("USER_SESSION_KEY");
        String pwd=administratorService.getPassword(name);
        if(pwd!=null&&password.equals(pwd)){
            return JSON.toJSONString("true");
        }
        return JSON.toJSONString("false");
    }

    @RequestMapping("/update.do")
    @ResponseBody
    public String update(Administrator administrator){
        administratorService.update(administrator);
        return JSON.toJSONString("true");
    }

    public void setAdministratorService(AdministratorService administratorService) {
        this.administratorService = administratorService;
    }
}
