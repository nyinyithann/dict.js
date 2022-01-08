import Dict from './dict.core';

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

export default empty;
