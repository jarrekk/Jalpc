---
layout: post
title:  "用jPages为Jekyll增加分页"
desc: "Jekyll自带的分页功能总不是那么全，为了达到更好的分页效果，在不同类别的文章下进行分页，就要用别的方法来实现了。"
keywords: "Jekyll,pagination,jPages,javascript"
date:   2016-06-04
categories: [HTML]
tags: [pagination,jekyll]
icon: icon-html
---

Jekyll自带的分页功能总不是那么全，在[官方文档](http://jekyll.bootcss.com/docs/pagination/)中有讲到Jekyll自带分页的使用方法，为了达到更好的分页效果，比如在不同类别的文章下进行分页，就要用别的方法来实现了。

首先，在网上我也找到了很多Jekyll的第三方插件，功能很强大，不过github不允许使用，无奈之下只好另寻他法。因为平时做网站开发想到的都是后端分页的方法，那么在github这个不用考虑性能的网站上，我们为什么不能尝试使用前端分页的方法呢？而且我们的文章也不是非常多，一次得到所有数据再分页未尝不可。就这样，我在网上找到了一些基于jQuery的前端分页插件，使用感觉最好的就是[jPages](http://luis-almeida.github.io/jPages/)了。

jPages的文档很详细，每种分页的方法从html、JavaScript到CSS都有源代码，并有展示，这里我讲一下我是怎么用到jekyll中，我使用的是items per page这个example：

### Step 1

首先需要把jPages.js和js.js引入页面，放在jQuery.js的下面

### Step 2

然后在`_includes/head.html`中加入对应的js：

``` html
  <script type="text/javascript">
        $(function(){
          /* initiate the plugin */
          $("div.pag-holder").jPages({
              containerID  : "pag-itemContainer",
              perPage      : 5,  /* num of items per page */
              startPage    : 1,
              startRange   : 1,
              midRange     : 3,
              endRange     : 1
          });
      });
  </script>
```

这个js的作用是对`id="pag-holder"`的div进行渲染，主要是实现对应的页数和样式，对应的html在`_includes/pagination.html`中，注意js中的`containerID`，它会找页面中`id=pag-itemContainer`的id，对其进行分页，观察得到其实他就是将所有的item包装成`<ul><li>`，然后对每个item进行分页，然后下面就好做了，下面是`python.html`中的部分代码：

``` html
		<ul id="pag-itemContainer" style="list-style:none;">
    {\% assign counter = 0 \%}
		{\% for post in site.categories['Python'] \%}
		{\% assign counter = counter | plus: 1 \%}
		<li>
		...
```

* ps：因为jekyll会对代码中语法检查，我使用"\\"进行转义

因为直接使用`<ul><li>`会有一个圆点在每个item之前，使用`style="list-style:none;"`即可去除，这里我用了一个计数器，是为了在`_includes/pagination.html`中判断文章是否达到分页要求，因为我设置的是`perPage:5`，所以我有一个大于5的判断。

### Step 3

最后一步就是对分页的样式重新定义，因为jPages自带的样式很不好看，我使用的是bootstrap，这里需要在`jPages.js`中进行修改，具体可以在我[项目](https://github.com/Jack614/jalpc_jekyll_theme/blob/master/static/js/jPages.js)中的代码查看，有注释的部分是jPages原来的代码。