# Leaf Response
<!-- markdownlint-disable no-inline-html -->

The response object is an abstraction of your Leaf application’s HTTP response that is returned to the HTTP client.

## Response on the Leaf Instance

Since Response is already bound to the Leaf instance, you can do this:

<div class="class-mode">

```php{4}
$app = new Leaf\App;

$app->get("/text", function () use($app) {
  $app->response()->markup("This is text");
});
```

</div>
<div class="functional-mode">

```php{2}
app()->get("/text", function () {
  app()->response()->markup("This is text");
});
```

</div>

Although we've added this, we don't want to force you to do stuff in only one way, so you can still use the `v1.x` method.

## Initialising the Response object

With this method, you manually initialise the Response object, and then pass it into your route.

```php{2,6}
$app = new Leaf\App;
$response = new Leaf\Http\Response;

$app->post("/login", function () use($response) {
  // ...
  $response->json(["username" => $user]);
});
```

## Functional Mode

Response also takes advantage of Leaf 3's functional mode with the `response` global which allows you quickly use the response object from wherever you are.

```php
response()->json([
  "status" => "success",
  "data" => "Hello",
]);
```

::: danger Note
In Http v2, you can no longer pass data directly to the response global.

```php
response([
  "status" => "success",
  "data" => "Hello",
]);
```

**THIS WILL NO LONGER WORK!!**
:::

An HTTP response has three primary properties:

- Status
- Header
- Body

The response object provides helper methods, described next, that help you interact with these HTTP response properties.

## Removed in v2

- ***`throwErr`***

This is a method which has existed since v1 of Leaf. `throwErr` was an attempt at error handling, but had a few issues: the biggest being that it only supports JSON data. To fix this, we came up with a more general solution [**(exit)**](#exit) which still simply outputs some data and breaks your app after that, making sure no other code runs after the output.

- ***Static Accessors***

Due to a certain number of new features added, most methods are no longer static. Not to worry, you can still use functional mode which means there's still no need to initialize the entire response object.

- ***Headers Object***

In version 2, the headers object has been removed. To set headers, you can use the `withHeader` method.

- ***Cookies Object***

Just like the headers object, we also got rid of the cookies object. You can use the `withCookie` method instead.

## New in v2

We completely rethought the original implementation of the response object. Although similar to the original implementation, v2 provides a simpler and much easier to use API, taking advantage of things like method chaining and auto detecting of response types.

### Method Chaining

This is the biggest addition to Leaf Http in version 2. Method chaining allows you to be more expressive with your code and basically fit everything better. There's just a single rule you need to follow here: ***the method you want to output should be the last thing you call.***

If you want to output some JSON with a header `something`, you should always set the header before calling the JSON method.

<div class="class-mode">

```php
// ☑️ CORRECT
$app->response()->withHeader('something', 'value')->json('data');

// ❌ HEADER ERROR
$app->response()->json('data')->withHeader('something', 'value');
```

</div>
<div class="functional-mode">

```php
// ☑️ CORRECT
response()->withHeader('something', 'value')->json('data');

// ❌ HEADER ERROR
response()->json('data')->withHeader('something', 'value');
```

</div>

## `plain`

This method allows you to output plain text as your response. It takes in 2 parameters:

- the data to output
- http status code with 200 default (optional)

<div class="class-mode">

```php
$app->response()->plain("hello");
```

</div>
<div class="functional-mode">

```php
response()->plain("hello");
```

</div>

## `xml`

This method allows you to output xml as your response. It takes in 2 parameters:

- the data to output
- http status code with 200 default (optional)

<div class="class-mode">

```php
$app->response()->xml(
  '<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" version="1.0.0" />'
);
```

</div>
<div class="functional-mode">

```php
response()->xml(
  '<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" version="1.0.0" />'
);
```

</div>

## `json`

This method allows you output json as a response.

It takes in 3 parameters:

- The data to output
- The https status code of the data, default 200 (optional)
- Option to show/hide the status code in response body, default `false` (optional)

<div class="class-mode">

```php
$app->response()->json("Output", 200);
```

</div>
<div class="functional-mode">

```php
response()->json("Output", 200);
```

</div>

**Output**:

```json
"Output"
```

Showing the code in body:

<div class="class-mode">

```php
$app->response()->json("Output", 200, true);
```

</div>
<div class="functional-mode">

```php
response()->json("Output", 200, true);
```

</div>

**Output**:

```json
{
  "data": "Output",
  "status": {
    "code": 200,
    "message": "OK"
  }
}
```

## `page`

This is a simple method that outputs an HTML/PHP file. This method can also be used to achieve server side routing, for example:

<div class="class-mode">

```php
$app->get('/homepage', function () use($app) {
  $app->response()->page('link/to/home.html');
});
```

</div>
<div class="functional-mode">

```php
app()->get('/homepage', function () {
  response()->page('link/to/home.html');
});
```

</div>

With this, whenever the route `/homepage` is invoked, Leaf loads up `home.html` and outputs it to the user.

**Note** The `page` method has **NOTHING** to do with templating, it simply outputs an already defined web page.

For templating with Leaf, [look here](/modules/views/)

**Status Code:**

It takes in a status code as the second parameter.

<div class="class-mode">

```php
$app->response()->page("404.html", 404);
```

</div>
<div class="functional-mode">

```php
response()->page("404.html", 404);
```

</div>

## `markup`

This method outputs some HTML/PHP:

<div class="class-mode">

```php
$app->get('/homepage', function () use($app) {
  $app->response()->markup("<h2>Hello</h2>");
});
```

</div>
<div class="functional-mode">

```php
app()->get('/homepage', function () {
  response()->markup("<h2>Hello</h2>");
});
```

</div>

You might be wondering why we don't just use

```php
echo "<h1>hello</h1>";
```

The reason is, Leaf has default headers which set the content type to JSON, in order to correctly output HTML, you need to change this.... Leaf has taken care of this with a bunch of other things, all within `markup` and `page`.

You can also specify a status code:

<div class="class-mode">

```php
$app->response()->markup("<h2>Hello</h2>", 201);
```

</div>
<div class="functional-mode">

```php
response()->markup("<h2>Hello</h2>", 201);
```

</div>

## `download`

In v3, you can send a response which will be downloaded on the client. Note that in this case, the response should be a valid file.

<div class="class-mode">

```php
// using defaults
$app->response()->download('path/to/file.zip');

// syntax
$app->response()->download('path/to/file.zip', 'File name on client', 200);
```

</div>
<div class="functional-mode">

```php
// using defaults
response()->download('path/to/file.zip');

// syntax
response()->download('path/to/file.zip', 'File name on client', 200);
```

</div>

As shown above, it takes in 3 parameters:

- the file to send as response
- The name of the file to show to client (optional, defaults to original filename)
- Http status code (optional, defaults to 200)

<div class="class-mode">

```php
$app->response()->download('item.jpg', 'Profile Pic', 200);

// to skip setting a name
$app->response()->download('item.jpg', null, 201);

// PHP 8
$app->response()->download(
  file: 'item.jpg',
  code: 201
);
```

</div>
<div class="functional-mode">

```php
response()->download('item.jpg', 'Profile Pic', 200);

// to skip setting a name
response()->download('item.jpg', null, 201);

// PHP 8
response()->download(
  file: 'item.jpg',
  code: 201
);
```

</div>

## `noContent`

The HTTP 204 No Content success status response code indicates that a request has succeeded, but that the client doesn't need to navigate away from its current page. This method allows you to quickly create a 204 response.

<div class="class-mode">

```php
$app->response()->noContent();
```

</div>
<div class="functional-mode">

```php
response()->noContent();
```

</div>

## `redirect`

This feature just simply allows you to send a redirect response which redirects to a different route.

<div class="class-mode">

```php
$userHasAuth = true;

if ($userHasAuth) {
  return $app->response()->redirect('/home');
}
```

</div>
<div class="functional-mode">

```php
$userHasAuth = true;

if ($userHasAuth) {
  return response()->redirect('/home');
}
```

</div>

You can also specify a status code:

<div class="class-mode">

```php
$app->response()->redirect('/home', 307);
```

</div>
<div class="functional-mode">

```php
response()->redirect('/home', 307);
```

</div>

## `exit`

This is a new method which allows you to output some data and close your app right after. This means that it acts as a sort of early-return for your app, so right after outputting some data, it quits and makes sure that no other code is executed from your app until the next request comes through.

It takes in 2 parameters: the data to output and the http status code (default: 500).

<div class="class-mode">

```php
$app->response()->exit('This will be output as markup');

// code below won't run
```

</div>
<div class="functional-mode">

```php
response()->exit('This will be output as markup');

// code below won't run
```

</div>

You can also output JSON.

<div class="class-mode">

```php
$app->response()->exit(['data' => 'This will be output as JSON'], 500);
```

</div>
<div class="functional-mode">

```php
response()->exit(['data' => 'This will be output as JSON'], 500);
```

</div>

## Headers

::: danger Watch Out
Version 1 of Leaf Http came with an attached instance of the header object. This has been removed in version 2 and replaced with the `withHeader` method.
:::

This method gives you a quick and simple way to set headers for your response. It takes in 4 parameters:

- The header name or an array of headers (key-value pairs)
- The header value if header key is a string
- A boolean on whether to replace the header if it's already set
- An Http status code to associate to header.

<div class="class-mode">

```php
$app
  ->response()
  ->withHeader('something', 'something')
  ->withHeader('somethingAgain', 'something', true, 200)
  ->withHeader(['somethingElse' => 'another']);
```

</div>
<div class="functional-mode">

```php
response()
  ->withHeader('something', 'something')
  ->withHeader('somethingAgain', 'something', true, 200)
  ->withHeader(['somethingElse' => 'another']);
```

</div>

## Cookies

::: danger Watch Out
Version 1 of Leaf Http came with an attached instance of the cookie object. This has been removed in version 2 and replaced with the `withCookie` method.
:::

This method gives you a quick and simple way to set cookies for your response. It takes in 3 parameters:

- The name of the cookie
- The value of cookie
- When the cookie expires. Default: 7 days

<div class="class-mode">

```php
$app->response()->withCookie("name", "Michael", "1 day")->json('...');
```

</div>
<div class="functional-mode">

```php
response()->withCookie("name", "Michael", "1 day")->json('...');
```

</div>

### withoutCookie

This method allows you to remove existing cookies from your response. So you're basically returning a response without selected cookies.

<div class="class-mode">

```php
$app->response()->withoutCookie("name")->json('...');

// cookie array
$app->response()->withoutCookie(["name", "something"])->json('...');
```

</div>
<div class="functional-mode">

```php
response()->withoutCookie("name")->json('...');

// cookie array
response()->withoutCookie(["name", "something"])->json('...');
```

</div>

### withFlash Method

This is a new method which allows you add some flash messages to a response. It is usually used with redirects like this:

<div class="class-mode">

```php
$app->response()->withFlash('message', 'something')->redirect('/somewhere');
```

</div>
<div class="functional-mode">

```php
response()->withFlash('message', 'something')->redirect('/somewhere');
```

</div>

## Status

::: tip Info
You can directly set status codes on responses, there's no need to use this method unless you want to use PHP's output methods like <b>echo</b>
:::

The HTTP response returned to the client will have a status code indicating the response’s type (e.g. 200 OK, 400 Bad Request, or 500 Server Error). You can use the Leaf application’s response object to set the HTTP response’s status like this:

<div class="class-mode">

```php
$app->response()->status(400);
```

</div>
<div class="functional-mode">

```php
response()->status(400);
```

</div>

You only need to set the response object’s status if you intend to return an HTTP response that does not have a 200 OK status. You can just as easily fetch the response object’s current HTTP status by invoking the same method without an argument, like this:

<div class="class-mode">

```php
$status = $app->response()->status();
```

</div>
<div class="functional-mode">

```php
$status = response()->status();
```

</div>
