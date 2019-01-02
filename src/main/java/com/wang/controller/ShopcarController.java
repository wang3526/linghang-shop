package com.wang.controller;

import com.alibaba.fastjson.JSON;
import com.wang.domain.Shopcar;
import com.wang.domain.User;
import com.wang.service.ShopcarService;
import com.wang.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/shopcar")
public class ShopcarController {
    @Resource
    private ShopcarService shopcarService;

    @Resource
    private UserService userService;
    //加入购物车
    @RequestMapping("/addShopcar.do")
    @ResponseBody
    public String addShopcar(HttpSession session,Shopcar shopcar){
        String username=(String)session.getAttribute("username");
        User user=userService.getUser(username);
        shopcar.setUId(user.getId());
        String msg=shopcarService.addShopcar(shopcar);
        return JSON.toJSONString(msg);
    }

    @RequestMapping("/show.do")
    @ResponseBody
    public String show(HttpSession session){
        String username=(String)session.getAttribute("username");
        User user=userService.getUser(username);
        List<Shopcar> list=shopcarService.show(user.getId());
        return JSON.toJSONString(list);
    }

    //修改数量
    @RequestMapping("/updateNum.do")
    @ResponseBody
    public String updateNum(Shopcar shopcar){
        shopcarService.updateNum(shopcar);
        return JSON.toJSONString("true");
    }

    //立即购买
    @RequestMapping("/addOrderOne.do")
    @ResponseBody
    public String addOrderOne(HttpSession session,Shopcar shopcar){
        String username=(String)session.getAttribute("username");
        User user=userService.getUser(username);
        shopcar.setUId(user.getId());
        shopcarService.addOrderOne(shopcar);
        return JSON.toJSONString("true");
    }

    //删除
    @RequestMapping("/delete.do")
    @ResponseBody
    public String deleteOne(int id){
        shopcarService.deleteOne(id);
        return JSON.toJSONString("true");
    }
    public void setShopcarService(ShopcarService shopcarService) {
        this.shopcarService = shopcarService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }
}
