import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from './throwHelper';

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

export default foldRight;
