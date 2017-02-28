# <a name="jalpc"></a>Jalpc. [![Analytics](https://ga-beacon.appspot.com/UA-73784599-1/welcome-page)](https://github.com/Jack614/jalpc_jekyll_theme)

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.png?v=103)](https://github.com/ellerbrock/open-source-badge/)

<https://jarrekk.github.io/Jalpc/>

![Blog](readme_files/blog.gif)

* [3 steps to setup this theme at your website!](#three-steps)
* [Features](#features)
    * [Index page](#index-page)
    * [_data/\*.yml](#mofify-datayml)
    * [Chart Skills](#chart-skills)
    * [Categories in blog page](#categories-in-blog-page)
    * [Pagination](#pagination)
    * [Page views counter](#page-views-counter)
    * [Multilingual Page](#multilingual-page)
    * [Web analytics](#web-analytics)
    * [Comment](#comment)
    * [Share](#share)
    * [Search engines](#search-engines)
    * [Compress CSS and JS files](#compress-css-js)
* [Put in a Jalpc Plug](#put-in-a-jalpc-plug)
* [Upgrading Jalpc](#upgrading-jalpc)
    * [Ensure there's an upstream remote](#ensure-theres-an-upstream-remote)
    * [Pull in the latest changes](#pull-in-the-latest-changes)
* [Thanks to the following](#thanks-to-the-following)
* [Contributing](#contributing)
* [Todo](#todo)
* [Change Log](#change-log)
* [Ad](#ad)

This is a simple, beautiful and swift theme for Jekyll. It's mobile first, fluidly responsive, and delightfully lightweight.

If you're completely new to Jekyll, I recommend checking out the documentation at <http://jekyllrb.com> or there's a tutorial by Smashing Magazine.

## <a name="three-steps"></a> 3 steps to setup this theme at your website!

Here is a [document](https://jarrekk.github.io/Jalpc/html/2017/01/31/3-steps-to-setup-website-with-Jalpc.html) of how to setup this theme with 3 steps. If you have any **questions** please ask me at [GitHub Issues](https://github.com/jarrekk/Jalpc/issues).

## <a name="feature"></a>Features

### <a name="#index-page"></a>Index page

The index page is seprated into several sections and they are located in `_includes/sections`,the configuration is in `_data/landing.yml` and section's detail configuration is in `_data/*.yml`.

#### <a name="datayml"></a>`_data/*.yml`

These files are used to dynamically render pages, so you almost don't have to edit *html files* to change your own theme, besides you can use `jekyll serve --watch` to reload changes.

The following is mapping between *yml files* to *sections*.

* landing.yml ==> index.html
* index/language.yml ==> index.html
* index/careers.yml  ==>  _includes/sections/career.html
* index/skills.yml  ==>  _includes/sections/skills.html
* index/projects.yml  ==>  _includes/sections/projects.html
* index/links.yml  ==>  _includes/sections/links.html

This *yml file* is about blog page navbar

* blog.yml ==> _includes/header.html

The following is mapping between *yml files* to *donation*

* donation/donationlist.yml ==> blog/donate.html
* donation/alipay.yml  ==>  blog/donate.html
* donation/wechat_pay.yml ==> blog/donate.yml

### <a name="chart-skills"></a>Chart Skills

I use [Chart.js](http://www.chartjs.org/) to show skills, the type of skills' chart is radar, if you want to custom, please read document of Chart.js and edit **_includes/sections/skills.html** and **_data/index/skills.yml**.

### <a name="categories-in-blog-page"></a>Categories in blog page

In blog page, we categorize posts into several categories by url, all category pages use same template html file - `_includes/category.html`.

For example: URL is `http://127.0.0.1:4000/python/`. In `_data/blog.yml`, we define this category named `Python`, so in `_includes/category.html` we get this URL(/python/) and change it to my category(Python), then this page are posts about **Python**. The following code is about how to get url and display corresponding posts in  `_includes/category.html`.

```html
<div class="row">
    <div class="col-lg-12 text-center">
        <div class="navy-line"></div>
        {% assign category = page.url | remove:'/' | capitalize %}
        {% if category == 'Html' %}
        {% assign category = category | upcase %}
        {% endif %}
        <h1>{{ category }}</h1>
    </div>
</div>
<div class="wrapper wrapper-content  animated fadeInRight blog">
    <div class="row">
        <ul id="pag-itemContainer" style="list-style:none;">
            {% assign counter = 0 %}
            {% for post in site.categories[category] %}
            {% assign counter = counter | plus: 1 %}
            <li>
```

### <a name="pagination"></a>Pagination

The pagination in jekyll is not very perfect,so I use front-end web method,there is a [blog](http://www.jack003.com/html/2016/06/04/jekyll-pagination-with-jpages.html) about the method and you can refer to [jPages](http://luis-almeida.github.io/jPages).

### <a name="page-views-counter"></a>Page views counter

Many third party page counter platforms are too slow,so I count my website page view myself,the javascript file is [static/js/count.min.js](https://github.com/jarrekk/jalpc_jekyll_theme/blob/gh-pages/static/js/count.min.js) ([static/js/count.js](https://github.com/jarrekk/jalpc_jekyll_theme/blob/gh-pages/static/js/count.js)),the backend API is written with flask on [Vultr VPS](https://www.vultr.com/), detail code please see [jalpc-flask](https://github.com/jarrekk/jalpc-flask).

### <a name="multilingual-page"></a>Multilingual Page

The landing page has multilingual support with the [i18next](http://i18next.com) plugin.

Languages are configured in the `_data/index/language.yml` file.

> If you don't need this feature, please clear content in file `_data/language.yml` and folder `static/locales/`.

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

### <a name="web-analytics"></a>Web analytics

I use [Google analytics](https://www.google.com/analytics/) and [GrowingIO](https://www.growingio.com/) to do web analytics, you can choose either to realize it,just register a account and replace id in `_config.yml`.

### <a name="comment"></a>Comment

I use [Disqus](https://disqus.com/) to realize comment. You should set disqus_shortname and get public key and then, in `_config.yml`, edit the disqus value to enable Disqus.

### <a name="share"></a>Share

I use [AddToAny](https://www.addtoany.com/) to share my blog on other social network platform. You can go to this website to custom your share buttons and paste code at `_includes/share.html`.

![share](readme_files/share.png)

### <a name="search-engines"></a>Search engines

I use javascript to realize blog search,you can double click `Ctrl` or click the icon at lower right corner of the page,the detail you can got to this repo: <https://github.com/androiddevelop/jekyll-search>.

Just use it.

![search](readme_files/search.gif)

### <a name="compress-css-js"></a>Compress CSS and JS files

All CSS and JS files are compressed at `/static/assets`.

I use [UglifyJS2](https://github.com/mishoo/UglifyJS2), [clean-css](https://github.com/jakubpawlowicz/clean-css) and [purifycss](https://github.com/purifycss/purifycss) to compress/purify CSS and JS files. If you want to custom CSS and JS files, you need to do the following:

1. Install [NPM](https://github.com/npm/npm) then install **UglifyJS2** and **clean-css**: `npm install -g uglifyjs; npm install -g clean-css`, then run `npm install` at root dir of project.
2. Compress script is **build.js**, index page has its own CSS and JS compressed files, they are :
  * **app-index-xxx.min.css**
  * **app-index-xxx.min.js**
  * **i18-xxx.min.js**

  404 page are
  * **fof-xxx.min.css**
  * **fof-xxx.min.js**

  other pages are
  * **app-xxx.min.css**
  * **app-xxx.min.js**
  * **jPage-xxx.min.js**

  **xxx** is date when you compress your files.
3. If you want to add/remove CSS/JS files, just edit **build/build.js** and **build/files.conf.js**, then run `npm run build` at root dir of project, link/src files will use new files.

## <a name="put-in-a-jalpc-plug"></a>Put in a Jalpc Plug

If you want to give credit to the Jalpc theme with a link to my personal website <http://www.jack003.com>, that'd be awesome. No worries if you don't.

## <a name="upgrading-jalpc"></a>Upgrading Jalpc

Jalpc is always being improved by its users, so sometimes one may need to upgrade.

### <a name="ensure-theres-an-upstream-remote"></a>Ensure there's an upstream remote

If `git remote -v` doesn't have an upstream listed, you can do the following to add it:

```
git remote add upstream https://github.com/jarrekk/jalpc_jekyll_theme.git
```

### <a name="pull-in-the-latest-changes"></a>Pull in the latest changes

```
git pull upstream gh-pages
```

There may be merge conflicts, so be sure to fix the files that git lists if they occur. That's it!

## <a name="thanks-to-the-following"></a>Thanks to the following
* [Jekyll](http://jekyllrb.com)
* [Bootstrap](http://www.bootcss.com)
* [jPages](http://luis-almeida.github.io/jPages)
* [i18next](http://i18next.github.io/i18next)
* [pixyll](https://github.com/johnotander)
* [androiddevelop](https://github.com/androiddevelop)
* [UglifyJS2](https://github.com/mishoo/UglifyJS2)
* [clean-css](https://github.com/jakubpawlowicz/clean-css)
* [Chart.js](http://www.chartjs.org/)
* [shelljs](https://github.com/shelljs/shelljs)
* [colors](https://github.com/marak/colors.js/)

## <a name="contributing"></a>Contributing
1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## <a name="todo"></a>Todo
-[] `jekyll server --watch` mode need to use original CSS/JS files

##  <a name="change-log"></a>Change Log
* v1.1.2
  * purify style.css
* v1.1.1
  * display skills with Chart.js
  * add shelljs and colors
  * compress CSS/JS file with build.js automatically
* v1.1.0
  * Speed up!! reduce request times and file size
  * change bower to npm
  * compress CSS/JS files with uglifyjs and clean-css
* v1.0.5
  * add donation page
  * fix basuurl and url bug
* v1.0.4
  * use **_data** to config index page
  * separate index page by sections
* v1.0.3
  * change color
  * remove unused css code
* v1.0.2
  * use jPages to realize pagination
* v1.0.1
  * first release

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/jarrekk)

## <a name="ad"></a>Ad
[Jalpc-A](https://github.com/Jack614/Jalpc-A): another Jekyll theme written by [AngularJS](https://angularjs.org/).

