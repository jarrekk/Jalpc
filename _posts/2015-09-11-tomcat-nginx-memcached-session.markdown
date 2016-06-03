---
layout: post
title:  "tomcat + memcached + nginx 实现session共享"
date:   2015-09-11
desc: "tomcat + memcached + nginx 实现session共享"
keywords: "linux,tomcat,memcached,nginx,session,share"
categories: [Linux]
tags: [tomcat, memcached, nginx, session]
icon: fa-linux
---



这里重点强调如何实现linux服务器上 服务器session共享，软件安装不再赘述。

首先我们需要对 cookie 和session的工作机制非常了解，如果不了解其中的原理，就算配置成功，也毫无意义。换了工作换了环境，重新配置起来仍然需要重头来过，事倍功半。

cookie是怎样工作的？

例如，我们创建了一个名字为login的Cookie来包含访问者的信息，创建Cookie时，服务器端的Header如下面所示，这里假设访问者的注册名是“Michael Jordan”，同时还对所创建的Cookie的属性如path、domain、expires等进行了指定。

```
Set-Cookie:login=Michael Jordan;path=/;domain=msn.com; 
expires=Monday,01-Mar-99 00:00:01 GMT
```

上面这个Header会自动在浏览器端计算机的Cookie文件中添加一条记录。浏览器将变量名为“login”的Cookie赋值为“Michael Jordon”。注意，在实际传递过程中这个Cookie的值是经过了URLEncode方法的URL编码操作的。

这个含有Cookie值的HTTP Header被保存到浏览器的Cookie文件后，Header就通知浏览器将Cookie通过请求以忽略路径的方式返回到服务器，完成浏览器的认证操作。

此外，我们使用了Cookie的一些属性来限定该Cookie的使用。例如Domain属性能够在浏览器端对Cookie发送进行限定，具体到上面的例子，该Cookie只能传到指定的服务器上，而决不会跑到其他的如www.hp.com的Web站点上去。Expires属性则指定了该Cookie保存的时间期限，例如上面的Cookie在浏览器上只保存到1999年3月1日1秒。

当然，如果浏览器上Cookie太多，超过了系统所允许的范围，浏览器将自动对它进行删除。至于属性Path，用来指定Cookie将被发送到服务器的哪一个目录路径下。

说明：浏览器创建了一个Cookie后，对于每一个针对该网站的请求，都会在Header中带着这个Cookie；不过，对于其他网站的请求Cookie是绝对不会跟着发送的。而且浏览器会这样一直发送，直到Cookie过期为止。

##### session又是如何工作的？

由于http是无状态的协议，你访问了页面A，然后在访问B，http无法确定这2个访问来自一个人，因此要用cookie或session来跟踪用户，根据授权和用户身份来显示不同的页面。比如用户A登陆了，那么能看到自己的个人信息，而B没登陆，无法看到个人信息。还有A可能在购物，把商品放入购物车，此时B也有这个过程，你无法确定A，B的身份和购物信息，所以需要一个session ID来维持这个过程。

cookie是服务器发给客户端，并且保持在客户端的一个文件，里面包含了用户的访问信息（账户密码等），可以手动删除或设置有效期，在下次访问的时候，会返给服务器。注意：cookie可以被禁用，所以要想其他办法，这就是session。比如：你去商场购物，商场会给你办一张会员卡，下次你来出示该卡，会有打折优惠。该卡可以自己保存（cookie），或是商场代为保管，由于会员太多，个人需要保存卡号信息（session ID)。

##### 为什么要持久化SESSION？

在客户端每个用户的Session对象存在Servlet容器中，如果Tomcat服务器重起/当机的话该session就会丢失，而客户端的操作应为session的丢失而造成数据丢失，而且当前用户访问量巨大，每个用户的Session里存放大量的数据的话，那么就很占用服务器大量的内存，从而是服务器的性能受到影响。

##### 番外篇

session 是非常重要的数据，非常宝贵。但是session同样也是缺憾满身，在大规模集群服务器中，最好使用其他替代方案。比如淘宝网。

##### 对nginx的了解？

nginx 是一款非常优秀的服务器软件，其优秀程度这里不过多赘述。

#### 进入正题

session 实现共享的方法分为多种

对于WEB应用集群的技术实现而言，最大的难点就是如何能在集群中的多个节点之间保持数据的一致性，会话（Session）信息是这些数据中最重要的一块。要实现这一点，大体上有两种方式，一种是把所有Session数据放到一台服务器上或者数据库中，集群中的所有节点通过访问这台Session服务器来获取数据；另一种就是在集群中的所有节点间进行Session数据的同步拷贝，任何一个节点均保存了所有的Session数据。

###### 一、使用tomcat自身集群特性完成session共享

这种方式是使用tomcat自身广播的特点来进行session同步拷贝，优点是简单，缺点是一旦tomcat集群数量过多，很容易引发广播风暴。

详细配置 请参照 博客 <http://zyycaesar.iteye.com/blog/296606>

粗略配置如下 tomcat/server.xml

```
<Cluster className="org.apache.catalina.ha.tcp.SimpleTcpCluster"
        channelSendOptions="8">
  <Manager className="org.apache.catalina.ha.session.DeltaManager"
    expireSessionsOnShutdown="false"
    notifyListenersOnReplication="true"/>
  <Channel className="org.apache.catalina.tribes.group.GroupChannel">
     <Membership className="org.apache.catalina.tribes.membership.McastService"
      address="224.0.0.0"
      port="45564"
      frequency="500"
      dropTime="3000"/>
     <Receiver className="org.apache.catalina.tribes.transport.nio.NioReceiver"
       address="192.168.0.223"
       port="4001"
       autoBind="100"
       selectorTimeout="5000"
       maxThreads="6"/>
     <Sender className="org.apache.catalina.tribes.transport.ReplicationTransmitter">
  <Transport className="org.apache.catalina.tribes.transport.nio.PooledParallelSender"/>
     </Sender>
     <Interceptor className="org.apache.catalina.tribes.group.interceptors.TcpFailureDetector"/>
     <Interceptor className="org.apache.catalina.tribes.group.interceptors.MessageDispatch15Interceptor"/>
  </Channel>
  <Valve className="org.apache.catalina.ha.tcp.ReplicationValve"
  filter=".*\.gif;.*\.js;.*\.jpg;.*\.png;.*\.htm;.*\.html;.*\.css;.*\.txt;"/>
  <Valve className="org.apache.catalina.ha.session.JvmRouteBinderValve"/>
  <ClusterListener className="org.apache.catalina.ha.session.JvmRouteSessionIDBinderListener"/>
  <ClusterListener className="org.apache.catalina.ha.session.ClusterSessionListener"/>
</Cluster>
```

###### 二、使用数据库持久化session

这里又分为物理数据库和内存数据库物理数据库备份session，由于其性能的原因，这里不作介绍。

内存数据库 可以暂分为 redis 和 memcached

这里我们只介绍memcached，多个tomcat各种序列化策略配置如下：

* java默认序列化tomcat配置

conf/context.xml添加

```
<Manager className="de.javakaffee.web.msm.MemcachedBackupSessionManager"
     memcachedNodes="n1:192.168.100.208:11211 n2:192.168.100.208:11311"     
  lockingMode="auto"
  sticky="false" 
  requestUriIgnorePattern= ".*\.(png|gif|jpg|css|js)$"    
  sessionBackupAsync= "false"   
  sessionBackupTimeout= "100"      
  transcoderFactoryClass="de.javakaffee.web.msm.JavaSerializationTranscoderFactory"    
    />
```

lib增加jar包：

```
spymemcached-2.10.3.jar
memcached-session-manager-1.7.0.jar
memcached-session-manager-tc7-1.7.0.jar
```

* javolution序列化tomcat配置

conf/context.xml添加

```
<Manager className="de.javakaffee.web.msm.MemcachedBackupSessionManager"
     memcachedNodes="n1:192.168.100.208:11211 n2:192.168.100.208:11311"   
  lockingMode="auto"
  sticky="false" 
  requestUriIgnorePattern= ".*\.(png|gif|jpg|css|js)$"    
  sessionBackupAsync= "false"   
  sessionBackupTimeout= "100"  
  copyCollectionsForSerialization="true"   
  transcoderFactoryClass="de.javakaffee.web.msm.serializer.javolution.JavolutionTranscoderFactory"    
    />
```

lib增加jar包

```
msm-javolution-serializer-cglib-1.3.0.jar
msm-javolution-serializer-jodatime-1.3.0.jar
spymemcached-2.10.3.jar
javolution-5.4.3.1.jar
msm-javolution-serializer-1.7.0.jar
memcached-session-manager-1.7.0.jar
memcached-session-manager-tc7-1.7.0.jar
```

* xstream序列化tomcat配置

conf/context.xml添加

```
<Manager className="de.javakaffee.web.msm.MemcachedBackupSessionManager"
     memcachedNodes="n1:192.168.100.208:11211 n2:192.168.100.208:11311"   
  lockingMode="auto"
  sticky="false" 
  requestUriIgnorePattern= ".*\.(png|gif|jpg|css|js)$"    
  sessionBackupAsync= "false"   
  sessionBackupTimeout= "100"
  transcoderFactoryClass="de.javakaffee.web.msm.serializer.xstream.XStreamTranscoderFactory"    
    />
```

lib增加jar包

```
xmlpull-1.1.3.1.jar
xpp3_min-1.1.4c.jar
xstream-1.4.6.jar
msm-xstream-serializer-1.7.0.jar
spymemcached-2.10.3.jar
memcached-session-manager-1.7.0.jar
memcached-session-manager-tc7-1.7.0.jar
```

* flexjson序列化tomcat配置

conf/context.xml添加

```
<Manager className="de.javakaffee.web.msm.MemcachedBackupSessionManager"
     memcachedNodes="n1:192.168.100.208:11211 n2:192.168.100.208:11311"     
  lockingMode="auto"
  sticky="false" 
  requestUriIgnorePattern= ".*\.(png|gif|jpg|css|js)$"    
  sessionBackupAsync= "false"   
  sessionBackupTimeout= "100"      
  transcoderFactoryClass="de.javakaffee.web.msm.serializer.json.JSONTranscoderFactory"    
    />
```

lib增加jar包

```
flexjson-3.1.jar
msm-flexjson-serializer-1.7.0.jar
spymemcached-2.10.3.jar
memcached-session-manager-1.7.0.jar
memcached-session-manager-tc7-1.7.0.jar
```

* kryo序列化tomcat配置

conf/context.xml添加

```
<Manager className="de.javakaffee.web.msm.MemcachedBackupSessionManager"
     memcachedNodes="n1:192.168.100.208:11211 n2:192.168.100.208:11311"   
  lockingMode="auto"
  sticky="false" 
  requestUriIgnorePattern= ".*\.(png|gif|jpg|css|js)$"    
  sessionBackupAsync= "false"   
  sessionBackupTimeout= "100"    
  copyCollectionsForSerialization="true"   
  transcoderFactoryClass="de.javakaffee.web.msm.serializer.kryo.KryoTranscoderFactory"    
    />
```

lib增加jar包

```
kryo-1.04.jar
minlog-1.2.jar
asm-3.2.jar
reflectasm-1.01.jar
kryo-serializers-0.11.jar
msm-kryo-serializer-1.7.0.jar
spymemcached-2.10.3.jar
memcached-session-manager-1.7.0.jar
memcached-session-manager-tc7-1.7.0.jar
```

官网介绍说 使用kryo 序列化tomcat的效率最高 所以这里只介绍kryo序列化。具体效率对比，还需要进一步验证。

修改tomcat/context.xml文件 新增如下代码

```
<Manager className="de.javakaffee.web.msm.MemcachedBackupSessionManager"
    memcachedNodes="n1:192.168.0.216:11211" 
    sticky="false"
    storageKeyPrefix="context"
    sessionBackupAsync="false"
    lockingMode="uriPattern:/path1|/path2"
    requestUriIgnorePattern=".*\.(ico|png|gif|jpg|css|js)$"
    transcoderFactoryClass="de.javakaffee.web.msm.serializer.kryo.KryoTranscoderFactory"
    />
```

Manager 各参数说明：

className必选项，可配置为

```
de.javakaffee.web.msm.MemcachedBackupSessionManager和de.javakaffee.web.msm.DummyMemcachedBackupSessionManager。
```

其中DummyMemcachedBackupSessionManager可用于测试环境，不需要真实存在memcached。

memcachedNodes必选项，memcached的节点信息，格式如：

```
memcachedNodes="n1:app01:11211,n2:app02:11211"。
```

failoverNodes

可选项，不能使用在non-sticky sessions模式。故障转移配置节点，多个使用空格或逗号分开，配置某个节点为备份节点，当其他节点都不可用时才会存储到备份节点，官方建议配置为和tomcat同服务器的节点。

理由如下:

假如有两台服务器m1,m2，其中m1部署tomcat和memcached节点n1，m2部署memcached节点n2。

如果配置tomcat的failoverNodes值为n2或者不配置，则当服务器m1挂掉后n1和tomcat中保存的session会丢失，而n2中未保存或者只保存了部分session，这就造成部分用户状态丢失。

如果配置tomcat的failoverNodes值为n1，则当m1挂掉后因为n2中保存了所有的session，所以重启tomcat的时候用户状态不会丢失。

为什么n2中保存了所有的session? 因为failoverNodes配置的值是n1，只有当n2节点不可用时才会把session存储到n1，所以这个时候n1中是没有保存任何session的。

username可选项，SASL的用户名，如果节点保护membase的bucket uri。

password可选项，和username搭配使用。

memcachedProtocol可选项，默认text，memcached使用的协议，可选值：text，binary。

sticky可选项，默认true，制定是否使用粘性session模式。

说道sticky 需要简单介绍

###### Sticky 模式：

tomcat session 为 主session， memcached 为备 session。Request请求到来时， 从memcached加载备 session到 tomcat (仅当tomcat jvmroute发生变化时，否则直接取tomcat session)；Request请求结束时，将tomcat session更新至memcached，以达到主备同步之目的。

Non-Sticky模式：tomcat session 为 中转session， memcached1 为主 sessionmemcached 2 为备session。Request请求到来时，从memcached 2加载备 session到 tomcat，（当 容器 中还是没有session 则从memcached1加载主 session 到 tomcat， 这种情况是只有一个memcached节点，或者有memcached1 出错时），Request请求结束时，将tomcat session更新至主memcached1和备memcached2，并且清除tomcat session 。以达到主备同步之目的。

多台tomcat集群时 需要选择Non-Sticky模式，即sticky="false"

需要使用到得jar 列表如下

```
couchbase-client-1.2.2.jar
kryo-1.03.jar
kryo-serializers-0.10.jar
memcached-2.5.jar
memcached-session-manager-1.6.5.jar
memcached-session-manager-tc7-1.6.5.jar
minlog-1.2.jar
msm-kryo-serializer-1.6.5.jar
reflectasm-0.9.jar
spymemcached-2.10.2.jar
```

如果你查看过源码，你就会发现，如果当你调试不成功，session不共享，一般都是 memcached-session-manager-1.6.5.jar、memcached-session-manager-tc7-1.6.5.jar、msm-kryo-serializer-1.6.5.jar这三个jar包出问题。所以版本也很重要。

服务器之间的时间戳一致也非常重要，因为时间不一致将直接导致session过期。

memcached 的启动所有者最好设置为nobody

本博文是经过实际电商项目验证，实际登录验证，验证过程中不断关停一些tomcat，所以本博文可作为真实参考。

验证项目为大红袜全球购。

lockingMode可选值，默认none，只对non-sticky有效。

requestUriIgnorePattern可选值，制定忽略那些请求的session操作，一般制定静态资源如css,js一类的。

sessionBackupAsync可选值，默认true，是否异步的方式存储到memcached。

backupThreadCount可选项，默认是cpu核心数，异步存储session的线程数。

sessionBackupTimeout可选项，默认100毫秒，异步存储session的超时时间。

operationTimeout可选项，默认1000毫秒，memcached的操作超时时间。

storageKeyPrefix可选值，默认值webappVersion，存储到memcached的前缀，主要是为了区分多个webapp共享session的情况。可选值：静态字符串、host、context、webappVersion，多个使用逗号分割。

sessionAttributeFilter可选值，通过正则表达式确定那些session中的属性应该被存储到memcached。例子如：sessionAttributeFilter="^(userName|sessionHistory)$"。

transcoderFactoryClass可选值，默认值de.javakaffee.web.msm.JavaSerializationTranscoderFactory，制定序列化和反序列化数据到memcached的工厂类。

##### 使用 filter 方法存储

这种方法比较推荐，因为它的服务器使用范围比较多，不仅限于 tomcat ，而且实现的原理比较简单容易控制。

可以使用 memcached-session-filter

官方网址：<http://code.google.com/p/memcached-session-filter/>

官方介绍：解决集群环境下java web容器session共享,使用filter拦截器和memcached实现。在tomcat 6和websphere 8测试通过，现网并发2000，日PV量1100万。

暂不支持session event包括create destory 和 attribute change东西很不错，体积很小，不过这个东东要和 spring 一起使用，而且要求存储到 memcached 的对象要实现 java 的序列化接口大家也知道，java 本身的序列化性能也很一般。

将其简单扩展，就可以不再依赖 spring ，并且利用 javolution 实现序列化，缓存的对象不再有限制。

