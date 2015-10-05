// Get the EventEmitter library.
const EventEmitter = require("events")

function Talkie() {
  // Check we have an instance first.
  if (!(this instanceof Talkie)) {
    return new Talkie()
  }

  // Make this an EventEmitter under the hood.
  EventEmitter.call(this)
}

Talkie.prototype = {
  // Store the requests here.
  __requests: new Map(),

  /**
   * Extend an object with the Talkie prototype.
   * @param  {Object|Function} target to extend.
   * @return {Object|Function} extended object.
   */
  extend: target => Object.assign(target.prototype || target, Talkie.prototype),

  /**
   * Syntactic sugar for the EventEmitter's removeListener function.
   * @param  {String} event_name to remove listeners for.
   * @return {Object|Function} The original emitter.
   */
  off: function off(event_name, callback) {
    this.removeListener(event_name, callback)
    return this
  },

  /**
   * Trigger an event on this EventEmitter.
   * @param  {String} event_name to trigger.
   * @param  {Any} data to pass along with event.
   * @return {EventEmitter} Original object behind Talkie.
   */
  trigger: function trigger(event_name, data/* [, more_data] */) {
    this.emit.apply(this, arguments)
    return this
  },

  /**
   * Request a piece of data from this instance of Talkie.
   * @param  {Any} request_name to make against the __requests Map.
   * @return {Object|Function} The original object behind this Talkie instance.
   */
  request: function request(request_name) {
    const value = this.__requests.get(request_name)

    return value instanceof Function ? value() : value
  },

  /**
   * Reply to requests for the request_name.
   * @param  {String} request_name to resolve.
   * @param  {Any} reply_with this thing.
   * @return {EventEmitter} Reply with the original object behind Talkie.
   */
  reply: function reply(request_name, reply_with) {
    this.__requests.set(request_name, reply_with)

    return this
  },

  /**
   * Clear all `reply` stores and remove
   * all event listeners.
   * @return {EventEmitter} Reply with the original object behind Talkie.
   */
  reset: function reset() {
    this.__requests.clear()
    this.removeAllListeners()

    return this
  },

  /**
   * Instantiate a stored function, is really just
   * like the `.request()` function but instantiates
   * instead of executes.
   * @param  {Any} request_name to make against the __requests Map.
   * @return {Function} The instantiated function behind this Talkie instance.
   */
  new: function instantiate(request_name) {
    const Value = this.__requests.get(request_name)

    return new Value()
  }
}

// Extend Talkie with the EventEmitter prototype.
Object.assign(Talkie.prototype, EventEmitter.prototype)

// Export an extended object.
module.exports = Talkie
