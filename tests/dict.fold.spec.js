/* eslint-disable */

import { Dict } from "../src/index";
describe("fold()", () => {
  test("should throw TypeError for invalid arguments", () => {
    const fold = Dict.prototype.fold;
    expect(() => fold.call(null)).toThrow(TypeError);
    expect(() => new Dict().fold(null)).toThrow(TypeError);
    expect(() => new Dict().fold(function* () {})).toThrow(TypeError);
    expect(() => new Dict().fold((acc, k, v) => acc + k, null)).toThrow(
      TypeError
    );
  });

  test("should return correct state", () => {
    const dict = new Dict([
      [1, "one"],
      [2, "other"],
      [3, "three"],
      [4, "other"],
      [5, "other"],
    ]);

    expect(dict.fold((acc, k, v) => acc + k, 0)).toBe(15);
    expect(dict.fold((acc, k, v) => `${acc}${v},`, "")).toBe(
      "one,other,three,other,other,"
    );

    const context = {
      other: "other",
      folder(acc, k, v) {
        const kk = dict.findKey((_, vv) => vv === this.other) || 0;
        return acc + kk;
      },
    };

    expect(dict.fold(context.folder, 0, context)).toBe(10);
    expect(new Dict().fold((acc, k, v) => {}, 100)).toBe(100);
  });
});
