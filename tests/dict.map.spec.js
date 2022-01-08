import { Dict } from "../src/index";
/* eslint-disable */
describe("map()", () => {
  test("should throw TypeError for invalid arguments", () => {
    const map = Dict.prototype.map;
    expect(() => map.call(null)).toThrow(TypeError);
    expect(() => new Dict().map(null)).toThrow(TypeError);
    expect(() => new Dict().map(function* () {})).toThrow(TypeError);
  });

  test("should return correct result", () => {
    const dict = new Dict([
      ["one", 1],
      ["two", 2],
      ["three", 3],
      ["four", 4],
      ["five", 5],
    ]);

    const map = Dict.prototype.map;
    const mapping = (k, v) => v + v;
    const actual = dict.map(mapping);
    const expected = new Dict([
      ["one", 2],
      ["two", 4],
      ["three", 6],
      ["four", 8],
      ["five", 10],
    ]);

    expect(actual).toStrictEqual(expected);
    expect(map.call(dict, mapping)).toStrictEqual(expected);
    expect(map.apply(dict, [mapping])).toStrictEqual(expected);
    expect(map.bind(dict)(mapping)).toStrictEqual(expected);

    const context = {
      key: 1,
      mapping(k, v) {
        return v + this.key;
      },
    };
    expect(dict.map(context.mapping, context)).toStrictEqual(
      new Dict([
        ["one", 2],
        ["two", 3],
        ["three", 4],
        ["four", 5],
        ["five", 6],
      ])
    );
  });
});
