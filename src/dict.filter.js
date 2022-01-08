import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from "./throwHelper";
import Dict from "./dict.core";

/** @module */

/**
 * <h3> filter(predicate) ⇒ Dict </h3>
 * Builds a new dict containing only the bindings for which the given predicate returns 'true'.
 * @param {function} predicate The function to test the key/value pairs.
 * @return {Dict} The filtered dict.
 * @exception {TypeError} when predicate is not a function or a generator function.
 * @example
 * const dict_4 = new Dict(
 *    [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
 * );
 * const filtered = dict_4.filter((k, v) => k > 1 && v.length > 3);
 * console.log(filtered);
 * // => [Dict] { 3 => 'three', 4 => 'four' }
 */
function filter(predicate) {
  throwIfNullOrUndefined(this, "this");
  throwIfNotFunction(predicate, "predicate");
  throwIfGeneratorFunction(predicate, "predicate");

  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const dict = new Dict();

  for (const [k, v] of this) {
    if (predicate.call(thisArg, k, v)) {
      dict.set(k, v);
    }
  }

  return dict;
}

export default filter;
