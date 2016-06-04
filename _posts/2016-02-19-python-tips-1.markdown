---
layout: post
title:  "Python代码优化Tips(一)"
date:   2016-02-19
desc: "Python代码优化"
keywords: "Python,tips,优化"
categories: [Python]
tags: [优化]
icon: icon-python
---

#### ①函数设计

1. 函数设计尽量短小，嵌套层次不宜过深(3层)。

2. 函数申明赢合理、简单、易使用，参数不宜过多。

3. 函数设计应考虑乡下兼容，使用需求变更和版本升级。

4. 一个函数只做一件事情。

#### ②将常量集中到一个文件

将存放常量的文件命名为constant.py，并在其中定义一些列常量：

``` python
class _const:
    class ConstError(TypeError): pass
    class ConstCaseError(ConstError): pass
    
    def __setattr__(self, name, value):
        if self.__dict__.has_key(name):
            raise self.ConstError, "Can't change const.%s" % name
        if not name.isupper():
            raise self.ConstCaseError, 'const name "%s" is not all uppercase' % name
        self.__dict__[name] = value
        
import sys
sys.modules[__name__]=_const()
import const
const.MY_NAME = 'JACK'
...
```

当在其他模块中引用这些常量时，按照如下方式进行即可：

``` python
from constant import const
print const.MY_NAME
```

#### ③数据交换不推荐使用中间变量

```
>>> temp = x
>>> x = y
>>> t = temp
```

替换为：

```
>>> x,y = y,x
```

#### ④充分利用Lazy evaluation的特性

Lazy evaluation为"延迟计算"或"惰性计算"，Python中最典型的就是生成器表达式了。

#### ⑤不推荐使用type进行类型检查

```
>>> import types
>>> string = 'abc'
>>> type(string) = types.StringType
True
```

替换为：

```
>>> string = 'abc'
>>> isinstance(string, str)
True
```
