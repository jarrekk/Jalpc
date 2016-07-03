---
layout: post
title:  "MySQL主备模式配置"
date:   2015-04-03
desc: "MySQL主备模式配置"
keywords: "linux,mysql,master,slave,主备"
categories: [Database]
tags: [MySQL, 主从]
icon: fa-database
---

背景：

主数据库IP：192.168.100.2

从数据库IP：192.168.100.3

#### 一、修改主数据库的的配置文件：

```
[mysqld]

server-id=1
log-bin=mysqlmaster-bin.log
sync_binlog=1
#注意：下面这个参数需要修改为服务器内存的70%左右
innodb_buffer_pool_size = 512M
innodb_flush_log_at_trx_commit=1
sql_mode=STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION,NO_AUTO_VALUE_ON_ZERO
lower_case_table_names=1
log_bin_trust_function_creators=1
```

修改之后要重启mysql

#### 二、修改从数据库的的配置文件（server-id配置为大于1的数字即可）：

```
[mysqld]

server-id=2
log-bin=mysqlslave-bin.log
sync_binlog=1
#注意：下面这个参数需要修改为服务器内存的70%左右
innodb_buffer_pool_size = 512M
innodb_flush_log_at_trx_commit=1
sql_mode=STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION,NO_AUTO_VALUE_ON_ZERO
lower_case_table_names=1
log_bin_trust_function_creators=1
```

修改之后要重启mysql

#### 三、SSH登录到主数据库：

（1）在主数据库上创建用于主从复制的账户（192.168.100.3换成你的从数据库IP）：

``` sql
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'192.168.100.3' IDENTIFIED BY 'repl';
```

（2）主数据库锁表（禁止再插入数据以获取主数据库的的二进制日志坐标）：

```
FLUSH TABLES WITH READ LOCK;
```

（3）然后克隆一个SSH会话窗口，在这个窗口打开MySQL命令行：

``` sql
SHOW MASTER STATUS;
+——————---------------——+—------——-+——------——–+——————+——————-+
| File                  | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+—————---------------———+——------—-+——------——–+——————+——————-+
| mysqlmaster-bin.000001 |   332   |           |      |       |
+—————---------------———+—------——-+—------———–+——————+——————-+

1 row in set (0.00 sec)
exit;
```

在这个例子中，二进制日志文件是mysqlmaster-bin.000001，位置是332，记录下这两个值，稍后要用到。

（4）在主数据库上使用mysqldump命令创建一个数据快照：

```
#mysqldump
-uroot -p -h127.0.0.1 -P3306 –all-databases –triggers –routines –events >all.sql
```

接下来会提示你输入mysql数据库的root密码，输入完成后，如果当前数据库不大，很快就能导出完成。

（5）解锁第（2）步主数据的锁表操作：

``` sql
UNLOCK TABLES;
```

#### 四、SSH登录到从数据库：

（1）通过FTP、SFTP或其他方式，将上一步备份的主数据库快照all.sql上传到从数据库某个路径，例如我放在了/home/yimiju/目录下；

（2）从导入主的快照：

```
#cd /home/yimiju
#mysql -uroot -p -h127.0.0.1 -P3306 < all.sql 
```

接下来会提示你输入mysql数据库的root密码，输入完成后，如果当前数据库不大，很快就能导入完成。

（3）给从数据库设置复制的主数据库信息（注意修改MASTER_LOG_FILE和MASTER_LOG_POS的值）：

`#mysql -uroot -p`

mysql>``` sql
CHANGE MASTER TO MASTER_HOST='192.168.100.2',MASTER_USER='repl',MASTER_PASSWORD='repl',MASTER_LOG_FILE='mysqlmaster-bin.000001',MASTER_LOG_POS=332;
```

然后启动从数据库的复制线程：

mysql>``` sql
START slave;
```

接着查询数据库的slave状态：

mysql>``` sql
SHOW slave STATUS \G
```

如果下面两个参数都是Yes，则说明主从配置成功！

```
Slave_IO_Running: Yes
Slave_SQL_Running: Yes
```

（4）接下来你可以在主数据库上创建数据库、表、插入数据，然后看从数据库是否同步了这些操作。

大功告成。

