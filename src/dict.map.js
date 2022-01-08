import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from "./throwHelper";
import Dict from "./dict.core";

/** @module */

/**
 * <h3> map(mapping) ⇒ Dict </h3>
 * Builds a new dict whose elements are the results of applying the given function to each of the elements of the dict.
 * The key passed to the function indicates the key of element being transformed.
 * @param {function} mapping The function to transform the key/value pairs.
 * @return {Dict} The resulting dict of keys and transformed values.
 * @exception {TypeError} When mapping is not a function or a generator function.
 * @example
 * const dict_8 = new Dict(
 *      [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
 * );
 * const mappedResult = dict_8.map((k, v) => k % 2 === 0 ? "even" : "odd");
 * console.log(mappedResult);
 * // => [Dict] { 1 => 'odd', 2 => 'even', 3 => 'odd', 4 => 'even' }
 */
function map(mapping) {
  throwIfNullOrUndefined(this, "this");
  throwIfNotFunction(mapping, "mapping");
  throwIfGeneratorFunction(mapping, "mapping");

  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const dict = new Dict();

  for (const [k, v] of this) {
    dict.set(k, mapping.call(thisArg, k, v));
  }

  return dict;
}

export default map;
