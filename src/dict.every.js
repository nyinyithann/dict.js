import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from "./throwHelper";

/** @module */

/**
 * <h3> every(predicate) ⇒ Dict </h3>
 * Returns true if the given predicate returns true for all of the bindings in the dict.
 * @param {function} predicate The function to test the input elements.
 * @return {boolean} True if the predicate evaluates to true for all of the key/value pairs in the Dict.
 * @exception {TypeError} when predicate is not a function or a generator function.
 * @example
 * const dict_2 = new Dict(
 *    [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
 * );
 * const allValueHasLengthOf2 = dict_2.every((k, v) => v.length > 2);
 * console.log(allValueHasLengthOf2);
 * // => true
 */
function every(predicate) {
  throwIfNullOrUndefined(this, "this");
  throwIfNotFunction(predicate, "predicate");
  throwIfGeneratorFunction(predicate, "predicate");

  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  for (const [k, v] of this) {
    if (!predicate.call(thisArg, k, v)) {
      return false;
    }
  }

  return true;
}

export default every;
