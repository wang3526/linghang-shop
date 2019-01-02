package com.wang.domain;


public class OrderItem {

  private int id;
  private int itemId;
  private int orderId;
  private int num;
  private String title;
  private double price;
  private double totalFee;
  private String picPath;
  private String color;
  private String memory;


  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }


  public int getItemId() {
    return itemId;
  }

  public void setItemId(int itemId) {
    this.itemId = itemId;
  }


  public int getOrderId() {
    return orderId;
  }

  public void setOrderId(int orderId) {
    this.orderId = orderId;
  }


  public int getNum() {
    return num;
  }

  public void setNum(int num) {
    this.num = num;
  }


  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }


  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }


  public double getTotalFee() {
    return totalFee;
  }

  public void setTotalFee(double totalFee) {
    this.totalFee = totalFee;
  }


  public String getPicPath() {
    return picPath;
  }

  public void setPicPath(String picPath) {
    this.picPath = picPath;
  }


  public String getColor() {
    return color;
  }

  public void setColor(String color) {
    this.color = color;
  }


  public String getMemory() {
    return memory;
  }

  public void setMemory(String memory) {
    this.memory = memory;
  }

}
