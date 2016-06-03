---
layout: post
title:  "hadoop初识（从安装到查询)"
date:   2015-10-16
desc: "hadoop初识,使用ambari安装Hadoop"
keywords: "Linux,Hadoop,ambari"
categories: [Database]
tags: [hadoop, ambari]
icon: fa-linux
---

花了一个星期，把hadoop整套算是搞通了，做这套hadoop是给bi做数据分析使用的，之前他们是用MySQL cluster来做数据查询，MySQL cluster的好处是数据全部加载到内存中，查询会非常快，不足的地方是数据容量受限，内存多大，数据最多能放多少，所以我们新建设了一套hadoop集群。

搭建hadoop集群，我们使用的[ambari](http://ambari.apache.org/)组建，这套组建能够让你自由的组织和扩容hadoop集群，官网地址为：http://ambari.apache.org/ ，我安装了最新版本2.2.0。

安装过程网上很多，这里给出我的安装清单：

```
Admin Name : admin 
Cluster Name : BI_hadoop 
Total Hosts : 5 (5 new) 
Repositories:
 debian7 (HDP-2.3):
  http://public-repo-1.hortonworks.com/HDP/debian7/2.x/updates/2.3.4.0
 debian7 (HDP-UTILS-1.1.0.20):
  http://public-repo-1.hortonworks.com/HDP-UTILS-1.1.0.20/repos/debian6
 redhat6 (HDP-2.3):
  http://public-repo-1.hortonworks.com/HDP/centos6/2.x/updates/2.3.4.0
 redhat6 (HDP-UTILS-1.1.0.20):
  http://public-repo-1.hortonworks.com/HDP-UTILS-1.1.0.20/repos/centos6
 redhat7 (HDP-2.3):
  http://public-repo-1.hortonworks.com/HDP/centos7/2.x/updates/2.3.4.0
 redhat7 (HDP-UTILS-1.1.0.20):
  http://public-repo-1.hortonworks.com/HDP-UTILS-1.1.0.20/repos/centos7
 suse11 (HDP-2.3):
  http://public-repo-1.hortonworks.com/HDP/suse11sp3/2.x/updates/2.3.4.0
 suse11 (HDP-UTILS-1.1.0.20):
  http://public-repo-1.hortonworks.com/HDP-UTILS-1.1.0.20/repos/suse11sp3
 ubuntu12 (HDP-2.3):
  http://public-repo-1.hortonworks.com/HDP/ubuntu12/2.x/updates/2.3.4.0
 ubuntu12 (HDP-UTILS-1.1.0.20):
  http://public-repo-1.hortonworks.com/HDP-UTILS-1.1.0.20/repos/ubuntu12
 ubuntu14 (HDP-2.3):
  http://public-repo-1.hortonworks.com/HDP/ubuntu14/2.x/updates/2.3.4.0
 ubuntu14 (HDP-UTILS-1.1.0.20):
  http://public-repo-1.hortonworks.com/HDP-UTILS-1.1.0.20/repos/ubuntu12

Services:
HDFS
  DataNode : 3 hosts 
  NameNode :hadoop1 
  NFSGateway : 0 
  host SNameNode :hadoop1
YARN + MapReduce2
  App Timeline Server :hadoop1 
  NodeManager : 3 hosts 
  ResourceManager :hadoop1
Tez
 Clients : 3 hosts
Hive
  Metastore : hadoop1
  HiveServer2 : ambari
  WebHCat Server : ambari
  Database : MySQL (New MySQL Database)
Pig
  Clients : 3 hosts 
Sqoop
  Clients : 3 hosts 
ZooKeeper
  Server : ambari 
Ambari Metrics
  Metrics Collector : ambari 
Spark
  History Server : ambari 
  Thrift Server : 0 host
```

ambari主页面如下：

![amabri]({{ site.img_path }}/hadoop_ambari/ambari.png)

hadoop的各项配置可以按照ambari给的参考配置设定，在web端即可实现hive接口查询数据：

![amabri]({{ site.img_path }}/hadoop_ambari/hive-web.png)

数据录入我们是通过MySQL的select into outfile到txt文件，然后在hive中load到hadoop中，中间遇到一些坑，是MySQL一些字段的换行符，这个问题查看一下我的上一篇文章，在hive创建数据库表中，text字段可以用string替代，\*int(\*)换成\*int即可。


