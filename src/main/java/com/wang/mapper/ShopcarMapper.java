package com.wang.mapper;

import com.wang.domain.Shopcar;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShopcarMapper {
    //加入购物车
    public void addShopcar(Shopcar shopcar);
    //查询用户购物车
    public List<Shopcar> getShopcarByUid(int uId);
    //
    public List<Shopcar> show(int uId);
    //修改数量
    public void updateNum(Shopcar shopcar);
    //清空购物车
    public void delete(int uId);
    //删除
    public void deleteOne(int id);
}
