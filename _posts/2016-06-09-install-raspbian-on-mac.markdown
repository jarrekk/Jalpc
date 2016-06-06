---
layout: post
title:  "Mac下给SD卡安装Raspbian系统并配置WiFi"
date:   2016-06-09
desc: "install Raspbian to micro-sd on mac and config WiFi"
keywords: "mac,install,raspbian,micro-sd,wifi"
categories: [Linux]
tags: [Raspbian]
icon: icon-raspberrypi
---

## 1、安装

### 系统下载地址

插入SD卡，使用 df 查看当前已经挂载的卷

```
$ df
Filesystem    512-blocks      Used Available Capacity  iused   ifree %iused  Mounted on
/dev/disk1     233269248 218788512  13968736    94% 27412562 1746092   94%   /
devfs                374       374         0   100%      648       0  100%   /dev
map -hosts             0         0         0   100%        0       0  100%   /net
map auto_home          0         0         0   100%        0       0  100%   /home
/dev/disk2s1    31100416      4992  31095424     1%        0       0  100%   /Volumes/Pi
```

因为已经命名了SD卡为 Pi ，所以SD卡的分区对应的设备文件为：/dev/disk2s1

使用diskutil unmount卸载

```
$ diskutil unmount /dev/disk2s1
Volume Pi on disk2s1 unmounted
```

diskutil list 确认设备 我买的是16G的卡

```
$ diskutil list
/dev/disk2
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:     FDisk_partition_scheme                        *15.9 GB    disk2
   1:                 DOS_FAT_32 Pi                      15.9 GB    disk2s1
```

使用dd命令将系统镜像写入

PS /dev/disk2s1是分区，/dev/disk2是块设备，/dev/rdisk2是原始字符设备

```
$ dd bs=4m if=pi.img of=/dev/rdisk2
781+1 records in
781+1 records out
3276800000 bytes transferred in 194.134151 secs (16879050 bytes/sec)
```

至此，SD卡上已经刷入了 Raspbian 系统

再用diskutil unmountDisk卸载设备

```
$ diskutil unmountDisk /dev/disk2
Unmount of all volumes on disk2 was successful
```

## 2、配置WiFi

树莓派自带WiFi，在启动系统之后，我们可以通过`ip a`命令看到wlan0网卡，下面是修改`/etc/network/interfaces.d`配置文件：

```
# interfaces(5) file used by ifup(8) and ifdown(8)

# Please note that this file is written to be used with dhcpcd
# For static IP, consult /etc/dhcpcd.conf and 'man dhcpcd.conf'

# Include files from /etc/network/interfaces.d:
source-directory /etc/network/interfaces.d

auto lo
iface lo inet loopback

iface eth0 inet manual

allow-hotplug wlan0

iface wlan0 inet dhcp
wpa-ssid WiFi-ssid
wpa-psk WiFi-password
iface default inet dhcp

allow-hotplug wlan1
iface wlan1 inet manual
    wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
```

也可以配成静态网络

```
# interfaces(5) file used by ifup(8) and ifdown(8)

# Please note that this file is written to be used with dhcpcd
# For static IP, consult /etc/dhcpcd.conf and 'man dhcpcd.conf'

# Include files from /etc/network/interfaces.d:
source-directory /etc/network/interfaces.d

auto lo
iface lo inet loopback

iface eth0 inet manual

allow-hotplug wlan0

iface wlan0 inet static
wpa-ssid WiFi-ssid        # 需要连接的WiFi名
wpa-psk WiFi-password     # WiFi密码
address 192.168.1.110     # 设定的静态IP地址
netmask 255.255.255.0     # 网络掩码
gateway 192.168.1.1      # 网关
network 192.168.1.1      # 网络地址
iface default inet dhcp

allow-hotplug wlan1
iface wlan1 inet manual
    wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
```

重启`init 6`即可（需要root权限）。

```
pi@raspberrypi:~ $ ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc pfifo_fast state DOWN group default qlen 1000
    link/ether b8:27:eb:ca:9c:86 brd ff:ff:ff:ff:ff:ff
    inet6 fe80::d72f:7f67:bf11:ec0f/64 scope link tentative
       valid_lft forever preferred_lft forever
3: wlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether b8:27:eb:9f:c9:d3 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.14/24 brd 192.168.1.255 scope global wlan0
       valid_lft forever preferred_lft forever
    inet6 fe80::c52e:80ca:79e2:ebb5/64 scope link
       valid_lft forever preferred_lft forever
```
