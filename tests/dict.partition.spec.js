import { Dict } from "../src/index";

describe("partition()", () => {
  test("should throw TypeError for invalid arguments", () => {
    const partition = Dict.prototype.partition;
    expect(() => partition.call(null)).toThrow(TypeError);
    expect(() => new Dict().partition(null)).toThrow(TypeError);
    expect(() => new Dict().partition(function* () {})).toThrow(TypeError);
  });

  test("should return correct result", () => {
    const dict = new Dict([
      ["one", 1],
      ["two", 2],
      ["three", 3],
      ["four", 4],
      ["five", 5],
    ]);

    const partition = Dict.prototype.partition;
    const predicate = (k, v) => v > 2;
    const actual = dict.partition(predicate);
    const expected = [
      new Dict([
        ["three", 3],
        ["four", 4],
        ["five", 5],
      ]),
      new Dict([
        ["one", 1],
        ["two", 2],
      ]),
    ];
    expect(actual).toStrictEqual(expected);

    expect(partition.call(dict, predicate)).toStrictEqual(expected);
    expect(partition.apply(dict, [predicate])).toStrictEqual(expected);
    expect(partition.bind(dict)(predicate)).toStrictEqual(expected);
  });
});
