---
layout: post
title:  "Linux安装mysql-源码安装"
date:   2015-09-01
desc: "Linux源码安装MySQL"
keywords: "linux,mysql,安装,install"
categories: [Database]
tags: [MySQL]
icon: fa-database
---


1.假设已经有mysql-5.5.10.tar.gz以及cmake-2.8.4.tar.gz两个源文件

(1)先安装cmake（mysql5.5以后是通过cmake来编译的）

```
[root@ rhel5 local]#tar -zxv -f cmake-2.8.4.tar.gz
[root@ rhel5 local]#cd cmake-2.8.4
[root@ rhel5 cmake-2.8.4]#./configure
[root@ rhel5 cmake-2.8.4]#make
[root@ rhel5 cmake-2.8.4]#make install
```

(2)创建mysql的安装目录及数据库存放目录

```
[root@ rhel5~]#mkdir -p /usr/local/mysql                 //安装mysql 
[root@ rhel5~]#mkdir -p /usr/local/mysql/data            //存放数据库
```

(3)创建mysql用户及用户组

```
[root@ rhel5~]groupadd mysql
[root@ rhel5~]useradd -r -g mysql mysql
```

(4)安装mysql

```
[root@ rhel5 local]#tar -zxv -f mysql-5.5.10.tar.gz
[root@ rhel5 local]#cd mysql-5.5.10
```

```
[root@ rhel5 mysql-5.5.10]#cmake . 
-DCMAKE_INSTALL_PREFIX=/usr/local/mysql
-DMYSQL_DATADIR=/usr/local/mysql/data
-DDEFAULT_CHARSET=utf8
-DDEFAULT_COLLATION=utf8_general_ci 
-DEXTRA_CHARSETS=all 
-DENABLED_LOCAL_INFILE=1
```

```
[root@ rhel5 mysql-5.5.10]#make
[root@ rhel5 mysql-5.5.10]#make install
```

参数说明：

* -DCMAKE_INSTALL_PREFIX=/usr/local/mysql        //安装目录

* -DINSTALL_DATADIR=/usr/local/mysql/data         //数据库存放目录

* -DDEFAULT_CHARSET=utf8                    　　　　//使用utf8字符

* -DDEFAULT_COLLATION=utf8_general_ci            //校验字符

* -DEXTRA_CHARSETS=all                        　　　　//安装所有扩展字符集

* -DENABLED_LOCAL_INFILE=1                    　　  //允许从本地导入数据

注意事项：

重新编译时，需要清除旧的对象文件和缓存信息。

make clean

rm -f CMakeCache.txt

rm -rf /etc/my.cnf

2.配置

(1)设置目录权限

```
[root@ rhel5~]# cd /usr/local/mysql
[root@ rhel5 mysql]# chown -R root:mysql .　//把当前目录中所有文件的所有者所有者设为root，所属组为mysql
[root@ rhel5 mysql]# chown -R mysql:mysql data
```

(2)

```
[root@ rhel5 mysql]# cp support-files/my-medium.cnf /etc/my.cnf　//将mysql的启动服务添加到系统服务中
```

(3)创建系统数据库的表

```
[root@ rhel5 mysql]# cd /usr/local/mysql
[root@ rhel5 mysql]# scripts/mysql_install_db --user=mysql
```

(4)设置环境变量

```
[root@ rhel5~]# vi /root/.bash_profile
```

在PATH=$PATH:$HOME/bin添加参数为：

`PATH=$PATH:$HOME/bin:/usr/local/mysql/bin:/usr/local/mysql/lib`

```
[root@ rhel5~]#source /root/.bash_profile
```

(5)手动启动mysql

```
[root@ rhel5~]# cd /usr/local/mysql
[root@ rhel5 mysql]# ./bin/mysqld_safe --user=mysql & 　 //启动MySQL，但不能停止
```

启动日志写在此文件下：`/usr/local/mysql/data/localhost.err`

关闭MySQL服务

```
[root@ rhel5 mysql]# mysqladmin -u root -p shutdown　　//这里MySQL的root用户还没有配置密码，所以为空值。需要输入密码时，直接点回车键即可。
```

(6)另一种简单的启动mysql的方法(mysql已经被添加到系统服务中)

```
[root@ rhel5~]# service mysql.server start  
[root@ rhel5~]# service mysql.server stop
[root@ rhel5~]# service mysql.server restart
```

如果上述命令出现：mysql.server 未识别的服务

则可能mysql还没添加到系统服务中，下面用另一种方法添加：

```
[root@ rhel5 mysql]# cp support-files/mysql.server  /etc/init.d/mysql　//将mysql的启动服务添加到系统服务中
```

注意：主要是将mysql.server拷贝到/etc/init.d中，命名为mysql。在有的系统中，mysql.server在/usr/local/mysql/share/mysql/mysql.server中，而本系统中，mysql.server在/usr/local/mysql/support-files/mysql.server中。

然后再用#service mysql start 来启动mysql即可。


(7)修改MySQL的root用户的密码以及打开远程连接

```
[root@ rhel5~]# mysql -u root mysql
```

``` sql
mysql>use mysql;
mysql>desc user;
mysqlGRANT ALL PRIVILEGES ON *.* TO root@"%" IDENTIFIED BY "root";　　//为root添加远程连接的能力。
mysql>update user set Password = password('xxxxxx') where User='root';
mysql>select Host,User,Password  from user where User='root'; 
mysql>flush privileges;
mysql>exit
```

重新登录：

```
mysql -u root -p
```

若还不能进行远程连接，则关闭防火墙

```
[root@ rhel5~]# /etc/rc.d/init.d/iptables stop
```

注：如果不能远程连接，出现错误mysql error number 1130，则加入下面语句试试：

``` sql
mysql>GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '******' WITH GRANT OPTION;
```

