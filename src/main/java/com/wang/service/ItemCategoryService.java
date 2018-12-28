package com.wang.service;

import com.wang.domain.ItemCategory;

import java.util.List;

public interface ItemCategoryService {
    //获取根目录
    public List<ItemCategory> getRoot();
    //验证品类名称
    public String testName(String name);
    //添加品类
    public void addItemCategory(ItemCategory itemCategory);
    //获取二级目录
    public List<ItemCategory> getPro(int parentId);
    //查询所有分类
    public List<ItemCategory> selectAll(int root,int pro,int status,int page,int num);
    //获取根目录
    public ItemCategory getRootById(int id);
    //修改状态
    public void updateStatus(ItemCategory itemCategory);
    //删除
    public void delete(int id);
    //通过id获取ItemCategory
    public ItemCategory getItemCategoryById(int id);
    //修改分类
    public void editItemCategory(ItemCategory itemCategory);
    //获取二级目录
    public List<ItemCategory> getProAll();
    //一对多查询
    public List<ItemCategory> getShowItem(int parentId);
    //获取更多商品
    public List<ItemCategory> getShowAllItem(int parentId);
    //首页列表一对多
    public List<ItemCategory> getListItem(int id);
}
