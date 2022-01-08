import { Dict } from "../src/index";
describe("toSet()", () => {
  test("should throw TypeError if existing dict is null or undefined", () => {
    const toSet = Dict.prototype.toSet;
    expect(() => toSet.call(null)).toThrow(TypeError);
  });

  test("should return a set", () => {
    const one = ["one", 1];
    const dict = new Dict([
      one,
      one,
      one,
      ["two", 2],
      ["three", 3],
      ["four", 4],
      ["five", 5],
    ]);

    const toSet = Dict.prototype.toSet;
    const expected = new Set([
      ["one", 1],
      ["two", 2],
      ["three", 3],
      ["four", 4],
      ["five", 5],
    ]);
    expect(dict.toSet()).toStrictEqual(expected);
    expect(toSet.call(dict)).toStrictEqual(expected);
    expect(toSet.apply(dict)).toStrictEqual(expected);
    expect(toSet.bind(dict)()).toStrictEqual(expected);
  });
});
