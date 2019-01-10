package com.wang.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.wang.domain.Evaluate;
import com.wang.domain.User;
import com.wang.service.EvaluateService;
import com.wang.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/evaluate")
public class EvaluateController {
    @Resource
    private EvaluateService evaluateService;

    @Resource
    private UserService userService;
    //添加评价
    @RequestMapping("/addEvaluate.do")
    @ResponseBody
    public String addEvaluate(Evaluate evaluate,HttpSession session){
        String username=(String)session.getAttribute("username");
        User user=userService.getUser(username);
        evaluate.setUId(user.getId());
        evaluateService.addEvaluate(evaluate);
        return JSON.toJSONString("评价成功！");
    }

    @RequestMapping("/showByUser.do")
    @ResponseBody
    public String toShowByUser(HttpSession session){
        String username=(String)session.getAttribute("username");
        User user=userService.getUser(username);
        List<HashMap<String,Object>> list=evaluateService.showByUser(user.getId());
        return JSON.toJSONString(list);
    }

    @RequestMapping("/show.do")
    @ResponseBody
    public String toShow(int iId){
        List<HashMap<String,Object>> list=evaluateService.show(iId);
        return JSON.toJSONString(list, SerializerFeature.DisableCircularReferenceDetect);
    }

    @RequestMapping("/getEvaluate.do")
    @ResponseBody
    public String getEvaluate(String datemin,String datemax,String username,int page,int size){
        page=(page-1)*size;
        List<HashMap<String,String>> list=evaluateService.getEvaluate(datemin, datemax, username, page, size);
        return JSON.toJSONString(list);
    }

    //修改状态
    @RequestMapping("/updateStatus.do")
    @ResponseBody
    public String updateStatus(Evaluate evaluate){
        evaluateService.updateStatus(evaluate);
        return JSON.toJSONString("true");
    }

    //删除
    @RequestMapping("/delete.do")
    @ResponseBody
    public String delete(int id){
        evaluateService.delete(id);
        return JSON.toJSONString("true");
    }

    public void setEvaluateService(EvaluateService evaluateService) {
        this.evaluateService = evaluateService;
    }
}
