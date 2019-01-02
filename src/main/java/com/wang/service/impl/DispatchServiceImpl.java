package com.wang.service.impl;

import com.wang.domain.Dispatch;
import com.wang.domain.Receiveaddress;
import com.wang.mapper.AddressMapper;
import com.wang.mapper.DispatchMapper;
import com.wang.service.DispatchService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.List;

@Service
public class DispatchServiceImpl implements DispatchService {
    @Resource
    private DispatchMapper dispatchMapper;

    @Resource
    private AddressMapper addressMapper;

    @Override
    public void addDispatch(Dispatch dispatch) {
        dispatchMapper.addDispatch(dispatch);
    }

    @Override
    public List<Dispatch> getList(String province, String city, String area,String way, int page, int num) {
        return dispatchMapper.getList(province,city,area,way,page,num);
    }

    @Override
    public Dispatch getDispatch(int id) {
        return dispatchMapper.getDispatch(id);
    }

    @Override
    public void update(Dispatch dispatch) {
        dispatchMapper.update(dispatch);
    }

    @Override
    public Dispatch testDest(String destination) {
        return dispatchMapper.testDest(destination);
    }

    @Override
    public Dispatch pay(int id) {
        Receiveaddress receiveaddress=addressMapper.findById(id);
        Dispatch dispatch=dispatchMapper.pay(receiveaddress.getCity());
        if(dispatch==null){
            dispatch=new Dispatch();
            dispatch.setWay("快递");
            dispatch.setCost(16.0);
        }
        return dispatch;
    }

    public void setDispatchMapper(DispatchMapper dispatchMapper) {
        this.dispatchMapper = dispatchMapper;
    }

    public void setAddressMapper(AddressMapper addressMapper) {
        this.addressMapper = addressMapper;
    }
}
