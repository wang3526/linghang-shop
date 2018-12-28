package com.wang.service.impl;

import com.wang.domain.ItemCategory;
import com.wang.mapper.ItemCategoryMapper;
import com.wang.service.ItemCategoryService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ItemCategoryServiceImpl implements ItemCategoryService {
    @Resource
    private ItemCategoryMapper itemCategoryMapper;

    //获取根目录
    @Override
    public List<ItemCategory> getRoot() {
        return itemCategoryMapper.getRoot();
    }

    //验证品类名称
    @Override
    public String testName(String name) {
        return itemCategoryMapper.testName(name);
    }

    //添加分类
    @Override
    public void addItemCategory(ItemCategory itemCategory) {
        itemCategoryMapper.addItemCategory(itemCategory);
    }

    //根据根目录获取分类
    @Override
    public List<ItemCategory> getPro(int parentId) {
        return itemCategoryMapper.getPro(parentId);
    }

    //查询所有分类
    @Override
    public List<ItemCategory> selectAll(int root, int pro, int status, int page, int num) {
        return itemCategoryMapper.selectAll(root,pro,status,page,num);
    }

    //通过id获取根目录
    @Override
    public ItemCategory getRootById(int id) {
        return itemCategoryMapper.getRootById(id);
    }

    //修改状态
    @Override
    public void updateStatus(ItemCategory itemCategory) {
        itemCategoryMapper.updateStatus(itemCategory);
    }

    //删除
    @Override
    public void delete(int id) {
        itemCategoryMapper.delete(id);
    }

    //通过id获取指定对象
    @Override
    public ItemCategory getItemCategoryById(int id) {
        return itemCategoryMapper.getItemCategoryById(id);
    }

    @Override
    public void editItemCategory(ItemCategory itemCategory) {
        itemCategoryMapper.editItemCategory(itemCategory);
    }

    @Override
    public List<ItemCategory> getProAll() {
        return itemCategoryMapper.getProAll();
    }

    @Override
    public List<ItemCategory> getShowItem(int parentId) {
        return itemCategoryMapper.getShowItem(parentId);
    }

    @Override
    public List<ItemCategory> getShowAllItem(int parentId) {
        return itemCategoryMapper.getShowAllItem(parentId);
    }

    @Override
    public List<ItemCategory> getListItem(int id) {
        return itemCategoryMapper.getListItem(id);
    }

    public void setItemCategoryMapper(ItemCategoryMapper itemCategoryMapper) {
        this.itemCategoryMapper = itemCategoryMapper;
    }
}
