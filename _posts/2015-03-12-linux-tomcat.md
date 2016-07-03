---
layout: post
title:  "Apache tomcat在Linux上安装部署"
date:   2015-03-12
desc: "Apache tomcat在Linux上安装部署"
keywords: "linux,apache,tomcat"
categories: [Linux]
tags: [tomcat]
icon: fa-linux
---

tomcat是在java容器中运行的，首先需要下载jdk的Linux包，然后下载Apache tomcat的Linux包，这些在官网都能够下载到。

jdk和tomcat

java位置：
ls /data/java/jdk1.7.0_15/
tomcat位置：
ls /data/tomcat/apache-tomcat-7.0.37/

Java环境

增加java环境变量：

```
[root@cms ~]# tail /etc/profile -n 6
```

```
export JAVA_HOME=/data/java/jdk1.7.0_15
PATH=$JAVA_HOME/bin:$PATH
CLASSPATH=$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:.
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/apr/lib
export JAVA_HOME PATH CLASSPATH
RUN_AS_USER=root
```

然后执行

```
source /etc/profile
```

即可运行tomcat。