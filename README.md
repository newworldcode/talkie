# Talkie

![Build status on Travis CI](https://travis-ci.org/newworldcode/talkie.svg)
[![npm version](https://badge.fury.io/js/%40newworldcode%2Ftalkie.svg)](http://badge.fury.io/js/%40newworldcode%2Ftalkie)
[![Coverage Status](https://coveralls.io/repos/newworldcode/talkie/badge.svg?branch=master&service=github)](https://coveralls.io/github/newworldcode/talkie?branch=master)

EventEmitter, Request/Reply messaging bus for Node. Allows you to extend any object, function or class with Talkie and expose a messaging bus and request/reply interface.

Talkie does not modify your original object or function, it extends it's prototype with helpful functions to make your things
become tasty messaging busses.

## Examples

Below are some common use-case examples.

#### `.request()`/`.reply()`
Create a sort-of listener that replies to requests with some data.

```js
const Talkie = require("talkie")
const test_obj = () => "buzz"

// Extend the test object.
Talkie().extend(test_obj)

// Set up `test_obj` to reply with a string.
test_obj.reply("Fizz", "Buzz")

console.log(test_obj()) // => "buzz"
console.log(test_obj.request("Fizz")) // => "Buzz"
```

#### `.new()`
Create an instance of a stored object to `.reply()` with.

```js
const Talkie = require("talkie")
const test_obj = {}

// Extend the test object.
Talkie().extend(test_obj)

// Set up `test_obj` to reply with a string.
test_obj.reply("fizz", function Fizz(){})

console.log(test_obj.new("Fizz")) // => "Fizz"
```

#### `.on(event_name, callback)`/`.off(event_name, callback)`
`on` and `off` act in the same way as the respective functions do in other common libraries, they add and remove listeners respectively.

```js
const Talkie = require("talkie")
const test_obj = () => "buzz"

// Extend the test object.
Talkie().extend(test_obj)

// Set up `test_obj` to reply with a string.
test_obj
  .on("fizz", event => {
    // Do something here.
  })
  .off("fizz", event => {
    // Do something here with the last emission of the event name.
  })
```

#### `.trigger(event_name, ...event_data)`
Trigger an event on our object.

```js
const Talkie = require("talkie")
const test_obj = () => "buzz"

// Extend the test object.
Talkie().extend(test_obj)

// Set up `test_obj` to reply with a string.
test_obj.on("fizz", event => {
  // Do something here.
})

test_obj.trigger("fizz")
```
