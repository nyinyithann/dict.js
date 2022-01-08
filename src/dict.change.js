import Dict from './dict.core';
import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from './throwHelper';

/** @module */

/**
 * <h1> Dict APIs </h1>
 * <hr/>
 * <h3> change(keyMapping, valueMpping) ⇒ Dict </h3>
 * Returns a new map with the value come out of valueMapping. The value is associated with the key come out of keyMapping.
 * @param {function} keyMapping The function to get key.
 * @param {function} valueMpping The function to get value.
 * @return {Dict} The result Dict.
 * @exception {TypeError} When keyMapping is not a function or a generator function. Or valueMapping is not a function or a generator function.
 * @example
 * const dict_1 = new Dict(
 *    [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
 * );
 * const resultDict_1 = dict_1.change(k => k === 3, v => "tría");
 * console.dir(resultDict_1);
 * // => [Dict] { 1 => 'one', 2 => 'two', 3 => 'tría', 4 => 'four' }
 */
function change(keyMapping, valueMpping) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNotFunction(keyMapping, 'keyMapping');
  throwIfNotFunction(keyMapping, 'keyMapping');
  throwIfNotFunction(valueMpping, 'valueMpping');
  throwIfGeneratorFunction(valueMpping, 'valueMpping');

  const dict = new Dict();

  for (const [k, v] of this) {
    if (keyMapping(k)) {
      dict.set(k, valueMpping(v));
    } else {
      dict.set(k, v);
    }
  }

  return dict;
}

export default change;
