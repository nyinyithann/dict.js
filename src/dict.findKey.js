import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from "./throwHelper";

/** @module */

/**
 * <h3> findKey(predicate) ⇒ key|undefined </h3>
 * Evaluates the function on each mapping in the collection.
 * Returns the key for the first mapping where the function returns 'true'.
 * @param {function} predicate The function to test the input elements.
 * @return {key|undefined} The first key for which the predicate evaluates true or undefined if key is not found.
 * @example
 * const dict_5 = new Dict(
 *    [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
 * );
 * const keyFound = dict_5.findKey((k, v) => v === "four");
 * console.log(keyFound);
 * // => 4
 */
function findKey(predicate) {
  throwIfNullOrUndefined(this, "this");
  throwIfNotFunction(predicate, "predicate");
  throwIfGeneratorFunction(predicate, "predicate");

  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  for (const [k, v] of this) {
    if (predicate.call(thisArg, k, v)) {
      return k;
    }
  }

  return undefined;
}

export default findKey;
