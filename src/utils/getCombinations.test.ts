import getCombinations from "./getCombinations";

describe("get combinations", () => {
  test("1 on 2,2,2", () => {
    expect(getCombinations(1, [2, 2, 2])).toEqual(
      expect.arrayContaining([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ])
    );
  });
  test("2 on 2,2", () => {
    expect(getCombinations(2, [2, 2])).toEqual(
      expect.arrayContaining([
        [2, 0],
        [1, 1],
        [0, 2],
      ])
    );
  });
  test("3 on 2,2", () => {
    expect(getCombinations(3, [2, 2])).toEqual(
      expect.arrayContaining([
        [2, 1],
        [1, 2],
      ])
    );
  });
  test("5 on 2,2", () => {
    expect(getCombinations(5, [2, 2])).toEqual([]);
  });

  // performance issue
  // test("big value", () => {
  //   expect(getCombinations(20, [10, 10, 10, 10])).toEqual([]);
  // });
});
