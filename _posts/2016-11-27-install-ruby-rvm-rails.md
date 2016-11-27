---
layout: post
title:  "如何快速正确的安装 Ruby, Rails 运行环境"
date:   2016-11-27
desc: "如何快速正确的安装 Ruby, Rails 运行环境"
keywords: "install,ruby,rails"
categories: [Python]
tags: [ruby,rails]
icon: icon-ruby
---

对于新入门的开发者，如何安装 Ruby, Ruby Gems 和 Rails 的运行环境可能会是个问题，本页主要介绍如何用一条靠谱的路子快速安装 Ruby 开发环境。

此安装方法同样适用于产品环境！

# 系统需求

首先确定操作系统环境，不建议在 Windows 上面搞，所以你需要用:

* Mac OS X
* 任意 Linux 发行版本(Ubuntu,CentOS, Redhat, ArchLinux ...)

> 强烈新手使用 Ubuntu 省掉不必要的麻烦！

以下代码区域，带有 $ 打头的表示需要在控制台（终端）下面执行（不包括 $ 符号）

## 步骤0 － 安装系统需要的包

``` bash
# For Mac
# 先安装 [Xcode](http://developer.apple.com/xcode/) 开发工具，它将帮你安装好 Unix 环境需要的开发包
# 然后安装 [Homebrew](http://brew.sh)
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

OS X 安装 Rails 必要的一些三方库

``` bash
$ brew install libxml2 libxslt libiconv
```

## 步骤1 － 安装 RVM

RVM 是干什么的这里就不解释了，后面你将会慢慢搞明白。

``` bash
$ gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
$ curl -sSL https://get.rvm.io | bash -s stable
# 如果上面的连接失败，可以尝试:
$ curl -L https://raw.githubusercontent.com/wayneeseguin/rvm/master/binscripts/rvm-installer | bash -s stable
```

期间可能会问你 sudo 管理员密码，以及自动通过 Homebrew 安装依赖包，等待一段时间后就可以成功安装好 RVM。

然后，载入 RVM 环境（新开 Termal 就不用这么做了，会自动重新载入的）

``` bash
$ source ~/.rvm/scripts/rvm
```

修改 RVM 下载 Ruby 的源，到 Ruby China 的镜像:

``` bash
echo "ruby_url=https://cache.ruby-china.org/pub/ruby" > ~/.rvm/user/db
```

检查一下是否安装正确

``` bash
$ rvm -v
rvm 1.22.17 (stable) by Wayne E. Seguin <wayneeseguin@gmail.com>, Michal Papis <mpapis@gmail.com> [https://rvm.io/]
```

检查一下是否安装正确

## 步骤2 － 用 RVM 安装 Ruby 环境

``` bash
$ rvm requirements
$ rvm install 2.3.0
```

同样继续等待漫长的下载，编译过程，完成以后，Ruby, Ruby Gems 就安装好了。

## 步骤3 － 设置 Ruby 版本

RVM 装好以后，需要执行下面的命令将指定版本的 Ruby 设置为系统默认版本

``` bash
$ rvm use 2.3.0 --default
```

同样，也可以用其他版本号，前提是你有用 rvm install 安装过那个版本

这个时候你可以测试是否正确

``` bash
$ ruby -v
ruby 2.3.0 ...

$ gem -v
2.1.6

$ gem sources --add https://gems.ruby-china.org/ --remove https://rubygems.org/
```

安装 Bundler

``` bash
$ gem install bundler
```

## 步骤4 － 安装 Rails 环境

上面 3 个步骤过后，Ruby 环境就安装好了，接下来安装 Rails

``` bash
$ gem install rails
```

然后测试安装是否正确

``` bash
$ rails -v
Rails 4.2.5
```

然后开始你的 Ruby，Rails 之旅吧。
欢迎来到 Ruby 的世界！
