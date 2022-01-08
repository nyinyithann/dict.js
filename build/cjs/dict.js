'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

/** @module */

/**
 * <h3> Dict.empty() ⇒ Dict </h3>
 * Create an empty Dict.
 * @return {Dict} The empty Dict.
 * @example
 * const dict = Dict.empty();
 */

function empty() {
  return new Dict();
}

/* eslint-disable */
function isNull(value) {
  return value == null;
}
function isUndefined(value) {
  return typeof value === 'undefined';
}
function isNotNull(value) {
  return !isNull(value);
}
function isNotUndefined(value) {
  return !isUndefined(value);
}
function isFunction(value) {
  return typeof value === 'function';
}
function isGeneratorFunction(value) {
  return isNotNull(value) && value[Symbol.toStringTag] === 'GeneratorFunction';
}

/* eslint-disable */
function throwIfNullOrUndefined(value, name = "value") {
  if (value == null || typeof value === "undefined") {
    throw new TypeError(`${name} is null or not defined.`);
  }
}
function throwIfNotFunction(value, name = "value") {
  if (!isFunction(value)) {
    throw new TypeError(`${name} is not a function.`);
  }
}
function throwIfGeneratorFunction(value, name = "value") {
  if (isGeneratorFunction(value)) {
    throw new TypeError(`${name} is a generator function. It should be a normal function.`);
  }
}

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

/** @module */

/**
 * <h3> filter(predicate) ⇒ Dict </h3>
 * Builds a new dict containing only the bindings for which the given predicate returns 'true'.
 * @param {function} predicate The function to test the key/value pairs.
 * @return {Dict} The filtered dict.
 * @exception {TypeError} when predicate is not a function or a generator function.
 * @example
 * const dict_4 = new Dict(
 *    [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
 * );
 * const filtered = dict_4.filter((k, v) => k > 1 && v.length > 3);
 * console.log(filtered);
 * // => [Dict] { 3 => 'three', 4 => 'four' }
 */

function filter(predicate) {
  throwIfNullOrUndefined(this, "this");
  throwIfNotFunction(predicate, "predicate");
  throwIfGeneratorFunction(predicate, "predicate");
  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const dict = new Dict();

  for (const [k, v] of this) {
    if (predicate.call(thisArg, k, v)) {
      dict.set(k, v);
    }
  }

  return dict;
}

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

/** @module */

/**
 * <h3> fold(folder, state) ⇒ value </h3>
 * Folds over the bindings in the dict.
 * @param {function} folder The function to update the state given the input key/value pairs.
 * @param {*} state The initial state.
 * @return {*} The final state value.
 * @exception {TypeError} when state is null or undefined. Or folder is not a function. Or folder is a generator function.
 * @example
 * const dict_6 = new Dict(
 *    [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
 * );
 * const state = dict_6.fold((s, k, v) => `${s}{${k} -> ${v}}\n`, '');
 * console.log(state);
 * // =>
 * // {1 -> one}
 * // {2 -> two}
 * // {3 -> three}
 * // {4 -> four}
 */

function fold(folder, state) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNullOrUndefined(state, 'state');
  throwIfNotFunction(folder, 'folder');
  throwIfGeneratorFunction(folder, 'folder');
  let thisArg;

  if (arguments.length > 2) {
    thisArg = arguments[2];
  }

  let s = state;

  for (const [k, v] of this) {
    s = folder.call(thisArg, s, k, v);
  }

  return s;
}

/** @module */

/**
 * <h3> foldRight(folder, state) ⇒ value </h3>
 * Folds over the bindings in the map.
 * @param {function} folder The function to update the state given the input key/value pairs.
 * @param {*} state The initial state
 * @return {*} The final state value.
 * @exception {TypeError} when state is null or undefined. Or folder is not a function. Or folder is a generator function.
 * @example
 * const dict_7 = new Dict(
 *    [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
 * );
 * const finalState = dict_7.foldRight((k, v, s) => `${s}{${k} -> ${v}}\n`, '');
 * console.log(finalState);
 * // =>
 * // {4 -> four}
 * // {3 -> three}
 * // {2 -> two}
 * // {1 -> one}
 */

function foldRight(folder, state) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNullOrUndefined(state, 'state');
  throwIfNotFunction(folder, 'folder');
  throwIfGeneratorFunction(folder, 'folder');
  let thisArg;

  if (arguments.length > 2) {
    thisArg = arguments[2];
  }

  let s = state;
  const entries = [...this.entries()];

  for (let i = entries.length - 1; i >= 0; i -= 1) {
    s = folder.call(thisArg, entries[i][0], entries[i][1], s);
  }

  return s;
}

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

/** @module */

/**
 * <h3> toArray() ⇒ Array </h3>
 * Returns an array of all key-value pairs in the mapping. The array will be ordered by the keys of the dict.
 * @return {Array} The result array.
 * @example
 * const dict_10 = new Dict(
 *    [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
 * );
 * const array = dict_10.toArray();
 * console.log(array);
 * // => [ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ], [ 4, 'four' ] ]
 */

function toArray() {
  throwIfNullOrUndefined(this, "this");
  return [...this];
}

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

    if (isNotNull(k) && isNotUndefined(k) && isNotNull(v) && isNotUndefined(v)) {
      dict.set(k, v);
    }
  }

  return dict;
}

Dict.of = of;
Dict.empty = empty;
Dict.prototype.change = change;
Dict.prototype.exists = exists;
Dict.prototype.filter = filter;
Dict.prototype.findKey = findKey;
Dict.prototype.fold = fold;
Dict.prototype.foldRight = foldRight;
Dict.prototype.every = every;
Dict.prototype.map = map;
Dict.prototype.partition = partition;
Dict.prototype.isEmpty = isEmpty;
Dict.prototype.toArray = toArray;
Dict.prototype.toSet = toSet;

exports.Dict = Dict;
