package com.wang.mapper;

import com.wang.domain.Administrator;
import org.springframework.stereotype.Repository;

@Repository
public interface AdministratorMapper {
    //验证用户名是否存在
    public Administrator testName(String name);
    public Administrator login(Administrator administrator);
    //根据用户名获取密码
    public String getPassword(String name);
    //修改密码
    public void update(Administrator administrator);
}
