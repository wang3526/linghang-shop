package com.wang.controller;

import com.alibaba.fastjson.JSON;
import com.wang.domain.Roundsow;
import com.wang.service.RoundsowService;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/round")
public class RoundsowController {
    @Resource
    private RoundsowService roundsowService;

    //添加轮播图
    @RequestMapping("/addRound.do")
    @ResponseBody
    public String addRound(HttpServletRequest request, Roundsow roundsow, MultipartFile myFile){
        String path = request.getServletContext().getRealPath("forward/images/");
        String time=String.valueOf(System.currentTimeMillis());
        //创建file对象，指定存储路径
        File descFile=new File(path+time+myFile.getOriginalFilename());
        try {
            FileUtils.copyInputStreamToFile(myFile.getInputStream(), descFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
        roundsow.setImgPath("/forward/images/"+time+myFile.getOriginalFilename());
        roundsowService.addRound(roundsow);
        return JSON.toJSONString("true");
    }

    //显示列表
    @RequestMapping("/showRound.do")
    @ResponseBody
    public String showRound(int pageNo,int pageSize){
        pageNo=(pageNo-1)*pageSize;
        List<HashMap<String,Object>> list=roundsowService.showRound(pageNo,pageSize);
        return JSON.toJSONString(list);
    }

    //修改状态
    @RequestMapping("/updateStatus.do")
    @ResponseBody
    public String updateStatus(Roundsow roundsow){
        roundsowService.updateStatus(roundsow);
        return JSON.toJSONString("true");
    }

    //根据状态查询
    @RequestMapping("/query.do")
    @ResponseBody
    public String query(int status,int pageNo,int pageSize){
        pageNo=(pageNo-1)*pageSize;
        List<HashMap<String,Object>> list=roundsowService.query(status,pageNo,pageSize);
        return JSON.toJSONString(list);
    }

    public void setRoundsowService(RoundsowService roundsowService) {
        this.roundsowService = roundsowService;
    }
}
