import { Dict } from "../src/index";

/* eslint-disable */
describe("change()", () => {
  test("should throw TypeError for invalid arguments", () => {
    const change = Dict.prototype.change;
    expect(() => change.call(null)).toThrow(TypeError);
    expect(() => new Dict().change(null, (v) => {})).toThrow(TypeError);
    expect(() => new Dict().change(() => {}, null)).toThrow(TypeError);
  });

  test("should return a new Dict with correct entities", () => {
    const dict = new Dict([
      [1, "one"],
      [2, "two"],
      [3, "three"],
    ]);

    expect(
      dict.change(
        (k) => k === 1,
        (v) => "New Value"
      )
    ).toStrictEqual(
      new Dict([
        [1, "New Value"],
        [2, "two"],
        [3, "three"],
      ])
    );

    expect(
      dict.change(
        (k) => k,
        (v) => "New Value"
      )
    ).toStrictEqual(
      new Dict([
        [1, "New Value"],
        [2, "New Value"],
        [3, "New Value"],
      ])
    );

    expect(
      dict.change(
        (k) => k === 4,
        (v) => "New Value"
      )
    ).toStrictEqual(
      new Dict([
        [1, "one"],
        [2, "two"],
        [3, "three"],
      ])
    );
  });
});
