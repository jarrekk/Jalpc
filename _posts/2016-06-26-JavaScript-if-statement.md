---
layout: post
title:  "JavaScript中if语句的几种优化代码的写法"
date:   2016-06-26
desc: "JavaScript中if语句的几种优化代码的写法"
keywords: "JavaScript,if,optimise,statement,优化"
categories: [HTML]
tags: [JavaScript]
icon: icon-javascript
---

### 一、常见的三元操作符

代码如下：

``` javascript
if (foo) bar();else baz(); ==> foo? bar(): baz();
if (!foo) bar();else baz(); ==> foo? baz(): bar();
if (foo) return bar();else return baz(); ==> return foo? bar(): baz();
```

### 二、使用and(&&)和or(||)运算符

代码如下：

``` javascript
if (foo) bar(); ==> foo && bar();
if (!foo) bar(); ==> foo || bar();
```

### 三、省略大括号{}

代码如下：

``` javascript
if (foo) return bar(); else other(); ==> {if (foo) return bar();other()}
```

