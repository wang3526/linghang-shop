package com.wang.controller;

import com.alibaba.fastjson.JSON;
import com.wang.domain.Orders;
import com.wang.domain.User;
import com.wang.service.OrderService;
import com.wang.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/order")
public class OrderController {
    @Resource
    private OrderService orderService;

    @Resource
    private UserService userService;

    public String getOrderIdByUUId(int i) {
        int machineId = i;//最大支持1-9个集群机器部署
        int hashCodeV = UUID.randomUUID().toString().hashCode();
        if(hashCodeV < 0) {//有可能是负数   10、
            hashCodeV = - hashCodeV;
        }          // 0 代表前面补充0
        //      13、         // 4 代表长度为4        14、         // d 代表参数为正数型   15、
        String code= machineId+String.format("%015d", hashCodeV);
        //System.out.println(code);
        return code;
    }

    //添加订单
    @RequestMapping("/addOrder.do")
    @ResponseBody
    public String addOrder(HttpSession session, Orders order){
        String username=(String)session.getAttribute("username");
        User user=userService.getUser(username);
        order.setUserId(user.getId());
        String code=getOrderIdByUUId(1);
        order.setCode(code);
        orderService.addOrder(order);
        return JSON.toJSONString(code);
    }

    //根据用户id获取订单
    @RequestMapping("/getOrderByUId.do")
    @ResponseBody
    public String getOrderByUId(HttpSession session){
        String username=(String)session.getAttribute("username");
        User user=userService.getUser(username);
        List<Orders> list=orderService.getOrderByUId(user.getId());
        return JSON.toJSONString(list);
    }

    //根据用户id和状态获取订单
    @RequestMapping("/getOrderByUser.do")
    @ResponseBody
    public String getOrderByUser(HttpSession session,int status){
        String username=(String)session.getAttribute("username");
        User user=userService.getUser(username);
        List<Orders> list=orderService.getOrderByUser(user.getId(),status);
        return JSON.toJSONString(list);
    }

    //根据订单编号获取订单
    @RequestMapping("/getOrderByCode.do")
    @ResponseBody
    public String getOrderByCode(String code){
        Orders orders=orderService.getOrderByCode(code);
        return JSON.toJSONString(orders);
    }

    //支付
    @RequestMapping("/pay.do")
    @ResponseBody
    public String pay(Orders orders) throws Exception{
        Date date=new Date();
        SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        dateFormat.format(date);
        Timestamp timestamp=new Timestamp(date.getTime());
        orders.setStatus(2);
        orders.setPaymentTime(timestamp);
        orderService.pay(orders);
        return JSON.toJSONString("true");
    }

    //关闭订单
    @RequestMapping("/closeOrder.do")
    @ResponseBody
    public String closeOrder(Orders orders){
        orderService.closeOrder(orders);
        return JSON.toJSONString("true");
    }

    //收货
    @RequestMapping("/receiptStatus.do")
    @ResponseBody
    public String receiptStatus(Orders orders){
        orderService.receiptStatus(orders);
        return JSON.toJSONString("true");
    }

    //申请退款
    @RequestMapping("/refundOrder.do")
    @ResponseBody
    public String refundOrder(Orders orders){
        orderService.refundOrder(orders);
        return JSON.toJSONString("true");
    }

    //根据订单编号获取订单
    @RequestMapping("/getOrderItemByCode.do")
    @ResponseBody
    public String getOrderItemByCode(String code){
        Orders orders=orderService.getOrderItemByCode(code);
        if(orders!=null){
            return JSON.toJSONString(orders);
        }else{
            return JSON.toJSONString("false");
        }
    }

    //多添加查询订单
    @RequestMapping("/getOrderAll.do")
    @ResponseBody
    public String getOrderAll(int type, String keyword, int status, int num, int page){
        page=(page-1)*num;
        List<HashMap<String,Object>> list=orderService.getOrderAll(type, keyword, status, num, page);
        return JSON.toJSONString(list);
    }

    //发货
    @RequestMapping("/updateShippingCode.do")
    @ResponseBody
    public String updateShippingCode(Orders orders){
        orderService.updateShippingCode(orders);
        return JSON.toJSONString("true");
    }

    //退款成功
    @RequestMapping("/refundSuccess.do")
    @ResponseBody
    public String refundSuccess(Orders orders){
        orderService.refundSuccess(orders);
        return JSON.toJSONString("true");
    }

    //付款成功，获取信息
    @RequestMapping("/showOne.do")
    @ResponseBody
    public String showOne(String code){
        HashMap<String,String> map=orderService.showOne(code);
        return JSON.toJSONString(map);
    }

    //获取退款订单
    @RequestMapping("/getRefundOrder.do")
    @ResponseBody
    public String getRefundOrder(HttpSession session){
        List<Orders> list=orderService.getRefundOrder(session);
        return JSON.toJSONString(list);
    }

    public void setOrderService(OrderService orderService) {
        this.orderService = orderService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }
}
