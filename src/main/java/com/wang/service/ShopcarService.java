package com.wang.service;

import com.wang.domain.Shopcar;

import java.util.List;

public interface ShopcarService {
    //加入购物车
    public String addShopcar(Shopcar shopcar);
    //查询用户购物车
    public List<Shopcar> getShopcarByUid(int uId);
    //
    public List<Shopcar> show(int uId);
    //修改数量
    public void updateNum(Shopcar shopcar);
    //立即购买
    public void addOrderOne(Shopcar shopcar);
    //删除
    public void deleteOne(int id);
}
