import { throwIfNullOrUndefined } from "./throwHelper";

/** @module */

/**
 * <h3> isEmpty() ⇒ boolean </h3>
 * Check if the map is empty.
 * @return {boolean} True if the map is empty.
 * @example
 * const dict = new Dict();
 * console.log(dict.isEmpty());
 * // => true
 */
function isEmpty() {
  throwIfNullOrUndefined(this, "this");

  return this.size === 0;
}

export default isEmpty;
