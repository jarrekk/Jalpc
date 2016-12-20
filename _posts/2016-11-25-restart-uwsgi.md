---
layout: post
title:  "重启uwsgi的几种方法"
date:   2016-11-25
desc: "重启uwsgi的几种方法"
keywords: "重启,restart,uwsgi"
categories: [Python]
tags: [nginx,uwsgi,django]
icon: icon-python
---

There are several ways to make uWSGI gracefully restart.
有几种方法完美重启uWSGI。

> using kill to send the signal

使用kill发送信号

``` bash
kill -HUP `cat /tmp/project-master.pid`     (好用）
```

> or the convenience option --reload

或者使用简单选项 --reload
``` bash
uwsgi --reload /tmp/project-master.pid
```

> or if uwsgi was started with touch-reload=/tmp/somefile

或者，如果uwsgi是使用touch-reload=/tmp/somefile启动

``` bash
touch /tmp/somefile
```

> Or from your application, in Python:

或者在Python程序里：

``` python
uwsgi.reload()
```

注意，如果要使用pid，需要在uwsgi启动参数中指定 --pidfile，如：

`#/etc/rc.local 修改自启动`

`/usr/local/bin/uwsgi /var/www/html/mz_uwsgi.ini --pidfile /tmp/uwsgi.pid`

比reboot服务器方便。
