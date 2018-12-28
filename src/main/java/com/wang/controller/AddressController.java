package com.wang.controller;

import com.alibaba.fastjson.JSON;
import com.wang.domain.Receiveaddress;
import com.wang.domain.User;
import com.wang.service.AddressService;
import com.wang.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/address")
public class AddressController {
    @Resource
    private AddressService addressService;
    @Resource
    private UserService userService;

    //添加收货地址
    @RequestMapping("/insert.do")
    @ResponseBody
    public String insert(HttpSession session, Receiveaddress receiveaddress){
        String username=(String)session.getAttribute("username");
        User user=userService.getUser(username);
        receiveaddress.setUId(user.getId());
        addressService.insert(receiveaddress);
        return JSON.toJSONString("true");
    }

    //显示用户的所有收货地址
    @RequestMapping("/showByUid.do")
    @ResponseBody
    public String showByUid(HttpSession session){
        String username=(String)session.getAttribute("username");
        User user=userService.getUser(username);
        List<Receiveaddress> list=addressService.showByUid(user.getId());
        return JSON.toJSONString(list);

    }

    //修改状态，设置为默认地址
    @RequestMapping("/updateStatus.do")
    @ResponseBody
    public String updateStatus(Receiveaddress receiveaddress){
        addressService.updateStatus(receiveaddress);
        return JSON.toJSONString("true");
    }

    //通过id获取指定地址
    @RequestMapping("/findById.do")
    @ResponseBody
    public String findById(int id){
        Receiveaddress receiveaddress=addressService.findById(id);
        return JSON.toJSONString(receiveaddress);
    }

    //更新地址
    @RequestMapping("/update.do")
    @ResponseBody
    public String update(Receiveaddress receiveaddress){
        addressService.update(receiveaddress);
        return JSON.toJSONString("true");
    }

    //删除
    @RequestMapping("/delete.do")
    @ResponseBody
    public String delete(int id){
        addressService.delete(id);
        return JSON.toJSONString("true");
    }

    public void setAddressService(AddressService addressService) {
        this.addressService = addressService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }
}
