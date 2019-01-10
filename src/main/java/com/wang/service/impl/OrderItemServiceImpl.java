package com.wang.service.impl;

import com.wang.domain.Item;
import com.wang.domain.OrderItem;
import com.wang.domain.Shopcar;
import com.wang.mapper.ItemMapper;
import com.wang.mapper.OrderItemMapper;
import com.wang.mapper.ShopcarMapper;
import com.wang.service.OrderItemService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class OrderItemServiceImpl implements OrderItemService {
    @Resource
    private OrderItemMapper orderItemMapper;

    @Resource
    private ShopcarMapper shopcarMapper;

    @Resource
    private ItemMapper itemMapper;

    @Override
    public void addOrderItem(int userId,int orderId){
        List<Shopcar> list=shopcarMapper.getShopcarByUid(userId);
        for(int i=0;i<list.size();i++){
            OrderItem orderItem=new OrderItem();
            Item item=itemMapper.selectOneItem(list.get(i).getItemId());
            orderItem.setTitle(item.getTitle());
            orderItem.setPicPath(item.getImgPath());
            orderItem.setItemId(list.get(i).getItemId());
            orderItem.setOrderId(orderId);
            orderItem.setNum(list.get(i).getNum());
            orderItem.setPrice(list.get(i).getPrice());
            orderItem.setTotalFee(list.get(i).getNum()*list.get(i).getPrice());
            orderItem.setColor(list.get(i).getColor());
            orderItem.setMemory(list.get(i).getMemory());
            orderItemMapper.addOrderItem(orderItem);
            itemMapper.reduceNum(list.get(i).getItemId(),list.get(i).getNum());
        }
        shopcarMapper.delete(userId);
    }

    public void setOrderItemMapper(OrderItemMapper orderItemMapper) {
        this.orderItemMapper = orderItemMapper;
    }

    public void setShopcarMapper(ShopcarMapper shopcarMapper) {
        this.shopcarMapper = shopcarMapper;
    }

    public void setItemMapper(ItemMapper itemMapper) {
        this.itemMapper = itemMapper;
    }
}
