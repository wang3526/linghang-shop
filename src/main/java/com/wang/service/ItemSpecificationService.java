package com.wang.service;

import com.wang.domain.ItemSpecification;

import java.util.List;

public interface ItemSpecificationService {
    //添加产品规格
    public void addSpecification(ItemSpecification itemSpecification);
    //验证商品是否添加过参数
    public ItemSpecification testByIid(int iId);
    //多条件查询
    public List<ItemSpecification> select(String brand,String model,int page,int size);
    //通过id获取指定对象
    public ItemSpecification getSpecificationById(int id);
    //修改
    public void editSpecification(ItemSpecification itemSpecification);
}
