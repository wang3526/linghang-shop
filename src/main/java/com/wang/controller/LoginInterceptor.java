package com.wang.controller;

import com.alibaba.fastjson.JSON;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String path = request.getContextPath();
        String uri=request.getRequestURI();
        String str=uri.split("/")[2];
        String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
        if(str.equals("background")){
            Object admin=request.getSession().getAttribute("USER_SESSION_KEY");
            if (admin == null) {
                System.out.println("尚未登录，调到登录页面");
//            response.sendRedirect(basePath+"background/login.html");
                response.sendRedirect(basePath+"background/login.html");
                return false;
            }
        }else{
            Object user = request.getSession().getAttribute("username");
            if (user == null) {
                String XRequested =request.getHeader("X-Requested-With");
                if("XMLHttpRequest".equals(XRequested)){
                    response.getWriter().write(JSON.toJSONString("IsAjax"));
                    return false;
                }else{
                    System.out.println("尚未登录，调到登录页面");
//            response.sendRedirect(basePath+"background/login.html");
                    response.sendRedirect(basePath+"forward/home/login.html");
                    return false;
                }
            }
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("postHandle");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("afterCompletion");
    }
}
