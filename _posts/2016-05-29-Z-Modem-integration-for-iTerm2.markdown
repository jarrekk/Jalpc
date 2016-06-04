---
layout: post
title:  "使用iTerm2上传下载文件"
desc: "在Mac上使用iTerm2确实让Linux终端操作方便的很多，加上[oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)这个强大shell的利器，敲命令就像滚键盘一样。"
keywords: "iterm,mac,lrzsz,oh-my-zsh"
date:   2016-05-29
categories: [Mac]
tags: [Mac]
icon: fa-apple
---

在Mac上使用iTerm2确实让Linux终端操作方便的很多，加上[oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)这个强大shell的利器，敲命令就像滚键盘一样。

但是iTerm2没有对文件上传下载进行支持，这个是要比secureCRT弱的地方，不过我们总有办法能够解决，因为iTerm2足够强大，下面是利用rz/sz工具来实现文件上传下载的方法：

在Mac电脑上安装rz/sz：`brew install lrzsz`

``` shell
#!/usr/bin/env bash

#
# iterm2-zmodem
#
# copyright (c) 2013 by Harald Lapp <harald@octris.org>
#
# AppleScript portion from:
# http://stackoverflow.com/questions/4309087/cancel-button-on-osascript-in-a-bash-script
# licensed under cc-wiki with attribution required 
#

#
# This script can be found at:
# https://github.com/aurora/iterm2-zmodem
#

#
# This is a re-implementation of the shell scripts "iterm2-recv-zmodem.sh" and
# "iterm2-send-zmodem.sh" found at https://github.com/mmastrac/iterm2-zmodem
#

# usage
if [[ $1 != "sz" && $1 != "rz" ]]; then
    echo "usage: $0 sz|rz"
    exit
fi

# send Z-Modem cancel sequence
function cancel {
	echo -e \\x18\\x18\\x18\\x18\\x18
}

# send notification using growlnotify
function notify {
    local msg=$1
    
    if command -v growlnotify >/dev/null 2>&1; then
        growlnotify -a /Applications/iTerm.app -n "iTerm" -m "$msg" -t "File transfer"
    else
        echo "# $msg" | tr '\n' ' '
    fi
}

#setup
[[ $LRZSZ_PATH != "" ]] && LRZSZ_PATH=":$LRZSZ_PATH" || LRZSZ_PATH=""

PATH=$(command -p getconf PATH):/usr/local/bin$LRZSZ_PATH
ZCMD=$(
    if command -v $1 >/dev/null 2>&1; then
        echo "$1"
    elif command -v l$1 >/dev/null 2>&1; then
        echo "l$1"
    fi
)

# main
if [[ $ZCMD = "" ]]; then
    cancel
    echo

    notify "Unable to find Z-Modem tools"
    exit
elif [[ $1 = "rz" ]]; then
    # receive a file
    DST=$(
        osascript \
            -e "tell application \"iTerm\" to activate" \
            -e "tell application \"iTerm\" to set thefile to choose folder with prompt \"Choose a folder to place received files in\"" \
            -e "do shell script (\"echo \"&(quoted form of POSIX path of thefile as Unicode text)&\"\")"
    )
    
    if [[ $DST = "" ]]; then
        cancel
        echo 
    fi

	cd "$DST"
	
    notify "Z-Modem started receiving file"

    $ZCMD -e -y
    echo 

    notify "Z-Modem finished receiving file"
else
    # send a file
    SRC=$(
        osascript \
            -e "tell application \"iTerm\" to activate" \
            -e "tell application \"iTerm\" to set thefile to choose file with prompt \"Choose a file to send\"" \
            -e "do shell script (\"echo \"&(quoted form of POSIX path of thefile as Unicode text)&\"\")"
    )

    if [[ $SRC = "" ]]; then
        cancel
        echo 
    fi

    notify "Z-Modem started sending
$SRC"

    $ZCMD -e "$SRC"
    echo 

    notify "Z-Modem finished sending
$SRC"
fi
```

首先将这个脚本写到/usr/local/bin/iterm2-zmodem文件下，给它可执行权限`chmod +x /usr/local/bin/iterm2/zmodem`，这个脚本是在Linux终端使用rz/sz时调用的，需要由iTerm2触发，在iTerm2->Preferences...->Profiles->Advanced下的Triggers，点击Edit进入编辑。加入如下配置即可：

```
Regular expression: \*\*B0100
Action:             Run Coprocess
Parameters:         /usr/local/bin/iterm2-zmodem sz

Regular expression: \*\*B00000000000000
Action:             Run Coprocess
Parameters:         /usr/local/bin/iterm2-zmodem rz
```
Github链接：<https://github.com/Jack614/iterm2-zmodem>
