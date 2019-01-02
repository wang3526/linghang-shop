package com.wang.controller;

import com.alibaba.fastjson.JSON;
import com.wang.domain.Dispatch;
import com.wang.service.DispatchService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/dispatch")
public class DispatchController {
    @Resource
    private DispatchService dispatchService;

    @RequestMapping("/addDispatch.do")
    @ResponseBody
    public String addDispatch(Dispatch dispatch){
        dispatchService.addDispatch(dispatch);
        return JSON.toJSONString("true");
    }

    @RequestMapping("/getList.do")
    @ResponseBody
    public String getList(String province, String city, String area,String way,int page, int num){
        page=(page-1)*num;
        List<Dispatch> list=dispatchService.getList(province,city,area,way,page,num);
        return JSON.toJSONString(list);
    }

    @RequestMapping("/editDispatch.do")
    @ResponseBody
    public String editDispatch(int id){
        Dispatch dispatch=dispatchService.getDispatch(id);
        if(dispatch!=null){
            return JSON.toJSONString(dispatch);
        }
        return JSON.toJSONString("false");
    }

    @RequestMapping("/update.do")
    @ResponseBody
    public String update(Dispatch dispatch){
        dispatchService.update(dispatch);
        return JSON.toJSONString("true");
    }

    @RequestMapping("/testDest.do")
    @ResponseBody
    public String testDest(String destination){
        Dispatch dispatch=dispatchService.testDest(destination);
        if(dispatch!=null){
            return JSON.toJSONString("true");
        }
        return JSON.toJSONString("false");
    }

    //邮费
    @RequestMapping("/pay.do")
    @ResponseBody
    public String pay(int id){
        Dispatch dispatch=dispatchService.pay(id);
        return JSON.toJSONString(dispatch);
    }
    public void setDispatchService(DispatchService dispatchService) {
        this.dispatchService = dispatchService;
    }
}
