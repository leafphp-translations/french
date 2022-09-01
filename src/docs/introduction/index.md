<!-- markdownlint-disable no-inline-html -->
# Introduction

::: tip ⚡️ Official Release
This is the documentation for Leaf v3.0.

- [**Leaf 2 docs**](https://archive.leafphp.dev)
- [**Leaf 1 docs**](https://v1.leafphp.dev)
:::

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

## What is Leaf PHP?

Leaf is a slim and lightweight PHP framework for quickly bootstrapping clean, simple, but powerful web apps and APIs quickly and easily. Over the years, we've been focusing on delivering much simpler and more performant code, which can be used in all your PHP apps.

Version 3 of Leaf brings more to the table with a theme centring on developer experience and usability, but with all the goodies while ensuring users have the best experience as well.

[→ Checkout Leaf 3's features](/docs/introduction/features)

## Getting Started

The official guide assumes **basic** level knowledge of PHP.

::: warning 😵‍💫 Don't know PHP?
If you are not familiar with PHP, we recommend that you check out the [W3Schools PHP Tutorial](https://www.w3schools.com/php/default.asp) before continuing. This is because you will basically be writing PHP code when using Leaf (or any other framework).
:::

### Installation

<VideoDocs
  subject="Watch the leaf 3 installation walkthrough"
  description="Throughout the leaf documentation, you will see video links like the one just below. If you are a visual learner, this gives you another way to follow along with our documentation. We call these the video docs."
  link="https://www.youtube.com/embed/PuOk5xqTIsA"
/>

To quickly get started with Leaf, check out our [installation guide](/docs/introduction/installation.html). This gives you an in-depth explanation of how to set up leaf using various methods.

::: tip Migrating
Already know Leaf 2 and just want to learn about what's new in Leaf 3? Check out the [Migration Guide](/docs/migration/introduction.html)!
:::

Below is a hello world example which takes you through the core of Leaf. Other parts of the docs cover deeper examples. You can also refer to our [codelab experiments](https://codelabs.leafphp.dev) for real world examples and use-cases.

## Hello world example

At the core of Leaf PHP is a system that enables us to declaratively define applications using a friendly and straight-forward syntax:

**index.php:**

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () {
  echo 'Hello world';
});

$app->run();
```

</div>

<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  echo 'Hello world';
});

app()->run();
```

</div>

We have already created our very first Leaf app! This is as simple as it gets.

In addition, we can output data with Leaf response. This is a module that allows us to output data of various types without any hassle.

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () use($app) {
  $app->response()->markup('Hello world');
});

$app->run();
```

Now you might be wondering why we need to go through all of this just to return some HTML when we can just use echo. The reason for this is simple. `Response` takes care of a lot of issues for us under the hood and renders exactly what we expect. Let's look at an example below.

</div>
<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->markup('Hello world');
});

app()->run();
```

We use `response` here instead of `echo` because it takes care of a lot of issues for us under the hood and renders exactly what we expect. Let's look at an example below.

</div>

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () {
  // set content-type to json
  Leaf\Http\Headers::contentJSON();

  echo '<b>Hello world</b>';
});

$app->run();
```

</div>

<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  // set content-type to json
  Leaf\Http\Headers::contentJSON();

  echo '<b>Hello world</b>';
});

app()->run();
```

</div>

When we run this, we get "\<b>Hello world\</b>" instead of **Hello World**

Unlike the confusion above between the content type and echo, Leaf response makes sure that whatever content we're trying to render is reflected in the content type. This is just one of the many things that response takes care of automatically.

## Functional Mode

We have mostly talked about general features that are the same even in Leaf 2, so let's talk about some spice in Leaf 3.

::: tip
This is just an introduction to functional mode. Read the [functional mode documentation](/docs/tooling/functions.html) for the full explanation.
:::

Basically, leaf 3 comes with global helper functions that take away the only pain anyone has ever had in using leaf, i.e., long namespaces and class initializers. Let's rewrite the first example in functional mode.

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->markup('Hello world');
});

app()->run();
```

You'll notice that we've gotten rid of the lengthy `use Leaf\Http\Response;` and even the leaf initializer. Leaf 3 helps you focus on only what matters: your application. Everything is either done for you under the hood or made available to you in easy-to-use tools.

### Handling User Input

One very important part of building web apps/APIs is user input. Users may pass data into your leaf app through forms, http request bodies, URLs, ...

You must read this data and make sure it can't harm your system before performing any operations on it. This can be very clumsy when done raw with PHP, especially when the data comes in through multiple channels. Leaf has, however, prepared a simple handler for this: `Leaf\Http\Request`. Since we are using functional mode, we will use the `request` method instead of this lengthy class.

The user navigates to /?greeting=hello%20world

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  // we can get the GET request data from the URL like this
  $greeting = request()->get('greeting'); // hello world

  // output json encoded data
  response()->json([
    'greeting' => $greeting
  ]);
});

app()->run();
```

The most beautiful thing about the request object is that all data passed into your app is automatically sanitized to prevent attacks like XSS. You have simple and safe code working for you.

## Class mode vs Functional mode

Leaf supports two different ways of writing your code:

- Using functional mode which you saw above
- Using class mode which is what has been used since Leaf v1

### Class Mode

This method is the default for most frameworks. Since leaf comes with classes, you can entirely build your aplication using those classes. like the `Leaf\Http\Response` class.

```php
<?php

require __DIR__ . "/vendor/autoload.php";

$app = new Leaf\App;

$app->get("/", function () {
  echo "Hello world";
});

$app->run();
```

### Functional Mode

Classes become annoying to use and repeat, especially because of namespaces. You also sometimes need to put the instance of a class into a function's scope with `use`. Getting the particular instance of a class can be difficult which sometimes leads to reinitializing the class. For these reasons (and more), we created scopeless functions which allow you to quickly build your applications. These functions return instances of Leaf's classes so you don't need to use the classes yourself.

```php
<?php

require __DIR__ . "/vendor/autoload.php";

app()->get("/", function () {
  echo "Hello world";
});

app()->run();
```

## Modes in the docs

Just as leaf allows you to write your code in 2 ways, with functional mode or class mode, our docs come with examples prepared for both.

You can click on this switch in the sidebar to toggle the mode of the examples on our documentation.

![Switcher](https://user-images.githubusercontent.com/26604242/178108346-c9c22a19-6a82-4786-ac3e-00cbfe69cba8.png)

## Installing modules

Modules are pieces of functionality that have been packaged and shipped separately from the Leaf core. Modules are used to extend Leaf's reach by performing operations not available on the core. Modules were introduced with Leaf 3, but some of them can be used with earlier versions of Leaf. Modules can also be used in external libraries and frameworks as well. To install a module, simply run its install script with composer or use the leaf CLI.

To demonstrate this, we will expand the app above to output a template instead of the JSON data from earlier. For this, we will need a template module. Leaf has 3 template modules

- BareUI: Super lightweight, blazing fast templating engine with zero compilation
- Blade: A port of the laravel blade templating engine
- Leaf Veins: Lightweight but powerful templating

For this demo, we will use BareUI. We can install BareUI with leaf CLI.

```sh
leaf install bareui
```

Or with composer:

```sh
composer require leafs/bareui
```

After this, Leaf **automatically** links the BareUI class for you and makes it available on the leaf object as `template`. So from there, we can create our template. I'll name this `index.view.php` (BareUI templates end in `.view.php`)

```php
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h2><?php echo $greeting; ?></h2>
</body>
</html>
```

The next thing to do is to tell BareUI where to look for templates and finally render `index.view.php`.

<div class="class-mode">

```php
<?php

require __DIR__ . "/vendor/autoload.php";

$app = new Leaf\App();

// point to the templates directory
$app->template->config("path", "./");

$app->get("/", function () use($app) {
  // we can get the GET request data from the URL like this
  $greeting = $app->request()->get("greeting"); // hello world

  // render our template
  echo $app->template->render("index", [
    "greeting" => $greeting,
  ]);
});

$app->run();
```

</div>
<div class="functional-mode">

```php
<?php

require __DIR__ . "/vendor/autoload.php";

// point to the templates directory
app()->template->config("path", "./");

app()->get("/", function () {
  // we can get the GET request data from the URL like this
  $greeting = request()->get("greeting"); // hello world

  // render our template
  echo app()->template->render("index", [
    "greeting" => $greeting,
  ]);
});

app()->run();
```

</div>

Just as you saw above, most Leaf modules require absolutely no configuration in order to work with the Leaf core. They just fit right in.

## Ready for More?

We've briefly introduced the most basic features of Leaf 3 - the rest of this guide will cover them and other advanced features in much finer detail, so make sure to read through it!

## Next Steps

If you skipped the [Introduction](/guide/introduction), we strongly recommend reading it before moving on to the rest of the documentation.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/docs/introduction/installation">
    <h3 class="next-steps-link">Continue the Guide</h3>
    <small class="next-steps-caption">The guide walks you through every aspect of the framework in full details.</small>
  </a>
  <a class="vt-box" href="/docs/introduction/first-app">
    <h3 class="next-steps-link">Follow the Tutorial</h3>
    <small class="next-steps-caption">For those who prefer learning things hands-on. Let's build something real!</small>
  </a>
  <a class="vt-box" href="https://codelabs.leafphp.dev" target="_blank">
    <h3 class="next-steps-link">Check out CodeLabs</h3>
    <small class="next-steps-caption">Codelabs provides interactive tutorials with in-depth explanations.</small>
  </a>
</div>
