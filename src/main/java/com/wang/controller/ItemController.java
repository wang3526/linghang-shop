package com.wang.controller;

import com.alibaba.fastjson.JSON;
import com.wang.domain.Item;
import com.wang.service.ItemService;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/item")
public class ItemController {
    @Resource
    private ItemService itemService;

    //验证商品名称
    @RequestMapping("/testTitle.do")
    @ResponseBody
    public String testTitle(String title){
        String name=itemService.testTitle(title);
        if(name!=null&&!name.equals("")){
            return JSON.toJSONString("false");
        }
        return JSON.toJSONString("true");
    }
    //添加商品
    @RequestMapping("/addItem.do")
    @ResponseBody
    public String addItem(HttpServletRequest request,Item item, MultipartFile file){
        String path=request.getServletContext().getRealPath("forward/images/");
        String time=String.valueOf(System.currentTimeMillis());
        //创建file对象，指定存储路径
        File descFile=new File(path+time+file.getOriginalFilename());
        try{
            FileUtils.copyInputStreamToFile(file.getInputStream(),descFile);
        }catch (IOException e){
            e.printStackTrace();
        }
        item.setImgPath("/forward/images/"+time+file.getOriginalFilename());
        Date date=new Date();
        SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        dateFormat.format(date);
        Timestamp timestamp=new Timestamp(date.getTime());
        item.setUpdatetime(timestamp);
        itemService.addItem(item);
        return JSON.toJSONString("true");
    }

    //多条件查询
    @RequestMapping("/select.do")
    @ResponseBody
    public String select(int cId,int status,String keyword,int size,int page){
        page=(page-1)*size;
        List<HashMap<String,Object>> list=itemService.select(cId,status,keyword,size,page);
        if(list!=null&&list.size()>0){
            return JSON.toJSONString(list);
        }
        return JSON.toJSONString("false");
    }

    //修改状态
    @RequestMapping("/updateStatus.do")
    @ResponseBody
    public String updateStatus(Item item){
        itemService.updateStatus(item);
        return JSON.toJSONString("true");
    }

    //删除
    @RequestMapping("/delete.do")
    @ResponseBody
    public String delete(int id){
        itemService.delete(id);
        return JSON.toJSONString("true");
    }

    //获取指定商品
    @RequestMapping("/getItem.do")
    @ResponseBody
    public String getItem(int id){
        List<HashMap<String,Object>> list=itemService.getItem(id);
        if(list!=null&&list.size()>0){
            return JSON.toJSONString(list);
        }
        return JSON.toJSONString("false");
    }

    //修改商品
    @RequestMapping("/editItem.do")
    @ResponseBody
    public String editItem(HttpServletRequest request,Item item,MultipartFile file){
        if(file!=null) {
            String path = request.getServletContext().getRealPath("forward/images/");
            String time=String.valueOf(System.currentTimeMillis());
            //创建file对象，指定存储路径
            File descFile=new File(path+time+file.getOriginalFilename());
            try {
                FileUtils.copyInputStreamToFile(file.getInputStream(), descFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
            item.setImgPath("/forward/images/"+time+file.getOriginalFilename());
        }
        Date date=new Date();
        SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        dateFormat.format(date);
        Timestamp timestamp=new Timestamp(date.getTime());
        item.setUpdatetime(timestamp);
        itemService.editItem(item);
        return JSON.toJSONString("true");
    }

    //根据cId获取商品
    @RequestMapping("/getItemByCid.do")
    @ResponseBody
    public String getItemByCid(int cId){
        List<Item> list=itemService.getItemByCid(cId);
        if(list!=null&&list.size()>0){
            return JSON.toJSONString(list);
        }
        return JSON.toJSONString("false");
    }

    //
    @RequestMapping("/getItemById.do")
    @ResponseBody
    public String getItemById(int id){
        Item item=itemService.getItemById(id);
        if(item!=null){
            return JSON.toJSONString(item);
        }
        return JSON.toJSONString("false");
    }

    //根据id获取同类商品
    @RequestMapping("/getCateItemById.do")
    @ResponseBody
    public String getCateItemById(int id){
        List<Item> list=itemService.getCateItemById(id);
        return JSON.toJSONString(list);
    }
    public void setItemService(ItemService itemService) {
        this.itemService = itemService;
    }
}
