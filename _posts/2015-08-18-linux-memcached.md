---
layout: post
title:  "memcached源码安装、错误处理及启动参数"
date:   2015-08-18
desc: "memcached源码安装、错误处理及启动参数"
keywords: "linux,memcached,安装"
categories: [Linux]
tags: [memcached]
icon: fa-database
---

memcached服务安装：

源码包：memcached-1.4.21.tar.gz

依赖包：libevent-2.0.20-stable.tar.gz

libevent是memcached的基本库

安装首先编译安装libevent，要求为安装三部曲

安装memcached在configure时，若需要安装多个memcached，增加路径参数即可：

```
./configure –prefix=/usr/local/mem1/
```

启动方式：

在bin目录下

```
./memcached -d -c 4096 -m 512 -u root -p 11212
```

* -d表示以后台守护进程方式启动

* -c表示最大连接数

* -m表示使用内存大小，单位为M

* -u表示以root用户启动

* -p表示监听端口号

安装memcache时，需要建立文件索引或者说文件连接（link），类似windows下的快捷方式

启动服务时出现 **error while loading shared libraries: libevent-2.0.so.5: cannot open shared object file: No such file or directory**

解决办法：

```
whereis libevent-2.0.so.5
```

libevent-2.0.so.5: /usr/local/lib/libevent-2.0.so.5

```
ldd /usr/local/bin/memcached （ldd指令不熟悉的去查看下）
```

libevent-2.0.so.5 => not found （没有找到该文件）

libpthread.so.0 => /lib64/libpthread.so.0 (0x00002b83fce0e000)

libc.so.6 => /lib64/libc.so.6 (0x00002b83fd029000)

librt.so.1 => /lib64/librt.so.1 (0x00002b83fd381000)

/lib64/ld-linux-x86-64.so.2 (0x00002b83fc9b0000)

```
LD_DEBUG=libs ./memcached -v
```

LD_DEBUG=libs /usr/local/mem1/bin/memcached -v
找到默认路径 /usr/lib/

```
sudo ln -s /usr/lib/libevent-2.0.so.5 /usr/lib64/libevent-2.0.so.5
```

```
sudo ldd /usr/local/bin/memcached
```

libevent-2.0.so.5 => /usr/lib64/libevent-2.0.so.5 (0x00002b83fcbcd000)

libpthread.so.0 => /lib64/libpthread.so.0 (0x00002b83fce0e000)

libc.so.6 => /lib64/libc.so.6 (0x00002b83fd029000)

librt.so.1 => /lib64/librt.so.1 (0x00002b83fd381000)

/lib64/ld-linux-x86-64.so.2 (0x00002b83fc9b0000)