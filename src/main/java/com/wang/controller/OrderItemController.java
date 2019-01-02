package com.wang.controller;

import com.wang.service.OrderItemService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

@Controller
@RequestMapping("/orderItem")
public class OrderItemController {
    @Resource
    private OrderItemService orderItemService;

    public void setOrderItemService(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }
}
