---
layout: post
title:  "3 Steps (2 minutes) to Setup Your Personal Website with Jalpc"
date:   2017-01-31
desc: "3 Steps (2 minutes) to Setup Your Personal Website with Jalpc"
keywords: "Jalpc,Jekyll,gh-pages,website,blog,easy"
categories: [HTML]
tags: [Jalpc,Jekyll]
icon: icon-html
---

Everyone wants to have a personal website, you can display your infomation to public, post blogs and make friends. If you are CS engineer, haveing a self website will benefit your interview.

So, if you like this website <https://jarrekk.github.io/Jalpc/> or <http://www.jarrekk.com> and are willing to have a website, here is a way to build your website in 3 steps(2 minutes). Following are steps to setup your website(make sure you have basic knowledge of [Jekyll](https://jekyllrb.com/) and [GitHub Pages](https://pages.github.com/), if you want to custom css/js [NPM](https://github.com/npm/npm) is needed):

1. Fork [this project -- Jalpc](https://github.com/jarrekk/Jalpc) at [GitHub](https://github.com). If you want to edit website at github, do it as following gif or clone forked repository. `git clone git@github.com:github_username/Jalpc.git`.

	<!-- ![edit]({{ site.img_path }}/3steps/edit.gif) -->
	<img src="{{ site.img_path }}/3steps/edit.gif" width="75%">

2. Enter into repository directory and edit following file list:

	* **_config.yml**: edit 'Website settings', 'author', 'comment' and 'analytics' items.

	* **_data/landing.yml**: custom sections of index page.

	* **_data/index/**: edit sections' data to yours at index page, please notice comment at each file.

	* **_data/blog.yml**: edit navbar(categories) of blog page, if you have different/more blog page, copy `blog/python.html` and change it to your category HTML file, and edit **Python**, **/python/** to your category name at items **title** and **permalink**, make sure title is the same as permalink but capitalized first letter(except HTML).

	* **CNAME**: If you wanna release website at your own domain name: edit it and create `gh-pages` branch; if you want to use *github_username.github.io*: leave it blank.

	* Go to repo's settings panel, config **GitHub Pages** section to make sure website is released.

3. Push changes to your github repository and view your website, done!

From now on, you can post your blog to this website by creating md files at `post/` directory and push it to GitHub, you can clear files at this directory before you post blogs.

If you like this repository, I appreciate you star this repository. Please don't hesitate to mail me or post issues on GitHub if you have any questions. Hope you have a happy blog time!😊
