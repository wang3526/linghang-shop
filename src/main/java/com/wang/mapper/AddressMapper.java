package com.wang.mapper;

import com.wang.domain.Receiveaddress;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressMapper {
    //添加收货地址
    public void insert(Receiveaddress receiveaddress);
    //显示用户的所有收货地址
    public List<Receiveaddress> showByUid(int uId);
    //修改状态，设置为默认地址
    public void updateStatus(Receiveaddress receiveaddress);
    //通过id获取指定地址
    public Receiveaddress findById(int id);
    //更新收货地址
    public void update(Receiveaddress receiveaddress);
    //删除
    public void delete(int id);
}
