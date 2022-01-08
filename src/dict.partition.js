import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from "./throwHelper";
import Dict from "./dict.core";

/** @module */

/**
 * <h3> partition(predicate) ⇒ Array </h3>
 * Builds two new dicts, one containing the bindings for which the given predicate returns 'true',
 * and the other the remaining bindings.
 * @param {function} predicate The function to test the input elements.
 * @return {Array} An array containing two dicts.
 * @exception {TypeError} when predicate is not a function or a generator function.
 * @example
 * const dict_9 = new Dict(
 *    [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
 * );
 * const partitioned = dict_9.partition((k, v) => k < 3);
 * console.log(partitioned);
 * // =>
 * //   [
 * //     [Dict] { 1 => 'one', 2 => 'two' },
 * //     [Dict] { 3 => 'three', 4 => 'four' }
 * //   ]
 */
function partition(predicate) {
  throwIfNullOrUndefined(this, "this");
  throwIfNotFunction(predicate, "predicate");
  throwIfGeneratorFunction(predicate, "predicate");

  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const left = new Dict();
  const right = new Dict();

  for (const [k, v] of this) {
    if (predicate.call(thisArg, k, v)) {
      left.set(k, v);
    } else {
      right.set(k, v);
    }
  }

  return [left, right];
}

export default partition;
