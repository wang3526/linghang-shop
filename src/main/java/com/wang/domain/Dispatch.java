package com.wang.domain;


public class Dispatch {

  private long id;
  private String way;
  private String destination;
  private double cost;
  private String content;
  private java.sql.Timestamp createTime;


  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }


  public String getWay() {
    return way;
  }

  public void setWay(String way) {
    this.way = way;
  }


  public String getDestination() {
    return destination;
  }

  public void setDestination(String destination) {
    this.destination = destination;
  }


  public double getCost() {
    return cost;
  }

  public void setCost(double cost) {
    this.cost = cost;
  }


  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }


  public java.sql.Timestamp getCreateTime() {
    return createTime;
  }

  public void setCreateTime(java.sql.Timestamp createTime) {
    this.createTime = createTime;
  }

}
