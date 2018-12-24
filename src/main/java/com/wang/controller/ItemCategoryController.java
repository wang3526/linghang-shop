package com.wang.controller;

import com.alibaba.fastjson.JSON;
import com.wang.domain.ItemCategory;
import com.wang.service.ItemCategoryService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/itemCategory")
public class ItemCategoryController {
    @Resource
    private ItemCategoryService itemCategoryService;

    //获取根目录
    @RequestMapping("/getRoot.do")
    @ResponseBody
    public String getRoot(){
        List<ItemCategory> list=itemCategoryService.getRoot();
        if(list!=null&&list.size()>0){
            return JSON.toJSONString(list);
        }
        return JSON.toJSONString("false");
    }

    //验证品类名称
    @RequestMapping("/testName.do")
    @ResponseBody
    public String testName(String name){
        String name1=itemCategoryService.testName(name);
        if(name1!=null&&!name1.equals("")){
            return JSON.toJSONString("true");
        }
        return JSON.toJSONString("false");
    }

    //添加品类
    @RequestMapping("/addItemCategory.do")
    @ResponseBody
    public String addItemCategory(ItemCategory itemCategory){
        itemCategoryService.addItemCategory(itemCategory);
        return JSON.toJSONString("true");
    }

    //获取二级目录
    @RequestMapping("/getPro.do")
    @ResponseBody
    public String getPro(int parentId){
        List<ItemCategory> list=itemCategoryService.getPro(parentId);
        if(list!=null&&list.size()>0){
            return JSON.toJSONString(list);
        }
        return JSON.toJSONString("false");
    }

    //查询所有分类
    @RequestMapping("/selectAll.do")
    @ResponseBody
    public String selectAll(int root,int pro,int status,int page,int num){
        page=(page-1)*num;
        System.out.println(page);
        List<ItemCategory> list=itemCategoryService.selectAll(root,pro,status,page,num);
        return JSON.toJSONString(list);
    }

    //获取根目录
    @RequestMapping("/getRootById.do")
    @ResponseBody
    public String getRoot(int id){
        ItemCategory itemCategory=itemCategoryService.getRootById(id);
        if(itemCategory!=null){
            return JSON.toJSONString(itemCategory);
        }
        return JSON.toJSONString("false");
    }

    //修改状态
    @RequestMapping("/updateStatus.do")
    @ResponseBody
    public String updateStatus(ItemCategory itemCategory){
        itemCategoryService.updateStatus(itemCategory);
        return JSON.toJSONString("true");
    }

    //删除
    @RequestMapping("/delete.do")
    @ResponseBody
    public String delete(int id){
        itemCategoryService.delete(id);
        return JSON.toJSONString("true");
    }

    //通过id获取ItemCategory
    @RequestMapping("/getItemCategoryById.do")
    @ResponseBody
    public String getItemCategoryById(int id){
        ItemCategory itemCategory=itemCategoryService.getItemCategoryById(id);
        if(itemCategory!=null){
            return JSON.toJSONString(itemCategory);
        }
        return JSON.toJSONString("false");
    }

    //修改分类
    @RequestMapping("/editItemCategory.do")
    @ResponseBody
    public String editItemCategory(ItemCategory itemCategory){
        itemCategoryService.editItemCategory(itemCategory);
        return JSON.toJSONString("true");
    }

    //获取所有二级目录
    @RequestMapping("/getProAll.do")
    @ResponseBody
    public String getProAll(){
        List<ItemCategory> list=itemCategoryService.getProAll();
        if(list!=null&&list.size()>0){
            return JSON.toJSONString(list);
        }
        return JSON.toJSONString("false");
    }

    //首页商品
    @RequestMapping("/show.do")
    @ResponseBody
    public String getShowItem(int parentId){
        List<ItemCategory> list=itemCategoryService.getShowItem(parentId);
        return JSON.toJSONString(list);
    }

    //首页列表
    @RequestMapping("/getListItem.do")
    @ResponseBody
    public String getListItem(int id){
        List<ItemCategory> list=itemCategoryService.getListItem(id);
        return JSON.toJSONString(list);
    }
    public void setItemCategoryService(ItemCategoryService itemCategoryService) {
        this.itemCategoryService = itemCategoryService;
    }
}
