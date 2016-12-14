---
layout: post
title:  "给sublime配置Python run环境"
date:   2016-12-14
desc: "给sublime配置Python run环境"
keywords: "Python,sublime,run,interactive"
categories: [Python]
tags: [Python,sublime]
icon: icon-python
---

使用默认的Python运行Python脚本的，如果有需要input的情况，在输入内容之后界面会卡住，找了很久终于找到可以方便运行脚本的方法。

1. 安装SublimeREPL
    首先需要有Package Control包。
    键入cmd + shift + p，输入install，找到Package Control: Install Package，安装所需软件包。

2. 点击Tools -> Build System -> New Build System... 键入如下内容：

    ```
    {
        "target": "run_existing_window_command",
        "id": "repl_python_run",
        "file": "config/Python/Main.sublime-menu"
    }
    ```

    保存成你要想要的名字，如`My-Python.sublime-build`，

3. 在Tools -> Build System 中选择刚刚新建的build，然后在需要运行的Python脚本中使用cmd + b 即可运行，运行结果在新的页面中展示。
