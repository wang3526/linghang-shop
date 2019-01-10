package com.wang.service.impl;

import com.wang.domain.Orders;
import com.wang.domain.User;
import com.wang.mapper.OrderMapper;
import com.wang.mapper.UserMapper;
import com.wang.service.OrderItemService;
import com.wang.service.OrderService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Resource
    private OrderMapper orderMapper;

    @Resource
    private OrderItemService orderItemService;

    @Resource
    private UserMapper userMapper;

    @Override
    public void addOrder(Orders order) {
        orderMapper.addOrder(order);
        Orders order1=orderMapper.getOrderByCode(order.getCode());
        orderItemService.addOrderItem(order.getUserId(),order1.getId());
    }

    @Override
    public Orders getOrderByCode(String code) {
        return orderMapper.getOrderByCode(code);
    }

    //根据用户id获取订单
    @Override
    public List<Orders> getOrderByUId(int userId) {
        return orderMapper.getOrderByUId(userId);
    }

    //根据用户id和状态获取订单
    @Override
    public List<Orders> getOrderByUser(int userId, int status) {
        return orderMapper.getOrderByUser(userId,status);
    }

    //修改订单状态
    @Override
    public void pay(Orders orders) {
        orderMapper.pay(orders);
    }

    //关闭订单
    @Override
    public void closeOrder(Orders orders) {
        Date date=new Date();
        SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        dateFormat.format(date);
        Timestamp timestamp=new Timestamp(date.getTime());
        orders.setCloseTime(timestamp);
        orderMapper.closeOrder(orders);
    }

    //收货
    @Override
    public void receiptStatus(Orders orders) {
        Date date=new Date();
        SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        dateFormat.format(date);
        Timestamp timestamp=new Timestamp(date.getTime());
        orders.setRecTime(timestamp);
        orderMapper.receiptStatus(orders);
    }

    //申请退款
    @Override
    public void refundOrder(Orders orders) {
        Date date=new Date();
        SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        dateFormat.format(date);
        Timestamp timestamp=new Timestamp(date.getTime());
        orders.setRetTime(timestamp);
        orderMapper.refundOrder(orders);
    }

    //根据订单号获取订单详情
    @Override
    public Orders getOrderItemByCode(String code) {
        return orderMapper.getOrderItemByCode(code);
    }

    @Override
    public List<HashMap<String,Object>> getOrderAll(int type, String keyword, int status, int num, int page) {
        return orderMapper.getOrderAll(type, keyword, status, num, page);
    }

    //发货
    @Override
    public void updateShippingCode(Orders orders) {
        Date date=new Date();
        SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        dateFormat.format(date);
        Timestamp timestamp=new Timestamp(date.getTime());
        orders.setConsignTime(timestamp);
        orders.setStatus(3);
        orderMapper.updateShippingCode(orders);
    }

    @Override
    public void refundSuccess(Orders orders) {
        Date date=new Date();
        SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        dateFormat.format(date);
        Timestamp timestamp=new Timestamp(date.getTime());
        orders.setSretTime(timestamp);
        orderMapper.refundSuccess(orders);
    }

    @Override
    public HashMap<String, String> showOne(String code) {
        return orderMapper.showOne(code);
    }

    @Override
    public List<Orders> getRefundOrder(HttpSession session) {
        String username=(String)session.getAttribute("username");
        User user=userMapper.getUser(username);
        return orderMapper.getRefundOrder(user.getId());
    }


    public void setOrderItemService(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    public void setOrderMapper(OrderMapper orderMapper) {
        this.orderMapper = orderMapper;
    }

    public void setUserMapper(UserMapper userMapper) {
        this.userMapper = userMapper;
    }
}
