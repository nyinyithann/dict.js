import { Dict } from "../src/index";

describe("exists()", () => {
  test("throw exceptions for invalid args", () => {
    expect(() => Dict.prototype.exists.call(null)).toThrow(TypeError);
    expect(() => Dict.prototype.exists.call(new Dict(), {})).toThrow(TypeError);
    expect(() =>
      Dict.prototype.exists.call(new Dict(), function* () {})
    ).toThrow(TypeError);
  });

  /* eslint-disable */
  test("should check if a key or value exists in the Dict", () => {
    const dict = new Dict([
      [1, "one"],
      [2, "other"],
      [3, "three"],
      [4, "other"],
      [5, "other"],
    ]);

    expect(dict.exists((k, _) => k === 1)).toBe(true);
    expect(dict.exists((_, v) => v === "one")).toBe(true);
    expect(dict.exists((k, v) => k > 3 && v === "other")).toBe(true);

    expect(new Dict().exists((k, v) => k === v)).toBe(false);

    const context = {
      n: 1,
      predicate(k, _) {
        return k > this.n;
      },
    };
    expect(dict.exists(context.predicate, context)).toBe(true);
  });
});
