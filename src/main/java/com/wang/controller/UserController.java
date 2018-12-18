package com.wang.controller;

import com.alibaba.fastjson.JSON;
import com.wang.domain.User;
import com.wang.service.UserService;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class UserController {
    @Resource
    private UserService userService;

    //验证用户名
    @RequestMapping("/getUserName.do")
    @ResponseBody
    public String getUserName(String username){
        String name=userService.getUserName(username);
        if(name!=null&&(!name.equals(""))){
            if(name.equals(username)){
                return JSON.toJSONString("false");
            }
        }
        return JSON.toJSONString("true");
    }

    //注册
    @RequestMapping("/register.do")
    @ResponseBody
    public String register(User user){
        userService.register(user);
        return JSON.toJSONString("true");
    }

    //登录
    @RequestMapping("/login.do")
    @ResponseBody
    public String login(User user, HttpServletRequest request){
        List list=userService.login(user,request);
        return JSON.toJSONString(list);
    }
    //获取用户
    @RequestMapping("/getUser.do")
    @ResponseBody
    public String getUser(HttpSession session){
        String username=(String)session.getAttribute("username");
        User user=userService.getUser(username);
        if(user!=null){
            return JSON.toJSONString(user);
        }
        return JSON.toJSONString("false");
    }

    //更新图片
    @RequestMapping("/updateUserImg.do")
    @ResponseBody
    public String updateUserImg(MultipartFile myFile,HttpServletRequest request){
        String path=request.getServletContext().getRealPath("forward/images/");
        String time=String.valueOf(System.currentTimeMillis());
        //创建file对象，指定存储路径
        File descFile=new File(path+time+myFile.getOriginalFilename());
        try{
            FileUtils.copyInputStreamToFile(myFile.getInputStream(),descFile);
        }catch (IOException e){
            e.printStackTrace();
        }
        String username=(String)request.getSession().getAttribute("username");
        User user=new User();
        user.setUsername(username);
        user.setImgPath("/forward/images/"+time+myFile.getOriginalFilename());
        userService.updateUserImg(user);
        return JSON.toJSONString("true");
    }

    //修改用户信息
    @RequestMapping("/updateUser.do")
    @ResponseBody
    public String updateUser(User user,HttpSession session){
        String username=(String)session.getAttribute("username");
        user.setUsername(username);
        userService.updateUser(user);
        return JSON.toJSONString("true");
    }
}
