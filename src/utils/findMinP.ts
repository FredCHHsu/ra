/**
  Given all x >=0 all y >=0, x, y are integers
  a, b, c, n,  represents a number;
  pn = an*(xn) + bn(yn) + cn(xn + yn >0 ? : 1 : 0) 
  xn + yn <= dn
  x0 + x1 +... xn = xMax
  y0 + y1 + ... yn = yMax
  xn must > 0 when yn > 0
  how to find all x and y for minimum P = p0 + p1 + ... + pn
 */
function findMinP(
  a: number[],
  b: number[],
  c: number[],
  d: number[],
  xMax: number,
  yMax: number
): {
  minP: number;
  xValues: number[][];
  yValues: number[][];
  pValues: number[][];
} {
  const n = a.length - 1; // assuming a, b, c arrays are of length n+1
  let minP = Infinity;
  let minXValues: number[][] = [];
  let minYValues: number[][] = [];
  let minPValues: number[][] = [];

  // Function to calculate pn
  function calculatePn(
    an: number,
    bn: number,
    cn: number,
    xn: number,
    yn: number
  ): number {
    const term3 = xn + yn > 0 ? cn : 0;
    return an * xn + bn * yn + term3;
  }

  // Function to recursively find the minimum P
  function findMinRecursive(
    currentN: number,
    currentXSum: number,
    currentYSum: number,
    currentP: number,
    currentXValues: number[],
    currentYValues: number[],
    currentPValues: number[]
  ): void {
    if (currentN > n) {
      if (currentXSum === xMax && currentYSum === yMax) {
        if (currentP < minP) {
          minP = currentP;
          minXValues = [currentXValues.slice()];
          minYValues = [currentYValues.slice()];
          minPValues = [currentPValues.slice()];
        } else if (currentP === minP) {
          minXValues.push(currentXValues.slice());
          minYValues.push(currentYValues.slice());
          minPValues.push(currentPValues.slice());
        }
      }
      return;
    }

    for (let xn = 0; xn <= d[currentN]; xn++) {
      for (let yn = 0; yn <= d[currentN]; yn++) {
        if (
          xn + yn <= d[currentN] &&
          currentXSum + xn <= xMax &&
          currentYSum + yn <= yMax &&
          !(xn === 0 && yn > 0)
        ) {
          const pn = calculatePn(a[currentN], b[currentN], c[currentN], xn, yn);
          findMinRecursive(
            currentN + 1,
            currentXSum + xn,
            currentYSum + yn,
            currentP + pn,
            [...currentXValues, xn],
            [...currentYValues, yn],
            [...currentPValues, pn]
          );
        }
      }
    }
  }

  // Start the recursive search
  findMinRecursive(0, 0, 0, 0, [], [], []);

  return {
    minP,
    xValues: minXValues,
    yValues: minYValues,
    pValues: minPValues,
  };
}

export default findMinP;
