<!-- markdownlint-disable no-inline-html -->
# Leaf Flash

::: warning Watch out
Leaf flash is a class available on the leaf session module. Check out the [session module docs](/modules/session/) for installation instructions.
:::

This is a simple helper for creating and managing PHP flash messages. It is highly customizable just like the rest of Leaf and fits right into any project no matter it's size or scope.

To get started, simply call the method you want to use. Leaf Flash uses static methods, so there's no need for initializing.

**Flash uses session to temporarily save variables.**

## Config

As mentioned above, Leaf Flash is super customizable. All this customization is done through Leaf Flash config.

**You don't need to do any of this. Leaf Flash works perfectly out of the box.**

Using the config method, you can change where Leaf stores flash messages in session, the keys for messages and saved content. The available options are:

- key: The key to save flash array in session. Default: leaf.flash,
- default: The key for default flash messages. Default: message,
- saved: The key for saved flash messages. Default: leaf.flash.saved,

<div class="functional-mode">

```php
flash()->config([
  "key" => "my_flash_items"
]);

flash()->set("This is my message");

// logging $_SESSION
=> ["my_flash_items" => ["message" => "This is my message"]]
```

</div>
<div class="class-mode">

```php
use Leaf\Flash;

Flash::config([
  "key" => "my_flash_items"
]);

Flash::set("This is my message");

// logging $_SESSION
=> ["my_flash_items" => ["message" => "This is my message"]]
```

</div>

**Flash searches for an existing session and creates one if there's no active session.**

## set

Set as the name implies allows you to save a flash message.

<div class="functional-mode">

```php
flash()->set("This is my message");
```

</div>
<div class="class-mode">

```php
Leaf\Flash::set("This is my message");
```

</div>

This saves the message with the key `message`. If you want to use another key, you can pass it in as a second parameter.

<div class="functional-mode">

```php
flash()->set("This is my message", "info");
```

</div>
<div class="class-mode">

```php
Leaf\Flash::set("This is my message", "info");
```

</div>

Using this functionality you can have multiple flash messages at the same time. In that case, they won't be unset until they are viewed.

<div class="functional-mode">

```php
flash()->set("This is my message", "info");
flash()->set("This is my message", "error");
flash()->set("This is my message", "success");
```

</div>
<div class="class-mode">

```php
Leaf\Flash::set("This is my message", "info");
Leaf\Flash::set("This is my message", "error");
Leaf\Flash::set("This is my message", "success");
```

</div>

## unset

`unset` does the opposite: it removes a flash message. You won't be needing this method in most cases.

<div class="functional-mode">

```php
flash()->unset("This is my message");
flash()->unset("This is my message", "info");
```

</div>
<div class="class-mode">

```php
Leaf\Flash::unset("This is my message");
Leaf\Flash::unset("This is my message", "info");
```

</div>

## display

This method is used to get a flash message. As soon as the flash message is retrieved, it is removed from the session which means it won't show on the next load.

<div class="functional-mode">

```php
flash()->set("message 1");
flash()->set("message 2", "info");

echo flash()->display(); // message 1
echo flash()->display("info"); // message 2
```

</div>
<div class="class-mode">

```php
Leaf\Flash::set("message 1");
Leaf\Flash::set("message 2", "info");

echo Leaf\Flash::display(); // message 1
echo Leaf\Flash::display("info"); // message 2
```

</div>

## save

Flash also allows you to `save` a message in session. This message will stay in session till it is manually removed. Note that unlike regular flashes, there can be only one saved flash message.

<div class="functional-mode">

```php
flash()->save("This is my message");
```

</div>
<div class="class-mode">

```php
Leaf\Flash::save("This is my message");
```

</div>

## clearSaved

This is `unset` for saved messages.

<div class="functional-mode">

```php
flash()->clearSaved();
```

</div>
<div class="class-mode">

```php
Leaf\Flash::clearSaved();
```

</div>

## displaySaved

This is `display` for saved messages.

<div class="functional-mode">

```php
echo flash()->displaySaved();
```

</div>
<div class="class-mode">

```php
echo Leaf\Flash::displaySaved();
```

</div>
