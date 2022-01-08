import { Dict } from "../src/index";
describe("dict.core", () => {
  test("Dict extends Map, and should work like one", () => {
    const dict = new Dict([
      [1, "one"],
      [2, "two"],
      [3, "three"],
    ]);
    expect(dict.size).toBe(3);
    expect([...dict.entries()]).toStrictEqual([
      [1, "one"],
      [2, "two"],
      [3, "three"],
    ]);
    expect(dict.get(1)).toBe("one");
    expect(dict.has(1)).toBe(true);
    expect([...dict.keys()]).toStrictEqual([1, 2, 3]);
    dict.set(4, "four");
    expect(dict.get(4)).toBe("four");

    expect(dict.toString()).toStrictEqual("[object Map]");
  });

  test("toString tag should be [object Map]", () => {
    expect(Object.prototype.toString.call(new Dict())).toStrictEqual(
      "[object Map]"
    );
  });

  test("instanceof Dict is Map or Dict", () => {
    expect(new Dict() instanceof Map).toBe(true);
    expect(new Dict() instanceof Dict).toBe(true);
  });
});
