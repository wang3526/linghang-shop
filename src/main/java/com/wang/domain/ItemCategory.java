package com.wang.domain;


public class ItemCategory {

  private int id;
  private int parentId;
  private String name;
  private int status;
  private int sort;
  private int isParent;
  private java.sql.Timestamp createtime;


  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }


  public int getParentId() {
    return parentId;
  }

  public void setParentId(int parentId) {
    this.parentId = parentId;
  }


  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }


  public int getStatus() {
    return status;
  }

  public void setStatus(int status) {
    this.status = status;
  }


  public int getSort() {
    return sort;
  }

  public void setSort(int sort) {
    this.sort = sort;
  }


  public int getIsParent() {
    return isParent;
  }

  public void setIsParent(int isParent) {
    this.isParent = isParent;
  }


  public java.sql.Timestamp getCreatetime() {
    return createtime;
  }

  public void setCreatetime(java.sql.Timestamp createtime) {
    this.createtime = createtime;
  }

}
