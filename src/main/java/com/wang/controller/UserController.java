package com.wang.controller;

import com.alibaba.fastjson.JSON;
import com.wang.domain.User;
import com.wang.service.UserService;
import com.wang.util.SendTemplateSMSUtil;
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

    //验证密码
    @RequestMapping("/originCode.do")
    @ResponseBody
    public String originCode(String password,HttpSession session){
        String username=(String)session.getAttribute("username");
        String pwd=userService.originCode(username);
        if(password.equals(pwd)){
            return JSON.toJSONString("true");
        }
        return JSON.toJSONString("false");
    }

    //更新密码
    @RequestMapping("/updatePwd.do")
    @ResponseBody
    public String updatePwd(User user,HttpSession session){
        String username=(String)session.getAttribute("username");
        user.setUsername(username);
        userService.updatePwd(user);
        return JSON.toJSONString("true");
    }

    //分页显示所有用户
    @RequestMapping("/showAll.do")
    @ResponseBody
    public String showAll(int pageNo,int pageSize){
        pageNo=(pageNo-1)*pageSize;
        List<User> list=userService.showAll(pageNo,pageSize);
        return JSON.toJSONString(list);
    }

    //按时间段查询分页
    @RequestMapping("/find.do")
    @ResponseBody
    public String toFind(String datemin,String datemax,int pageNo,int pageSize){
        pageNo=(pageNo-1)*pageSize;
        List<User>list=userService.find(datemin,datemax,pageNo,pageSize);
        return JSON.toJSONString(list);
    }

    //模糊查询
    @RequestMapping("/findUserByKey.do")
    @ResponseBody
    public String findUserByKey(String keywords,int pageNo,int pageSize){
        pageNo=(pageNo-1)*pageSize;
        List<User>list=userService.findUserByKey(keywords,pageNo,pageSize);
        return JSON.toJSONString(list);
    }

    //修改状态
    @RequestMapping("/updateStatus.do")
    @ResponseBody
    public String updateStatus(User user){
        userService.updateStatus(user);
        return JSON.toJSONString("true");
    }

    //根据id获取用户
    @RequestMapping("/getUserById.do")
    @ResponseBody
    public String getUserById(int id){
        User user=userService.getUserById(id);
        if(user!=null){
            return JSON.toJSONString(user);
        }
        return JSON.toJSONString("false");
    }

    //发送短信验证码
    @RequestMapping("/sendCode.do")
    @ResponseBody
    public String sendCode(String phone,HttpSession session){
        int code=(int)(1000+Math.random()*(9999-1000+1));
        String phoneCode=String.valueOf(code);
        session.setAttribute("phoneCOde",phoneCode);
        String status=SendTemplateSMSUtil.send(phone,phoneCode);
        return status;
    }

    //保存手机号
    @RequestMapping("/updatePhone.do")
    @ResponseBody
    public String updatePhone(String phone,String code,HttpSession session){
        userService.updatePhone(phone,code,session);
        return JSON.toJSONString("true");
    }
}
