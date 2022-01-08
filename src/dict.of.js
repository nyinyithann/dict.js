import Dict from "./dict.core";
import { isNotNull, isNotUndefined } from "./util";

/** @module */

/**
 * <h3> Dict.of() ⇒ Dict </h3>
 * Creates a new dict from a variable number of key/value pair arguments.
 * @return {Dict} A newly created dict.
 * @example
 * const newDict = Dict.of(
 *    ['Key1', 100], ['key2', 200], ['key3', 300]
 * );
 * console.log(newDict);
 * // => [Dict] { 'Key1' => 100, 'key2' => 200, 'key3' => 300 }
 */
function of() {
  const dict = new Dict();

  for (let i = 0; i < arguments.length; i += 1) {
    const [k, v] = arguments[i];
    if (
      isNotNull(k) &&
      isNotUndefined(k) &&
      isNotNull(v) &&
      isNotUndefined(v)
    ) {
      dict.set(k, v);
    }
  }

  return dict;
}

export default of;
