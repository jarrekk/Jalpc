---
layout: post
title:  "Python challenge 12"
date:   2015-02-26
desc: "Python challenge"
keywords: "Python,challenge"
categories: [Python]
tags: [Python,Challenge]
icon: fa-code
---

Python challenge好像荒废很久了，今天把challenge 12补上。
第十二题地址为:<http://www.pythonchallenge.com/pc/return/evil.html>

打开网址，发现是一张图片很模糊，本以为还是图片处理的思路，查看网页标题和网页代码也没找到相关信息。但是在整个源代码中仔细观察会发现src是evil1.jpg，既然有1，那么是否会有2、3、4甚至更多的图呢？尝试打开：
<http://www.pythonchallenge.com/pc/return/evil1.jpg>是网页,
<http://www.pythonchallenge.com/pc/return/evil2.jpg>是下面的图片：

![evil2]({{ site.img_path }}/python_challenge12/evil2.jpg)

打开网址：<http://www.pythonchallenge.com/pc/return/evil2.gfx> 发现是一个二进制文档，还是没什么头绪
继续打开<http://www.pythonchallenge.com/pc/return/evil3.jpg> 是下面的图片：

![evil3-1]({{ site.img_path }}/python_challenge12/evil3-1.jpg)

看样子是没有图片了，但是打开<http://www.pythonchallenge.com/pc/return/evil4.jpg> 看到如下语句：**Bert is evil! go back!**，在chrome浏览器是看不到的，我是在IE浏览器上看到。
回想网页开始的图片，是在均分扑克牌，这应该就是解题的思路了，那么代码很简单了，如下：

``` python
#!/usr/bin/env python
 
f=open('evil2.gfx')
text=f.read()
f.close()
 
for i in range(5):
    f=open(str(i),'wb')
    f.write(text[i::5])
    f.close()
```

得到如下图片：

![0]({{ site.img_path }}/python_challenge12/0.jpg)

![1]({{ site.img_path }}/python_challenge12/1.png)

![2]({{ site.img_path }}/python_challenge12/2.gif)

![3]({{ site.img_path }}/python_challenge12/3.png)

![4]({{ site.img_path }}/python_challenge12/4.jpg)

最后一张图片的字母划掉了，所以答案是：**disproportional**