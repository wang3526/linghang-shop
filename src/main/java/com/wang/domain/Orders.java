package com.wang.domain;


import java.util.List;

public class Orders {

  private int id;
  private String code;
  private String payment;
  private String postFee;
  private int status;
  private java.sql.Timestamp createTime;
  private java.sql.Timestamp paymentTime;
  private java.sql.Timestamp consignTime;
  private java.sql.Timestamp recTime;
  private java.sql.Timestamp retTime;
  private java.sql.Timestamp sretTime;
  private java.sql.Timestamp closeTime;
  private String shippingName;
  private String shippingCode;
  private int userId;
  private int raId;
  private String buyerMessage;
  private int buyerRate;
  private List<OrderItem> list;

  public List<OrderItem> getList() {
    return list;
  }

  public void setList(List<OrderItem> list) {
    this.list = list;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }


  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }


  public String getPayment() {
    return payment;
  }

  public void setPayment(String payment) {
    this.payment = payment;
  }


  public String getPostFee() {
    return postFee;
  }

  public void setPostFee(String postFee) {
    this.postFee = postFee;
  }


  public int getStatus() {
    return status;
  }

  public void setStatus(int status) {
    this.status = status;
  }


  public java.sql.Timestamp getCreateTime() {
    return createTime;
  }

  public void setCreateTime(java.sql.Timestamp createTime) {
    this.createTime = createTime;
  }

  public java.sql.Timestamp getPaymentTime() {
    return paymentTime;
  }

  public void setPaymentTime(java.sql.Timestamp paymentTime) {
    this.paymentTime = paymentTime;
  }


  public java.sql.Timestamp getConsignTime() {
    return consignTime;
  }

  public void setConsignTime(java.sql.Timestamp consignTime) {
    this.consignTime = consignTime;
  }

  public java.sql.Timestamp getRecTime() {
    return recTime;
  }

  public void setRecTime(java.sql.Timestamp recTime) {
    this.recTime = recTime;
  }


  public java.sql.Timestamp getRetTime() {
    return retTime;
  }

  public void setRetTime(java.sql.Timestamp retTime) {
    this.retTime = retTime;
  }


  public java.sql.Timestamp getSretTime() {
    return sretTime;
  }

  public void setSretTime(java.sql.Timestamp sretTime) {
    this.sretTime = sretTime;
  }


  public java.sql.Timestamp getCloseTime() {
    return closeTime;
  }

  public void setCloseTime(java.sql.Timestamp closeTime) {
    this.closeTime = closeTime;
  }


  public String getShippingName() {
    return shippingName;
  }

  public void setShippingName(String shippingName) {
    this.shippingName = shippingName;
  }


  public String getShippingCode() {
    return shippingCode;
  }

  public void setShippingCode(String shippingCode) {
    this.shippingCode = shippingCode;
  }


  public int getUserId() {
    return userId;
  }

  public void setUserId(int userId) {
    this.userId = userId;
  }


  public int getRaId() {
    return raId;
  }

  public void setRaId(int raId) {
    this.raId = raId;
  }


  public String getBuyerMessage() {
    return buyerMessage;
  }

  public void setBuyerMessage(String buyerMessage) {
    this.buyerMessage = buyerMessage;
  }


  public int getBuyerRate() {
    return buyerRate;
  }

  public void setBuyerRate(int buyerRate) {
    this.buyerRate = buyerRate;
  }

}
