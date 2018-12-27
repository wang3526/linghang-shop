package com.wang.mapper;

import com.wang.domain.Item;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public interface ItemMapper {
    //验证商品名称
    public String testTitle(String title);
    //添加商品
    public void addItem(Item item);
    //多条件查询
    public List<HashMap<String,Object>> select(@Param("cId")int cId, @Param("status")int status, @Param("keyword")String keyword, @Param("size")int size, @Param("page")int page);
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
