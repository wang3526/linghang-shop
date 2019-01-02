package com.wang.mapper;

import com.wang.domain.OrderItem;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemMapper {
    //添加订单项
    public void addOrderItem(OrderItem orderItem);
}
