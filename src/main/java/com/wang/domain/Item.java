package com.wang.domain;


public class Item {

  private int id;           //id
  private String title;     //商品名称
  private String sellPoint; //卖点
  private double price;     //价格
  private int num;         //库存
  private String imgPath;   //图片
  private int cId;          //分类
  private int status;       //状态
  private java.sql.Timestamp createtime;   //新增时间
  private java.sql.Timestamp updatetime;   //更新时间
  private String descript;  //商品详情
  private ItemSpecification itemSpecification;

  public ItemSpecification getItemSpecification() {
    return itemSpecification;
  }

  public void setItemSpecification(ItemSpecification itemSpecification) {
    this.itemSpecification = itemSpecification;
  }

  public int getId() {
    return id;
  }


  public void setId(int id) {
    this.id = id;
  }


  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }


  public String getSellPoint() {
    return sellPoint;
  }

  public void setSellPoint(String sellPoint) {
    this.sellPoint = sellPoint;
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


  public String getImgPath() {
    return imgPath;
  }

  public void setImgPath(String imgPath) {
    this.imgPath = imgPath;
  }


  public int getCId() {
    return cId;
  }

  public void setCId(int cId) {
    this.cId = cId;
  }


  public int getStatus() {
    return status;
  }

  public void setStatus(int status) {
    this.status = status;
  }


  public java.sql.Timestamp getCreatetime() {
    return createtime;
  }

  public void setCreatetime(java.sql.Timestamp createtime) {
    this.createtime = createtime;
  }


  public java.sql.Timestamp getUpdatetime() {
    return updatetime;
  }

  public void setUpdatetime(java.sql.Timestamp updatetime) {
    this.updatetime = updatetime;
  }

  public String getDescript() {
    return descript;
  }

  public void setDescript(String descript) {
    this.descript = descript;
  }
}
