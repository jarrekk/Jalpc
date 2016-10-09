# Jalpc. [![Analytics](https://ga-beacon.appspot.com/UA-73784599-1/welcome-page)](https://github.com/Jack614/jalpc_jekyll_theme)

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.png?v=103)](https://github.com/ellerbrock/open-source-badge/)

<http://www.jack003.com>

![Blog](blog.gif)

This is a simple, beautiful and swift theme for Jekyll. It's mobile first, fluidly responsive, and delightfully lightweight.

It's pretty minimal, but leverages large type and drastic contrast to make a statement, on all devices.

The landing page of the blog is multilingual page.

It is my pleasure to contact me, you can give me your website or some advice about my website. Let's build a wonderful Jekyll theme together!

## Ad

[Jalpc-A](https://github.com/Jack614/Jalpc-A): another Jekyll theme written by [AngularJS](https://angularjs.org/).

## Getting Started

If you're completely new to Jekyll, I recommend checking out the documentation at <http://jekyllrb.com> or there's a tutorial by Smashing Magazine.

#### Fork, then clone

**Fork** the repo, and then **clone** it so you've got the code locally.

```
$ git clone https://github.com/<your githubname>/jalpc_jekyll_theme.git
$ cd jalpc_jekyll_theme
$ gem install jekyll # If you don't have jekyll installed
$ rm -rf _site && jekyll server
```

### Modify `_config.yml`

The _config.yml located in the root of the jalpc_jekyll_theme directory contains all of the configuration details for the Jekyll site. The defaults are:

``` yml
# Website settings
title: "Jalpc"
description: "Jack's blog,use Jekyll and github pages."
keywords: "Jack,Jalpc,blog,Jekyll,github,gh-pages"

baseurl: "/"
url: "http://www.jack003.com"
# url: "http://127.0.0.1:4000"

# author
author:
  name: 'Jack'
  first_name: 'Jia'
  last_name: 'Kun'
  email: 'me@jack003.com'
  facebook_username: 'jiakunnj'
  github_username: 'Jack614'
  head_img: 'static/img/landing/Jack.jpg'
...
```

#### Index page

The index page is seprated into several sections and they are located in `_includes/sections`,the configuration is in `_config.yml` and section's detail configuration is in `_data/*.yml`.

#### Modify `_data/*.yml`

These files are used to dynamically render pages, so you almost don't have to edit *html files* to change your own theme, besides you can use `jekyll serve --watch` to reload changes.

The following is mapping between *yml file* to *sections*.

* blog.yml  ==>  _includes/sections/blog.html
* careers.yml  ==>  _includes/sections/career.html
* links.yml  ==>  _includes/sections/links.html
* projects.yml  ==>  _includes/sections/projects.html
* skills.yml  ==>  _includes/sections/skills.html

### Jekyll Serve

Then, start the Jekyll Server. I always like to give the --watch option so it updates the generated HTML when I make changes.

```
$ jekyll serve --watch
```

Now you can navigate to localhost:4000 in your browser to see the site.

### Using Github Pages

You can host your Jekyll site for free with Github Pages. [Click here](https://pages.github.com) for more information.

A configuration tweak if you're using a gh-pages sub-folder

In addition to your github-username.github.io repo that maps to the root url, you can serve up sites by using a gh-pages branch for other repos so they're available at github-username.github.io/repo-name.

This will require you to modify the _config.yml like so:

``` yml
# Welcome to Jekyll!

# Site settings
title: Website Name

baseurl: "/"
url: "http://github-username.github.io"
# url: "http://127.0.0.1:4000"

# author
author:
  name: nickname
  first_name: firstname
  last_name: lastname
  email: your_email@example.com
  facebook_username: facebook_example
  github_username: 'github_example
  head_img: 'path/of/head/img'

# blog img path
img_path: '/path/of/blog/img/'
```

If you start server on localhost, you can turn on `# url: "http://127.0.0.1:4000"`.

### Pagination

The pagination in jekyll is not very perfect,so I use front-end web method,there is a [blog](http://www.jack003.com/html/2016/06/04/jekyll-pagination-with-jpages.html) about the method and you can refer to [jPages](http://luis-almeida.github.io/jPages).

### Page counter

Many third party page counter platform is to slow,so I count my website page view myself,the javascript file is `static/js/count_index.js`,the backend is [Leancloud](https://leancloud.cn).

### Multilingual Page

The landing page has multilingual support with the [i18next](http://i18next.com) plugin.

Languages are configured in the `config.yml` file.

#### Step 1

Add a new language entry

```yml
languages:
  - locale: 'en'
    flag: 'static/img/flags/United-States.png'
  - locale: '<language_locale>'
    flag: '<language_flag_url>'
```

#### Step 2

Add a new json (`static/locales/<language_locale>.json`) file that contains the translations for the new locale.

Example `en.json`

```json
{
  "website":{
    "title": "Jalpc"
  },
  "nav":{
    "home": "Home",
    "about_me": "About",
    "skills": "Skills",
    "career": "Career",
    "blog": "Blog",
    "contact": "Contact"
  }
}
```

#### Step 3

Next you need to add html indicators in all place you want to use i18n.(`_includes/sections/*.html` and `index.html`)

Example:

``` html		
<a class="navbar-brand" href="#page-top" id="i18_title"><span data-i18n="website.title">{{ site.title }}</span></a>
```

#### Step 4

Next you need to initialise the i18next plugin(`index.html`):

``` javascript
$.i18n.init(
    resGetPath: 'locales/__lng__.json',
    load: 'unspecific',
    fallbackLng: false,
    lng: 'en'
}, function (t)
    $('#i18_title').i18n();
});
```

### Web analytics

I use [Baidu analytics](http://tongji.baidu.com/web/welcome/login) and [Google analytics](https://www.google.com/analytics/) to do web analytics, you can choose either to realize it,just register a account and replace id in `_config.yml`.

### Comment

I use [Changyan](http://changyan.kuaizhan.com/) and [Disqus](https://disqus.com/) to realize comment.

#### Changyan
To configure Changyan, get the appid and conf in <http://changyan.kuaizhan.com/>. Then, in `_config.yml`, edit the changyan value to enable Changyan.

#### Disqus
To configure Disqus,you should set disqus_shortname and get public key and then, in `_config.yml`, edit the disqus value to enable Disqus.

### Share

I use [bshare](http://www.bshare.cn/) to share my blog on other social network platform. You can register a count and get your share uuid.

### Search engines

I use javascript to realize blog search,you can double click `Ctrl` or click the icon at lower right corner of the page,the detail you can got to this repo: <https://github.com/androiddevelop/jekyll-search>.

Just use it.

![search](search.gif)

### CNAME

Replace your website domain in **CNAME** file.

### Put in a Jalpc Plug

If you want to give credit to the Jalpc theme with a link to my personal website <http://www.jack003.com>, that'd be awesome. No worries if you don't.

### Enjoy

Hope you enjoy using Jalpc. If you encounter any issues, please feel free to let me know by creating an issue. I'd love to help.

## Upgrading Jalpc

Jalpc is always being improved by its users, so sometimes one may need to upgrade.

### Ensure there's an upstream remote

If `git remote -v` doesn't have an upstream listed, you can do the following to add it:

```
git remote add upstream https://github.com/Jack614/jalpc_jekyll_theme.git
```

### Pull in the latest changes

```
git pull upstream gh-pages
```

There may be merge conflicts, so be sure to fix the files that git lists if they occur. That's it!

## Thanks to the following

* [Jekyll](http://jekyllrb.com)
* [Bootstrap](http://www.bootcss.com)
* [jPages](http://luis-almeida.github.io/jPages)
* [i18next](http://i18next.github.io/i18next)
* [pixyll](https://github.com/johnotander)
* [androiddevelop](https://github.com/androiddevelop)

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
