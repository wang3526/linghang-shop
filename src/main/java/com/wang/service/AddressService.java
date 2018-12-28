package com.wang.service;

import com.wang.domain.Receiveaddress;

import java.util.List;

public interface AddressService {
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
