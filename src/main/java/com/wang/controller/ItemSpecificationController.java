package com.wang.controller;

import com.alibaba.fastjson.JSON;
import com.wang.domain.ItemSpecification;
import com.wang.service.ItemSpecificationService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/itemSpecification")
public class ItemSpecificationController {
    @Resource
    private ItemSpecificationService itemSpecificationService;

    //添加产品规格
    @RequestMapping("/addSpecification.do")
    @ResponseBody
    public String addSpecification(ItemSpecification itemSpecification){
        itemSpecificationService.addSpecification(itemSpecification);
        return JSON.toJSONString("true");
    }

    //验证商品是否添加过参数
    @RequestMapping("/testByIid.do")
    @ResponseBody
    public String testByIid(int iId){
        ItemSpecification itemSpecification=itemSpecificationService.testByIid(iId);
        if(itemSpecification!=null){
            return JSON.toJSONString("true");
        }
        return JSON.toJSONString("false");
    }

    //多条件查询
    @RequestMapping("/select.do")
    @ResponseBody
    public String select(String brand,String model,int page,int size){
        page=(page-1)*size;
        List<ItemSpecification> list=itemSpecificationService.select(brand,model,page,size);
        if(list!=null&&list.size()>0){
            return JSON.toJSONString(list);
        }
        return JSON.toJSONString("false");
    }

    //通过id获取指定对象
    @RequestMapping("getSpecificationById.do")
    @ResponseBody
    public String getSpecificationById(int id){
        ItemSpecification itemSpecification=itemSpecificationService.getSpecificationById(id);
        if(itemSpecification!=null){
            return JSON.toJSONString(itemSpecification);
        }
        return JSON.toJSONString("false");
    }

    //修改
    @RequestMapping("/editSpecification.do")
    @ResponseBody
    public String editSpecification(ItemSpecification itemSpecification){
        itemSpecificationService.editSpecification(itemSpecification);
        return JSON.toJSONString("true");
    }

    //查询商品
    @RequestMapping("/getItem.do")
    @ResponseBody
    public String getItem(ItemSpecification itemSpecification){
        List<HashMap<String,Object>> list=itemSpecificationService.getItem(itemSpecification);
        return JSON.toJSONString(list);
    }
    public void setItemSpecificationService(ItemSpecificationService itemSpecificationService) {
        this.itemSpecificationService = itemSpecificationService;
    }
}
