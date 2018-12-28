package com.wang.service.impl;

import com.wang.domain.Receiveaddress;
import com.wang.mapper.AddressMapper;
import com.wang.service.AddressService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {
    @Resource
    private AddressMapper addressMapper;

    public void setAddressMapper(AddressMapper addressMapper) {
        this.addressMapper = addressMapper;
    }

    //添加收货地址
    @Override
    public void insert(Receiveaddress receiveaddress) {
        addressMapper.insert(receiveaddress);
    }

    //显示用户的所有收货地址
    @Override
    public List<Receiveaddress> showByUid(int uId) {
        return addressMapper.showByUid(uId);
    }

    //修改状态，设置为默认地址
    @Override
    public void updateStatus(Receiveaddress receiveaddress) {
        addressMapper.updateStatus(receiveaddress);
    }

    //通过id获取指定地址
    @Override
    public Receiveaddress findById(int id) {
        return addressMapper.findById(id);
    }

    //更新收货地址
    @Override
    public void update(Receiveaddress receiveaddress) {
        addressMapper.update(receiveaddress);
    }

    //删除
    @Override
    public void delete(int id) {
        addressMapper.delete(id);
    }
}
