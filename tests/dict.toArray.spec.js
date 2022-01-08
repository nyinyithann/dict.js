import { Dict } from "../src/index";
describe("toArray()", () => {
  test("should throw TypeError if existing dict is null or undefined", () => {
    const toArray = Dict.prototype.toArray;
    expect(() => toArray.call(null)).toThrow(TypeError);
  });

  test("should return an array", () => {
    const dict = new Dict([
      ["one", 1],
      ["two", 2],
      ["three", 3],
      ["four", 4],
      ["five", 5],
    ]);

    const toArray = Dict.prototype.toArray;
    const expected = [
      ["one", 1],
      ["two", 2],
      ["three", 3],
      ["four", 4],
      ["five", 5],
    ];
    expect(dict.toArray()).toStrictEqual(expected);
    expect(toArray.call(dict)).toStrictEqual(expected);
    expect(toArray.apply(dict)).toStrictEqual(expected);
    expect(toArray.bind(dict)()).toStrictEqual(expected);
  });
});
