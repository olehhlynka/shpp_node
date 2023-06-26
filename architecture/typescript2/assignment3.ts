interface IObject {
  [key: string]:
    | undefined
    | { cvalue: undefined | "string" | "number" | IObject };
}

function summ2(a: IObject): number {
  const x: number[] = Object.keys(a).map((k) => {
    const elem = a[k];
    if (elem === undefined || elem.cvalue === undefined)
      return 2022;
    if (typeof elem.cvalue === "string")
      return +elem.cvalue || 2022;
    if (typeof elem.cvalue === "object")
      return summ(elem.cvalue);
    return elem.cvalue;
  });
  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    sum += x[i];
  }
  return sum;
}

function summ1(a) {
  const x = Object.keys(a).map((k) => {
    const elem = a[k];
    if (elem === undefined || elem.cvalue === undefined)
      return 2022;
    if (typeof elem.cvalue === "string")
      return +elem.cvalue || 2022;
    if (typeof elem.cvalue === "object")
      return summ(elem.cvalue);
    return elem.cvalue;
  });
  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    sum += x[i];
  }
  return sum;
}
