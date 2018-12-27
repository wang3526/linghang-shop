package com.wang.service;

import com.wang.domain.Item;

import java.util.HashMap;
import java.util.List;

public interface ItemService {
    //验证商品名称
    public String testTitle(String title);
    //添加商品
    public void addItem(Item item);
    //多条件查询
    public List<HashMap<String,Object>> select(int cId, int status, String keyword, int size, int page);
    //修改状态
    public void updateStatus(Item item);
    //删除
    public void delete(int id);
    //获取指定商品
    public List<HashMap<String,Object>> getItem(int id);
    //修改商品
    public void editItem(Item item);
    //根据cId获取商品
    public List<Item> getItemByCid(int cId);
    //
    public Item getItemById(int id);
    //根据id获取同类商品
    public List<Item> getCateItemById(int id);
}
