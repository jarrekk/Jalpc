---
layout: post
title:  "通过supervisord管理celery守护进程"
date:   2016-02-04
desc: "通过supervisord管理celery守护进程"
keywords: "Python,supervisord,celery"
categories: [Python,Linux]
tags: [django,celery,supervisord]
icon: fa-linux
---

#### Why Supervisord

supervisord是一个python写的守护进程管理工具，功能非常实用。

supervisord的介绍可以看这篇文章。 在生成环境，celery worker进程通常会以守护进程的方式运行，而celery命令行工具本身是不支持以daemon方式运行的，虽然可以nohup celery worker &的方式让worker进程在后台运行，但是当有多个celery worker进程时，这种方式管理起来就会变得很麻烦，想要stop,restart还得一个个去kill pid。 supervisord是celery官方推荐的daemon管理工具之一，可以对多个进程统一进行监控，管理。

#### Configuration

配置其实很简单，主要就是设置supervisord.conf和celerd.conf两个文件。celery官方还提供了这两个文件的示例
下面是我这两个文件的设置，提供给正在弄这个的同学们参考。

supervisord.conf

```
[unix_http_server]
file=/tmp/supervisor.sock   ; path to your socket file
;chmod=0777
;chown=webscan:webscan

[inet_http_server]
port=1222
username=sinasec
password=xxxxxxx

[supervisord]
logfile=/var/log/supervisord/supervisord.log ; supervisord log file
logfile_maxbytes=50MB       ; maximum size of logfile before rotation
logfile_backups=10          ; number of backed up logfiles
loglevel=info               ; info, debug, warn, trace
pidfile=/var/run/supervisord.pid ; pidfile location
nodaemon=false              ; run supervisord as a daemon
minfds=1024                 ; number of startup file descriptors
minprocs=200                ; number of process descriptors
user=root                  ; default user
childlogdir=/var/log/supervisord/            ; where child log files will live

[rpcinterface:supervisor]
supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface

[supervisorctl]
serverurl=unix:///tmp/supervisor.sock ; use unix:// schem for a unix sockets.

; celery的监控工具flower自身也不支持以daemon方式运行，刚好也可以通过supervisord管理起来。
[program:flower]
command=/usr/local/bin/flower --adress=0.0.0.0 --port=1221 
autostart=true
autorestart=true
user=webscan
directory=/var/webscan/scanner/
stdout_logfile_maxbytes = 50MB
stdoiut_logfile_backups = 20
stdout_logfile = /var/log/flower.log

[include]

# Uncomment this line for celeryd for Python
files=celeryd.conf

# Uncomment this line for celeryd for Django.
;files=django/celeryd.conf

```

基本上就是官方那个配置文件，拿过来加上了flower的设置。

celerd.conf

```
[program:celery]
command=celery worker --hostname=celery-%(process_num)d.webscan.com --loglevel=INFO

process_name = %(program_name)s-%(process_num)d

environment=PYTHONPATH=/var/webscan/scanner/

directory=/var/webscan/scanner
user=webscan
numprocs=4  
stdout_logfile=/var/log/celeryd.log
stderr_logfile=/var/log/celeryd.log
autostart=true
autorestart=true
startsecs=10
```

这个设置里比较不同的是numprocs我设置成了4，既celery worker进程会同时起4个，分别命名celery-0 ,celery-1。之所以要在一台机器上起4个worker进程，是因为我们的celery pool用的是gevent，而为了充分利用多核，因此一台机器上需要起4个worker。

#### Usage
上面的设置都完成后先启动supervisord


```
supervisord -c /etc/supervisord.conf
```

然后就可以通过supervisorctl对这些进程进行管理了：

```
supervisorctl restart flower
supervisorctl stop celery:celery-0
```

浏览器访问http://10.1.1.1:1222/ 还可以通过web对这些进程进行管理
![celery]({{ site.img_path }}/supervisord_celery/celery-web.jpg)

