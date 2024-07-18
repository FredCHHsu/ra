const getCombinations = (range: number, groups: number[]) => {
  const stringResults = new Set();

  const combine = (start: number, combs: number[]) => {
    if (combs.reduce((prev, curr) => prev + curr, 0) === range) {
      stringResults.add([...combs].toString());
      return;
    }
    for (let i = start; i < range; i++) {
      for (let j = 0; j < groups.length; j++) {
        if (combs[j] + 1 > groups[j]) {
          continue;
        }
        combs[j] += 1;
        combine(i + 1, combs);
        combs[j] -= 1;
      }
    }
  };

  combine(
    0,
    Array.from({ length: groups.length }, () => 0)
  );

  const results = Array.from(stringResults, (v) =>
    typeof v === "string" ? v.split(",").map(Number) : v
  );
  return results;
};

export default getCombinations;
