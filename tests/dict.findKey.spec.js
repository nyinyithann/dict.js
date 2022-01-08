import { Dict } from "../src/index";

describe("findKey()", () => {
  test("should throw error for invalid arguments", () => {
    const filter = Dict.prototype.findKey;
    expect(() => filter.call(null)).toThrow(TypeError);
    expect(() => new Dict().findKey(null)).toThrow(TypeError);
    expect(() => new Dict().findKey(function* () {})).toThrow(TypeError);
  });

  test("should return key", () => {
    const dict = new Dict([
      [1, "one"],
      [2, "other"],
      [3, "three"],
      [4, "other"],
      [5, "other"],
    ]);
    const findKey = Dict.prototype.findKey;
    const predicate = (_, v) => v === "three";
    expect(findKey.call(dict, predicate)).toStrictEqual(3);
    expect(findKey.apply(dict, [predicate])).toStrictEqual(3);
    expect(findKey.bind(dict)(predicate)).toStrictEqual(3);

    const context = {
      three: "three",
      predicate(k, v) {
        return v === this.three;
      },
    };
    expect(dict.findKey(context.predicate, context)).toStrictEqual(3);
    expect(dict.findKey((k, v) => v === "nothing")).toBe(undefined);
  });
});
