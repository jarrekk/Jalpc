---
layout: post
title:  "3 Steps (2 minutes) to Setup Your Personal Website with Jalpc"
date:   2017-01-19
desc: "3 Steps (2 minutes) to Setup Your Personal Website with Jalpc"
keywords: "Jalpc,Jekyll,gh-pages,website,blog,easy"
categories: [HTML]
tags: [Jalpc,Jekyll]
icon: icon-ruby
---

Everyone wants to have a personal website, you can display your infomation to public, post blogs and make friends. If you are CS engineer, haveing a self website will benefit your interview.

So, if you like this website <http://www.jack003.com> and are willing to have a website, here is a way to build your website in 3 steps(2 minutes). Following are steps to setup your website:

1. Fork [Jalpc](https://github.com/JiaKunUp/jalpc_jekyll_theme) at [GitHub](https://github.com), then clone forked repository. `git clone git@github.com:github_username/jalpc_jekyll_theme.git`

2. Enter into repository directory and edit following file list:

	* **_config.yml**: edit 'Website settings', 'author', 'comment' and 'analytics' items.

	* **_data/landing.yml**: custom sections of index page.

	* **_data/index/**: edit sections' data to yours at index page, please notice comment at each file.

	* **_data/blog.yml**: edit navbar(categories) of blog page, if you have different/more blog page, add HTML file at `blog/` like this:

```
---
layout: blog
title: Sample    <!-- Suppose your category is Sample -->
permalink: /sample/    <!-- permalink should be '/sample/' -->
---
{\% include category.html \%}
```

		ps：`\%` should be `%`, since this code will be rendered by Jekyll.

	* **CNAME**: If you wanna release website at your own domain name: edit it; if you want to use *github_username.github.io*: remove it.

3. Push changes to your github repository and view your website, done!

```
cd /path/of/repository/directory
git add .
git commit -m 'edit my website'
git push
```

If you like this repository, I appreciate you star this repository. Please don't hesitate to mail me or post issues on GitHub if you have any questions. Hope you have a happy blog time!
