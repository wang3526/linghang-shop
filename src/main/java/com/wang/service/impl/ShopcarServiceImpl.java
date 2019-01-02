package com.wang.service.impl;

import com.wang.domain.Shopcar;
import com.wang.mapper.ShopcarMapper;
import com.wang.service.ShopcarService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ShopcarServiceImpl implements ShopcarService {
    @Resource
    private ShopcarMapper shopcarMapper;

    public void setShopcarMapper(ShopcarMapper shopcarMapper) {
        this.shopcarMapper = shopcarMapper;
    }

    //加入购物车
    @Override
    public String addShopcar(Shopcar shopcar) {
        List<Shopcar> list=shopcarMapper.getShopcarByUid(shopcar.getUId());
        String msg="";
        if (list!=null&&list.size()>0) {
            for (int i = 0; i < list.size(); i++) {
                if (list.get(i).getItemId() == shopcar.getItemId()) {
                    System.out.println("已在购物车");
                    msg = "已在购物车";
                    return msg;
                }
            }
        }
        shopcarMapper.addShopcar(shopcar);
        msg="添加购物车成功！";
        return msg;

    }

    @Override
    public List<Shopcar> getShopcarByUid(int uId) {
        return shopcarMapper.getShopcarByUid(uId);
    }

    @Override
    public List<Shopcar> show(int uId) {
        return shopcarMapper.show(uId);
    }

    @Override
    public void updateNum(Shopcar shopcar) {
        shopcarMapper.updateNum(shopcar);
    }

    @Override
    public void addOrderOne(Shopcar shopcar) {
        shopcarMapper.addShopcar(shopcar);
    }

    @Override
    public void deleteOne(int id) {
        shopcarMapper.deleteOne(id);
    }
}
