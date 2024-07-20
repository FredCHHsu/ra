import findMinP from "./findMinP";

const A = {
  // room 1
  c: 1000,
  a: 200,
  b: 100,
  d: 4,
};
const B = { c: 0, a: 500, b: 500, d: 4 }; // room2
const C = { c: 500, a: 300, b: 200, d: 4 }; // room3
const Cp = { c: 500, a: 300, b: 200, d: 3 }; // room3b

function getCoefficients(
  arr: { a: number; b: number; c: number; d: number }[]
) {
  const coeffientNames: (keyof (typeof arr)[number])[] = ["a", "b", "c", "d"];
  return coeffientNames.map((key) => arr.map((el) => el[key]));
}

describe("mapping to get lowest price from room allocation", () => {
  test("example 1 - a", () => {
    const group = [A, B, C];
    const [a, b, c, d] = getCoefficients(group);
    expect(findMinP(a, b, c, d, 4, 2).minP).toBe(2500);
  });

  test("example 1 - b", () => {
    const group = [A, B, C];
    const [a, b, c, d] = getCoefficients(group);
    expect(findMinP(a, b, c, d, 4, 0).minP).toBe(1700);
  });

  test("example 1 - c", () => {
    const group = [A, B, Cp];
    const [a, b, c, d] = getCoefficients(group);
    expect(findMinP(a, b, c, d, 4, 0).minP).toBe(1800);
  });

  test("performance issue case", () => {
    const group = [
      { c: 500, a: 500, b: 300, d: 4 },
      { c: 500, a: 500, b: 300, d: 8 },
      { c: 0, a: 500, b: 300, d: 8 },
      { c: 500, a: 1000, b: 600, d: 2 },
    ];
    const [a, b, c, d] = getCoefficients(group);
    expect(findMinP(a, b, c, d, 16, 0).minP).toBe(8500);
  });
});
