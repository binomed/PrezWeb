# PrezWeb
Presentation for the Web evolutions

# Install

This presentation run with [RevealJS](https://github.com/hakimel/reveal.js) and it use Gulp as task runner. To start with the presentation : 

`npm install`

and just type `gulp` the default task start a server and do all the compilations.

# Presentation Structure : 

-> index.html : the entry point
-> assets\images : all the images of the prez
-> assets\markdown\prez.md : the content of the presentation. This will will be parse and transform to html by reveal 
-> scss\prez\style.scss : the specifics css of the presentation
-> scss\theme\* : the theme use (binomed see below to discover it)
-> libs\* : all the libraries needed for running well the presentation. Do not touch to the files in this directory
-> reveal : the presentation engine. Do not touch to the files in this directory
-> scripts : the javascript files to manage the interaction with the slides 

Codes for writing the slides : 

# Transitions between slides : 

* To create a new slide (horizontal) : separate 2 slides with `##==##` 
* To create a new slide (vertical) : separate 2 slides with `##--##` 
* To add speakers notes on a slide add `Notes:` and write your notes the line after

# Reveal meta datas

You can add some meta-data to slides / elements by adding 

## On Slides

```html
<!-- .slides: data-custom="custom" class="my-class" -->
```

This will produce at the end : 

```html
<section data-custom="custom" class="my-class">
```

## On Element

```html
my Markdown Content <!-- .element: data-custom="custom" class="my-class" -->
```

This will produce at the end : 

```html
<div data-custom="custom" class="my-class">my Markdown Content</div>
```

## Reveal meta-datas

* On Elements : `class=fragment` : for sequential show
* On Slides : `data-background="URL_TO_IMAGE / COLOR"` : define a special background
* On Slides : `data-state="state"` : for detecting when we arrive at this slide. To use with `Reveal.addEventListener('state', callback)`


# Reveal Md Style Bootstrap

in order to facilitate the disposition on some slides. You can use thoses helpers. Each time, use the class : 

* `cetner` : the element will center horizontaly
* `full-width` : the element will take 100% of width
* `full-height` : the element will take 100% of height
* `float-left` : the element will have `float = left`
* `float-right` : the element will have `float = right`
* `h-50 to h-2000` : the element will have it's height that will take 50px to 2000px
* `w-50 to w-2000` : the element will have it's width that will take 50px to 2000px

# Binomed Style

Like for masks in Power point, there somes masks : 

## First Slide

```html
<!-- .slide: class="first-slide" -->

# **Presentation Title**
## **sub Title**

### year.mm.dd Meeting Name @ **Where**
```


## Speaker Presentation

```html
<!-- .slide: class="who-am-i" -->

## Qui suis-je ?

### Jean-François GARREAU

<!-- .element: class="descjf" -->
IoT Manager, Senior innovation developper & Community Manager

![avatar w-300 wp-200](assets/images/jf.jpg)


![company_logo](assets/images/lucca_logo.png)
![gdg_logo](assets/images/GDG-Logo-carre.png)

<!-- .element: class="twitter" -->
[@jefBinomed](http://twitter.com/jefBinomed)

<!-- .element: class="gplus" -->
[+JeanFrancoisGarreau](http://plus.google.com/+JeanFrancoisGarreau)
```

## Transition with title in White

```html
<!-- .slide: class="transition-white" -->

# A White Transition Slide
```

## Transition with title in Black

```html
<!-- .slide: class="transition-black" -->

# A Black Transition Slide
```

## Custom Transition Title (use of data-background)

```html
<!-- .slide: data-background="PATH_TO_MY_IMAGE" class="transition" -->

# A Custom Transition Slide
```

A filter will be affected to show the text correctly

## Custom Transition Title with copyright (use of data-background)

```html
<!-- .slide: data-background="PATH_TO_MY_IMAGE" data-copyrights="true" class="transition" -->

# With CopyRights

<div class="copyrights">copyrights</div>
```

copyrights coulds have 3 colors : 
* `class="copyrights"` : a grey
* `class="copyrights white"` : a light grey
* `class="copyrights black"` : a dark grey

## Custom Transition without the filter 

```html
<!-- .slide: data-background="PATH_TO_MY_IMAGE" class="transition no-filter" -->

```

## Transition with icon

```html
<!-- .slide: class="transition-white" -->

# A White Transition Slide with icon

![](PATH_TO_MY_ICON) <!-- .element: class="icon" -->
```

The icon will be reduce to `max-width:150px; max-height:150px`

## Slide with code

```html
<!-- .slide: class="with-code" -->

## Some Code


 ```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    >
    <TextView
        android:layout_width="fill_parent" 
        android:layout_height="wrap_content" 
        android:text="@string/hello"
        />
</LinearLayout>
 ```

```

## Slide With Big Code

```html

<!-- .slide: class="with-code" -->

## Some BIG Code


<!-- .element: class="big-code" -->
 ```xml
<?xml version="1.0" encoding="utf-8"?>
 ```

```

## A Quote

```html

## A Quote


<blockquote> 
<cite>
  To Quote or not to quote... 
</cite>
</blockquote>

```

## Last Slide

```html

<!-- .slide: class="last-slide" -->


<!-- .element: class="thank-message" --> Thank you

<!-- .element: class="presenter" --> **Jean-François Garreau  **

<!-- .element: class="work-rule" --> GDG Nantes Leader & Ingénieur Lucca 

<!-- .element: class="email" --> **jef**@gdgnantes.com  

```

## Normal Slide

```html
## Title

### SubTitle 


A Wonderfull Content ! 

```

"A Wonderfull Content" will be big because on stage, you don't have to show lots of text !

# Play with the visibility of the slides

Because you often don't want to publish the same slides that you present, you can with this theme use a single file that describe which slides will be present on stage or after.

## Configuration

### Index.html

on the `<div class="slides">` element specify the kind of slides you want to show.

```html
<div class="slides" data-type-show="prez"></div>
```

You could set this values : 

* no value
* "prez"
* "full"

### Slides configuration

You have to add the same meta data on the slides that you want to affect

```html
<!-- .slide: data-type-show="prez" -->

## A slide for prez only

A few words !
```

### Recap 

|Slides\Index|no value or not set|"prez"|"full"|
|-----|------|-|----------|
|no value or not set|Will be show|Will be show|Will be show|
|"prez"|Will be show|Will be show|Will be NOT show|
|"full"|Will be show|Will be NOT show|Will be show|
