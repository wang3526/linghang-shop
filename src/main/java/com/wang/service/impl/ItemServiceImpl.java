package com.wang.service.impl;

import com.wang.domain.Item;
import com.wang.mapper.ItemMapper;
import com.wang.service.ItemService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {
    @Resource
    private ItemMapper itemMapper;

    public void setItemMapper(ItemMapper itemMapper) {
        this.itemMapper = itemMapper;
    }

    //验证商品名称
    @Override
    public String testTitle(String title) {
        return itemMapper.testTitle(title);
    }

    //添加商品
    @Override
    public void addItem(Item item) {
        itemMapper.addItem(item);
    }

    //多条件查询
    @Override
    public List<HashMap<String,Object>> select(int cId, int status, String keyword, int size, int page) {
        return itemMapper.select(cId,status,keyword,size,page);
    }

    //修改状态
    @Override
    public void updateStatus(Item item) {
        itemMapper.updateStatus(item);
    }

    //删除
    @Override
    public void delete(int id) {
        itemMapper.delete(id);
    }

    //获取指定商品
    @Override
    public List<HashMap<String, Object>> getItem(int id) {
        return itemMapper.getItem(id);
    }

    //修改商品
    @Override
    public void editItem(Item item) {
        itemMapper.editItem(item);
    }

    //根据cId获取商品
    @Override
    public List<Item> getItemByCid(int cId) {
        return itemMapper.getItemByCid(cId);
    }

    @Override
    public Item getItemById(int id) {
        return itemMapper.getItemById(id);
    }

    //根据id获取同类商品
    @Override
    public List<Item> getCateItemById(int id) {
        return itemMapper.getCateItemById(id);
    }
}
