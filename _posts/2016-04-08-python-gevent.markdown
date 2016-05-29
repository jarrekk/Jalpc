---
layout: post
title:  "使用gevent提高IO繁忙型wsgi服务的并发量（转）"
date:   2016-04-08
categories: [Python]
tags: [优化]
icon: code
---


个人认为gevent还是更牛逼一些，在 [Benchmark of Python WSGI Servers](http://nichol.as/benchmark-of-python-web-servers) 一文中，作者进行详细分析，得出的结论是gevent在所有

WSGI Server中性能最好，只不过文章是2010年写的，有些早了。下面是我简单的对比分析（未经试验）：

使用Tornado，启动一个进程，N个线程

使用Gevent，启动一个进程，N个协程

CPU除了执行用户代码外，就是调用调用程序进行线程/协程切换。而协程切换要比线程切换的开销小，速度快，所以Gevent的并发性能应该更好。

最后还想说一句，gevent适合socket IO，其它类型的IO，如磁盘IO是否适合就不清楚了。

原文： <https://co-ding.com/?p=356#comment-6036>

我的一个线上web服务在生产中遇到一个性能问题：当初为了方便选择了wsgi（众所周知wsgi协议，不像tornado之类的的框架可以使用异步IO），

而服务本身有大量IO（倒并不是带宽很大，只是会经常阻塞），因此一个业务完成可能需要很长时间几秒甚至十几秒。

我使用uwsgi这样启动：

``` ini
uwsgi --harakiri 25 --harakiri-verbose --http :9090 -M  --processes 12 --threads 2 --wsgi-file wsgi.py
```

也就是说同时并发量为 12*2=24,这是在以后服务量增长之后是完全不能接受的。

因此，我开始考虑增加线程数，使用siege测试发现线程数过多的时候，由于线程上下文切换导致效率很低，本来5秒钟的业务，最后平均7s才能完成，

这其中有2秒钟用在了线程切换上面

``` ini
siege -r 2 -c 50  "http://127.0.0.1:9090/api POST <./test.post"
```

于是考虑使用异步框架，tornado，gevent之类的。

我首先看了下tornado，tornado是一个web框架，它同时也提供了很多异步的库，包括httpclient（Asynchronous HTTP client）。因此我的程序要想在tornado上面跑并

发挥异步的作用，必须修改大量代码，将所有的IO操作更换成tornado提供的异步函数。这本身是不可接受的，不如直接增加进程/线程来的方便。

接下来我看了下 gevent ，gevent是使用greenlet 协程 Coroutine 来实现异步网络框架，而且它提供了一个异常方便了monkey模块，可以在不修改原来

的使用python标准库函数的程序的情况下，将程序转换成可以使用gevent框架的异步程序。

即：

``` python
from gevent import monkey
# patches stdlib (including socket and ssl modules) to cooperate with other greenlets
monkey.patch_all()
```

gevent虽然也自带一个wsgi server，但是毕竟不是专业的web服务器，我们还是要使用uwsgi的。然后我发现uwsgi对gevent的支持还是很好的，

直接使用下面的命令启动，甚至不需要改动一行代码。（add by zhj: 在uwsgi中如果使用了gevent参数，就不能用thread参数了，不过，貌似仍可以在进程中创建线程）

``` ini
uwsgi --gevent 100 --gevent-monkey-patch --http :9090 -M  --processes 4 --wsgi-file wsgi.py
```

--gevent参数后面的100， 制定了最大spawn 100个协程，这样我们的理论并发数可以达到 100*4。

使用了参数 --gevent-monkey-patch 让我们连最后需要修改代码的地方都没有了：它将自动调用monkey.patch_all()打补丁。

这样，我们就一句代码都没有修改，就使程序转换为异步的程序，大大提高并发数。与提高线程数相比，大大减少了线程切换的开销（协程之间切换的代价很低）。