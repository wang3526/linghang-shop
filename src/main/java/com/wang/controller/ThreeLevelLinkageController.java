package com.wang.controller;

import com.alibaba.fastjson.JSON;
import com.wang.domain.Areas;
import com.wang.domain.Cities;
import com.wang.domain.Provinces;
import com.wang.service.ThreeLevelLinkageService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/threeLevelLinkage")
public class ThreeLevelLinkageController {
    @Resource
    private ThreeLevelLinkageService threeLevelLinkageService;

    //获取省
    @RequestMapping("/getProvinces.do")
    @ResponseBody
    public String getProvinces(){
        List<Provinces> list=threeLevelLinkageService.getProvinces();
        if(list!=null&&list.size()>0){
            return JSON.toJSONString(list);
        }
        return JSON.toJSONString("false");
    }

    //根据省id获取市
    @RequestMapping("/getCity.do")
    @ResponseBody
    public String getCity(String provinceid){
        List<Cities> list=threeLevelLinkageService.getCity(provinceid);
        if(list!=null&&list.size()>0){
            return JSON.toJSONString(list);
        }
        return JSON.toJSONString("false");
    }

    //根据市id获取县区
    @RequestMapping("/getArea.do")
    @ResponseBody
    public String getArea(String cityid){
        List<Areas> list=threeLevelLinkageService.getArea(cityid);
        if(list!=null&&list.size()>0){
            return JSON.toJSONString(list);
        }
        return JSON.toJSONString("false");
    }

    public void setThreeLevelLinkageService(ThreeLevelLinkageService threeLevelLinkageService) {
        this.threeLevelLinkageService = threeLevelLinkageService;
    }
}
