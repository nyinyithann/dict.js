import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from './throwHelper';

/** @module */

/**
 * <h3> exists(predicate) ⇒ Dict </h3>
 * Returns true if the given predicate returns true for one of the bindings in the Dict.
 * @param {function} predicate The function to test the input elements.
 * @return {boolean} True if the predicate returns true for one of the key/value paris.
 * @exception {TypeError} when predicate is not a function or a generator function.
 * @example
 * const dict_3 = new Dict(
 *    [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
 * );
 * const hasValueWithLengthOf5 = dict_3.exists((k, v) => v.length === 5);
 * console.log(hasValueWithLengthOf5);
 * // => true
 */
function exists(predicate) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNotFunction(predicate, 'predicate');
  throwIfGeneratorFunction(predicate, 'predicate');

  if (this.size === 0) {
    return false;
  }

  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  for (const [k, v] of this) {
    if (predicate.call(thisArg, k, v)) {
      return true;
    }
  }

  return false;
}

export default exists;
