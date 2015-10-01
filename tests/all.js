// Get tape.
const tape = require("tape")

// Get Talkie.
const Talkie = require("../index")

tape("Talkie doesn't modify the original object.", test => {
  // Expect this many assertions.
  test.plan(2)

  // Create a test object.
  const test_obj = { fizz: "buzz" }
  const test_func = () => "buzz"

  Talkie()
    .extend(test_obj)
    .extend(test_func)

  test.equals(test_func(), "buzz", "Original function not modified by Talkie.")
  test.equals(test_obj.fizz, "buzz", "Original object not modified by Talkie.")
})

tape("Talkie extends an object with 'on, off, request, reply'.", test => {
  // Expect this many assertions.
  test.plan(4)

  // Create a test object.
  const test_obj = { fizz: () => "buzz" }

  // Extend the test object.
  Talkie().extend(test_obj)

  // Test we have the appropriate member functions.
  test.equal(!!test_obj.on, true, "Object has `on` method.")
  test.equal(!!test_obj.off, true, "Object has `off` method.")
  test.equal(!!test_obj.request, true, "Object has `request` method.")
  test.equal(!!test_obj.reply, true, "Object has `reply` method.")
})

tape("Talkie extends a function with 'on, off, request, reply'.", test => {
  // Expect this many assertions.
  test.plan(4)

  // Create a test object.
  const test_obj = () => "buzz"

  // Extend the test object.
  Talkie().extend(test_obj)

  // Test we have the appropriate member functions.
  test.equal(!!test_obj.on, true, "Object has `on` method.")
  test.equal(!!test_obj.off, true, "Object has `off` method.")
  test.equal(!!test_obj.request, true, "Object has `request` method.")
  test.equal(!!test_obj.reply, true, "Object has `reply` method.")
})

tape("Talkie `reply` stores the expected object.", test => {
  // Expect this many assertions.
  test.plan(1)

  // Create a test object.
  const test_obj = {}

  // Extend the test object.
  Talkie().extend(test_obj)

  // When we request "fizz", reply with "buzz"
  test_obj.reply("fizz", "buzz")

  // Test we have the appropriate member functions.
  test.equal(test_obj.__requests.get("fizz"), "buzz", "Reply stores 'buzz'.")
})


tape("Talkie `request` replies with expected object.", test => {
  // Expect this many assertions.
  test.plan(1)

  // Create a test object.
  const test_obj = {}

  // Extend the test object.
  Talkie().extend(test_obj)

  // When we request "fizz", reply with "buzz"
  test_obj.reply("fizz", "buzz")

  // Test we have the appropriate member functions.
  test.equal(test_obj.request("fizz"), "buzz", "Request replies with 'buzz'.")
})
