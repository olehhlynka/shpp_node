// First part
function someFunction1<T>(param: globalThis.Partial<T>) {}

function someFunction2<T>(param: globalThis.Partial<T>): T {
  return {} as T;
}

// Second part
function someFunction3<T extends { id: string }>(
  param: T & globalThis.Partial<{ id: string }>
) {}

function someFunction4<T extends { id: string }>(
  param: T & globalThis.Partial<{ id: string }>
): T {
  return {} as T;
}

//Third part
class Rectangle {
  w!: number;
  h!: number;
}
class Circle {
  radius!: number;
}

function makeObjects<T extends Object>(
  constructor: new () => T,
  count: number
) {
  let a: T[] = [];
  for (let i = 0; i < count; i++) a.push(new constructor());

  return a;
}

let a: Rectangle[] = makeObjects(Rectangle, 10);
let b: Circle[] = makeObjects(Circle, 20);
