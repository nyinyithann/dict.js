import { Dict } from "../src/index";
/* eslint-disable */
describe("foldRight()", () => {
  test("should throw TypeError for invalid arguments", () => {
    const foldRight = Dict.prototype.foldRight;
    expect(() => foldRight.call(null)).toThrow(TypeError);
    expect(() => new Dict().foldRight(null)).toThrow(TypeError);
    expect(() => new Dict().foldRight(function* () {})).toThrow(TypeError);
    expect(() => new Dict().foldRight((acc, k, v) => acc + k, null)).toThrow(
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

    expect(dict.foldRight((k, v, acc) => acc + k, 0)).toBe(15);
    expect(dict.foldRight((k, v, acc) => `${acc}${v},`, "")).toBe(
      "other,other,three,other,one,"
    );

    const foldRight = Dict.prototype.foldRight;
    expect(foldRight.call(dict, (k, v, acc) => acc + k, 0)).toBe(15);
    expect(foldRight.apply(dict, [(k, v, acc) => acc + k, 0])).toBe(15);
    expect(foldRight.bind(dict)((k, v, acc) => acc + k, 0)).toBe(15);

    const context = {
      other: "other",
      folder(k, v, acc) {
        return acc + (v === this.other && k > 2 ? k : 0);
      },
    };

    expect(dict.foldRight(context.folder, 0, context)).toBe(9);
    expect(new Dict().foldRight((k, v, acc) => {}, 100)).toBe(100);
  });
});
