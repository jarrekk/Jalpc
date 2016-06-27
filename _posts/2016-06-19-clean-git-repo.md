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

## 查找大文件并清理

下载[Bash Script](https://raw.githubusercontent.com/Jack614/jalpc_jekyll_theme/gh-pages/git_find_big.sh)，在项目目录下：

```
$ chmod 777 git_find_big.sh
$ git gc --auto
```

查找大文件：

```
$ git_find_big.sh 
All sizes are in kB's. The pack column is the size of the object, compressed, inside the pack file.
size  pack  SHA                                       location
592   580   e3117f48bc305dd1f5ae0df3419a0ce2d9617336  media/img/emojis.jar
550   169   b594a7f59ba7ba9daebb20447a87ea4357874f43  media/js/aui/aui-dependencies.jar
518   514   22f7f9a84905aaec019dae9ea1279a9450277130  media/images/screenshots/issue-tracker-wiki.jar
337   92    1fd8ac97c9fecf74ba6246eacef8288e89b4bff5  media/js/lib/bundle.js
240   239   e0c26d9959bd583e5ef32b6206fc8abe5fea8624  media/img/featuretour/heroshot.png
```

手动清理文件：

```
git filter-branch --index-filter 'git rm --cached --ignore-unmatch filename' HEAD
```

提交

```
git push -f
```
