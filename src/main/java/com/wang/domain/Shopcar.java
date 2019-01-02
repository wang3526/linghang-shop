package com.wang.domain;


import java.util.List;

public class Shopcar {

  private int id;
  private int itemId;
  private double price;
  private int num;
  private int uId;
  private int status;
  private String color;
  private String memory;
  private Item item;

  public Item getItem() {
    return item;
  }

  public void setItem(Item item) {
    this.item = item;
  }

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


  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }


  public int getNum() {
    return num;
  }

  public void setNum(int num) {
    this.num = num;
  }


  public int getUId() {
    return uId;
  }

  public void setUId(int uId) {
    this.uId = uId;
  }


  public int getStatus() {
    return status;
  }

  public void setStatus(int status) {
    this.status = status;
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
