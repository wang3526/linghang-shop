package com.wang.mapper;

import com.wang.domain.ItemSpecification;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public interface ItemSpecificationMapper {
    //添加产品规格
    public void addSpecification(ItemSpecification itemSpecification);
    //验证商品是否添加过参数
    public ItemSpecification testByIid(int iId);
    //多条件查询
    public List<ItemSpecification> select(@Param("brand")String brand,@Param("model")String model,@Param("page")int page,@Param("size")int size);
    //通过id获取指定对象
    public ItemSpecification getSpecificationById(int id);
    //修改
    public void editSpecification(ItemSpecification itemSpecification);
    //查询商品
    public List<HashMap<String,Object>> getItem(ItemSpecification itemSpecification);
}
