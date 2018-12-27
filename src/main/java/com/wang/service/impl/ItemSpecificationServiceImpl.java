package com.wang.service.impl;

import com.wang.domain.ItemSpecification;
import com.wang.mapper.ItemSpecificationMapper;
import com.wang.service.ItemSpecificationService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ItemSpecificationServiceImpl implements ItemSpecificationService {
    @Resource
    private ItemSpecificationMapper itemSpecificationMapper;

    public void setItemSpecificationMapper(ItemSpecificationMapper itemSpecificationMapper) {
        this.itemSpecificationMapper = itemSpecificationMapper;
    }

    //添加产品规格
    @Override
    public void addSpecification(ItemSpecification itemSpecification) {
        itemSpecificationMapper.addSpecification(itemSpecification);
    }

    //验证商品是否添加过参数
    @Override
    public ItemSpecification testByIid(int iId) {
        return itemSpecificationMapper.testByIid(iId);
    }

    //多条件查询
    @Override
    public List<ItemSpecification> select(String brand, String model, int page, int size) {
        return itemSpecificationMapper.select(brand,model,page,size);
    }

    @Override
    public ItemSpecification getSpecificationById(int id) {
        return itemSpecificationMapper.getSpecificationById(id);
    }

    @Override
    public void editSpecification(ItemSpecification itemSpecification) {
        itemSpecificationMapper.editSpecification(itemSpecification);
    }
}
