---
layout: post
title:  "django（flask）非阻塞环境初试"
date:   2016-12-25
desc: "django（flask）非阻塞环境初试"
keywords: "Python,gevent,flask"
categories: [Python]
tags: [Python,gevent,flask]
icon: icon-python
---

我的一个线上web服务在生产中遇到一个性能问题：当初为了方便选择了wsgi（众所周知wsgi协议，不像tornado之类的的框架可以使用异步IO），

而服务本身有大量IO（倒并不是带宽很大，只是会经常阻塞），因此一个业务完成可能需要很长时间几秒甚至十几秒。
我的uwsgi配置文件如下：

``` ini
# mysite_uwsgi.ini file
[uwsgi]

# Django-related settings
# the base directory (full path)
chdir           = /project/dir
# Django's wsgi file
module          = project.wsgi
plugins     = python
# the virtualenv (full path)
#home            = /path/to/virtualenv

# process-related settings
# master
master          = true
# maximum number of worker processes
processes       = 4
# the socket (use the full path to be safe
socket          = 127.0.0.1:9090
# ... with appropriate permissions - may be needed
# chmod-socket    = 664
# clear environment on exit
vacuum          = true
daemonize       = /var/log/uwsgi.log
pidfile     = /run/uwsgi.pid
buffer-size     = 65535
```

也就是说同时并发量为 4,这是在以后服务量增长之后是完全不能接受的。

于是考虑使用异步框架，gevent之类的。

首先安装gevent：

``` bash
pip install gevent
```

修改uwsgi配置文件，如有threads配置项注释掉，添加`gevent       = 100`，即非阻塞模式，制定了最大spawn 100个协程，这样我们的理论并发数可以达到 100*4。

最后在django project的wsgi.py中引入gevent：

``` python
# -*- coding: utf-8 -*-
"""
WSGI config for wechat project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/howto/deployment/wsgi/
"""

from gevent import monkey

monkey.patch_all()
import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "wechat.settings")

application = get_wsgi_application()
```

重启uwsgi。

因为django默认是多线程的服务，如果需要测试阻塞模式和非阻塞模式，需要多添加几个url，加上sleep，访问测试即可。


附： flask uwsgi和 main.py 示例

uwsgi.ini

``` ini
[uwsgi]
master = true
vhost = true
workers = 2
reload-mercy = 10
vacuum = true
max-requests = 1000
limit-as = 6048
chmod-socket = 666
socket = /tmp/uwsgi.sock
chdir = /data/wwwroot/       ##flask app 目录
module = myapp               ## flask app 名称，也就是我们的 myapp.py
callable = app
touch-reload = /data/wwwroot/
pidfile = /var/run/uwsgi.pid
daemonize = /usr/local/nginx/logs/uwsgi.log
gevent = 100        ## 加入 gevent = 100 ，非阻塞模式
```

main.py

``` python
## 在文件头加入下面两行
from gevent import monkey
monkey.patch_all()

from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    app.run()
```
