import { throwIfNullOrUndefined } from "./throwHelper";

/** @module */

/**
 * <h3> toSet() ⇒ Set </h3>
 * Returns a set of all key-value pairs in the mapping. The set will be ordered by the keys of the map.
 * @return {Set} The result set.
 * @example
 * const dict_11 = new Dict(
 *    [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
 * );
 * const set = dict_11.toArray();
 * console.log(set);
 * // => [ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ], [ 4, 'four' ] ]
 */
function toSet() {
  throwIfNullOrUndefined(this, "this");
  return new Set(this.entries());
}

export default toSet;
