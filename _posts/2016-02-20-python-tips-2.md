---
layout: post
title:  "Python代码优化Tips(二)"
date:   2016-02-20
desc: "Python代码优化"
keywords: "Python,tips,优化"
categories: [Python]
tags: [优化]
icon: icon-python
---

#### ⑥使用enumerate()后去序列迭代的索引和值

对于一个`list` : `li = ['a', 'b', 'c', 'd', 'e', 'f']`

一次获得其中的变量及索引有下面几种方法：

###### 方法一：

``` python
index = 0
for i in li:
    print 'index:', index, 'element:', i
    index += 1
```

###### 方法二：

``` python
for i in range(len(li)):
    print 'index:', i, 'element:', li[i]
```

###### 方法三：

``` python
index = 0
while index < len(li):
    print 'index:', index, 'element:', li[index]
```

###### 方法四：

``` python
for i, e in zip(range(len(li)), li):
    print 'index:', i, 'element:', e
```

###### 方法五：

``` python
for i, e in enumerate(li):
    print 'index:', i, 'element:', e
```

对于字典便利迭代则使用如下方法：

``` python
dict1 = {'a': 1, 'b': 2}
for k,v in dict1:
    print k, v
```

#### ⑦使用with自动关闭资源

文件写入一例：

```
>>> f = open('test.txt', 'w')
>>> f.write('test')
```

这样结束会发现文件并没有内容，原因是在操作完成后忘记关闭了，这是一个常识，二使用with就不会出现这样的情况：

``` python
with open('test.txt', 'w') as f:
    f.write('test')
```

with语句可以在代码块执行完毕后还原进入该代码块的现场。包含有with语句的代码块的执行过程如下：

1. 计算表达式 的值，返回一个上下文管理器对象。

2. 加载上下文管理器对象的`__exit__()`方法以备用。

3. 调用上下文管理器对象的`__enter__()`方法。

4. 如果with语句中设置了目标对象，则将`__enter__()`方法的返回值复制给目标对象。

5. 执行with中的代码块。

6. 如果步骤5中的代码正常结束，调用上下文管理器对象的`__exit__()`方法，其返回值直接忽略。

7. 如果步骤5中的代码执行过程中发生异常，调用上下文管理器对象的`__exit__()`方法，并将异常类型、值及traceback信息作为参数传递给`__exit__()`。如果`__exit__()`返回值为false，则异常会被重新抛出；如果其返回值为true，异常会被挂起，程序继续执行。

对于`__enter__()`和`__exit__()`方法：

* `__enter__()`：进入与形式的上下文，返回运行时上下文相关的对象，with语句中会将这个返回值绑定到目标对象。

* `__exit__(exception_type, exception_value, traceback)`：退出运行时的上下文，定义在块执行（或终止）之后上下文管理器应该做什么。它可以处理异常，清理现场或者处理with块中语句执行完成后需要处理的动作。

自定义上下文管理器一例：

``` python
class MyClass(object):
    def __enter__(self):
        print 'entering...'
        
    def __exit__(self, exceprion_type, exception_value, traceback):
        print 'leaving...'
        if exception_type is None:
            print 'no exceptions!'
            return False
        elif exception_type is ValueError:
            print 'value error!'
            return True
        else:
            print 'other error'
            return True
```

引用此class：

```
>>> with  MyClass():
•••     print 'testing...'
•••     raise(ValueError)
•••
entering...
testing...
leaving...
value error!
>>> 
>>> with MyClass():
•••     print 'testing'
•••
entering...
testing...
leaving...
no exceptions!
>>>
```

除了`__enter__()`和`__exit__()`方法，还有`contextlib`模块可以辅助上下文管理，该模块是通过Generator实现的，contextlib中的contextmanager作为装饰器来提供一种针对函数级别的上下文管理机制，可以直接说作用函数\对象而不用去关心`__enter__()`和`__exit__()`方法的具体实现。具体可以百度。  
