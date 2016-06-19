---
layout: post
title:  "清洗 Git Repo 代码仓库"
date:   2016-06-19
desc: "清洗 Git Repo 代码仓库"
keywords: "git,repo,clean,清洗"
categories: [Linux]
tags: [Git]
icon: fa-git
---

## 手动清理

如果你们的代码仓库问题比较少，只有几个不该提交的文件，可以参考 Atlassian 的一篇关于[维护 Git Repo](https://confluence.atlassian.com/display/BITBUCKET/Maintaining+a+Git+Repository)的文章。

### 大致过程如下：

首先进行 Git 垃圾回收：

```
git gc --auto
```

其次查看 Git 仓库占用空间：

```
$ du -hs .git/objects
45M .git/objects
```

然后找出历史中超过一定大小的文件，最后在历史中删除并且提交。如果感兴趣手动处理这个过程可以参照文章后边的链接。

### 相关的几个命令：

清理历史中的文件：

```
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch ****/nohup.out' --prune-empty --tag-name-filter cat -- --all
git filter-branch --index-filter 'git rm --cached --ignore-unmatch ****/nohup.out' HEAD
git for-each-ref --format="%(refname)" refs/original/ | xargs -n 1 git update-ref -d
```

强制提交覆盖：

```
git reflog expire --expire=now --all
git gc --prune=now
git push --all --force
git push --tags --force
```

