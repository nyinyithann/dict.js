import { Dict } from "../src/index";

/* eslint-disable */
describe("every()", () => {
  test("should throw TypeError for invalid arguments", () => {
    const every = Dict.prototype.every;
    expect(() => every.call(null)).toThrow(TypeError);
    expect(() => new Dict().every(null)).toThrow(TypeError);
    expect(() => new Dict().every(function* () {})).toThrow(TypeError);
  });

  test("should return correct result", () => {
    const dict = new Dict([
      [1, "one"],
      [2, "other"],
      [3, "three"],
      [4, "other"],
      [5, "other"],
    ]);

    expect(dict.every((k, v) => k > 0)).toBe(true);
    expect(dict.every((k, v) => k > 0 && v.length > 2)).toBe(true);
    expect(dict.every((k, v) => k > 1)).toBe(false);

    const every = Dict.prototype.every;
    expect(every.call(dict, (k, v) => k > 0)).toBe(true);
    expect(every.apply(dict, [(k, v) => k > 0 && v.length > 2])).toBe(true);
    expect(every.bind(dict)((k, v) => k > 1)).toBe(false);

    const context = {
      key: 0,
      predicate(k, v) {
        return k > this.key;
      },
    };
    expect(dict.every(context.predicate, context)).toBe(true);
  });
});
