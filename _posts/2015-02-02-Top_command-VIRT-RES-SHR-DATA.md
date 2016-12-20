---
layout: post
title:  "Top命令VIRT,RES,SHR,DATA的含义"
date:   2015-02-02
desc: "Linux Top命令VIRT,RES,SHR,DATA的含义"
keywords: "top,linux,virt,res,shr,data"
categories: [Linux]
tags: [top]
icon: fa-linux
---

#### VIRT：virtual memory usage

1. 进程“需要的”虚拟内存大小，包括进程使用的库、代码、数据等
2. 假如进程申请100m的内存，但实际只使用了10m，那么它会增长100m，而不是实际的使用量

#### RES：resident memory usage 常驻内存

1. 进程当前使用的内存大小，但不包括swap out
2. 包含其他进程的共享
3. 如果申请100m的内存，实际使用10m，它只增长10m，与VIRT相反
4. 关于库占用内存的情况，它只统计加载的库文件所占内存大小

#### SHR：shared memory

1. 除了自身进程的共享内存，也包括其他进程的共享内存
2. 虽然进程只使用了几个共享库的函数，但它包含了整个共享库的大小
3. 计算某个进程所占的物理内存大小公式：RES – SHR
4. swap out后，它将会降下来

#### DATA

1. 数据占用的内存。如果top没有显示，按f键可以显示出来。
2. 真正的该程序要求的数据空间，是真正在运行中要使用的。