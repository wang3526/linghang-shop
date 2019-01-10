package com.wang.service;

import com.wang.domain.Orders;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;

public interface OrderService {
    //添加订单
    public void addOrder(Orders order);
    //根据订单号获取订单
    public Orders getOrderByCode(String code);
    //根据用户id获取订单
    public List<Orders> getOrderByUId(int userId);
    //根据用户id和状态获取订单
    public List<Orders> getOrderByUser(int userId,int status);
    //修改订单状态
    public void pay(Orders orders);
    //关闭订单
    public void closeOrder(Orders orders);
    //收货
    public void receiptStatus(Orders orders);
    //申请退款
    public void refundOrder(Orders orders);
    //根据订单号获取订单详情
    public Orders getOrderItemByCode(String code);
    //多条件查询
    public List<HashMap<String,Object>> getOrderAll(int type, String keyword, int status, int num, int page);
    //发货
    public void updateShippingCode(Orders orders);
    //退款成功
    public void refundSuccess(Orders orders);
    //付款成功，获取信息
    public HashMap<String,String> showOne(String code);
    //获取退款订单
    public List<Orders> getRefundOrder(HttpSession session);
}
