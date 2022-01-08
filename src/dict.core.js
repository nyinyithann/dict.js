/* eslint-disable require-jsdoc */
/** @module */

/**
 * <h3> Dict </h3>
 * Dict extends Map and has all the methods of Map.
 * @example
 * const dict = new Dict([[1, 'one'], [2, 'two'], [3, 'three']]);
 * console.log(dict);
 * // => {1 => 'one', 2 => 'two', 3 => 'three'}
 * console.log(Object.prototype.toString.call(dict));
 * // => [object Map]
 * console.log(dict instanceof Map)
 * // => true
 */
class Dict extends Map {
  // eslint-disable-next-line class-methods-use-this
  get [Symbol.toStringTag]() {
    return "Map";
  }

  static get [Symbol.species]() {
    return Dict;
  }
}

export default Dict;
