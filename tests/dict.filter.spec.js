import { Dict } from "../src/index";
describe("filter()", () => {
  test("should throw error for invalid arguments", () => {
    const filter = Dict.prototype.filter;
    expect(() => filter.call(null)).toThrow(TypeError);
    expect(() => new Dict().filter(null)).toThrow(TypeError);
    expect(() => new Dict().filter(function* () {})).toThrow(TypeError);
  });

  test("should filter existing dict", () => {
    const dict = new Dict([
      [1, "one"],
      [2, "other"],
      [3, "three"],
      [4, "other"],
      [5, "other"],
    ]);
    const filter = Dict.prototype.filter;
    const predicate = (k, v) => k === 3 && v === "three";
    expect(filter.call(dict, predicate)).toStrictEqual(
      new Dict([[3, "three"]])
    );
    expect(filter.apply(dict, [predicate])).toStrictEqual(
      new Dict([[3, "three"]])
    );
    expect(filter.bind(dict)(predicate)).toStrictEqual(
      new Dict([[3, "three"]])
    );

    const context = {
      three: "three",
      predicate(k, v) {
        return v === this.three;
      },
    };
    expect(dict.filter(context.predicate, context)).toStrictEqual(
      new Dict([[3, "three"]])
    );
  });
});
