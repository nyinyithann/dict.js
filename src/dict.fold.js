import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from './throwHelper';

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

export default fold;
