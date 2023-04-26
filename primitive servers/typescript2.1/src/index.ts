// 1.

function getFirstWord(a: string): number {
  return a.split(/ +/)[0].length;
}

// 2.

function getUserNamings(a: {
  name: string;
  surname: string;
}): { fullname: string; initials: string } {
  return {
    fullname: a.name + " " + a.surname,
    initials: a.name[0] + "." + a.surname[0],
  };
}

// 3.

// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
function getAllProductNames(a: {
  products: { name: string }[];
}): string[] | [] {
  return a?.products?.map((prod) => prod?.name) || [];
}

// 4.1

// easy way is using 'as' keyword
// hard way is ?...
function hey1(
  a:
    | { name: () => string; cuteness: number }
    | { name: () => string; coolness: number }
): string {
  return "hey! i'm " + a.name();
}
hey1({ name: () => "roma", cuteness: 100 });
hey1({ name: () => "vasya", coolness: 100 });

// 4.2
interface AbstractPet {
  name(): string;
}

class Cat {
  name;

  constructor(name: string, bool: boolean) {
    this.name = () => name;
  }
}

class Dog {
  name;

  constructor(name: string, num: number) {
    this.name = () => name;
  }
}

function hey2(a: AbstractPet): string {
  return "hey! i'm " + a.name();
}
let a = new Cat("myavchik", true);
let b = new Dog("gavchik", 333);
hey2(a);
hey2(b);

// 4.3

function hey(
  a:
    | {
        name: () => string;
        type: "cat";
        cuteness: number;
      }
    | {
        name: () => string;
        type: "dog";
        coolness: number;
      }
): string {
  return (
    "hey! i'm " +
    a.name() +
    (a.type === "cat"
      ? "cuteness: " + a.cuteness
      : "coolness: " + a.coolness)
  );
}
hey({ name: () => "roma", type: "cat", cuteness: 100 });
hey({ name: () => "vasya", type: "dog", coolness: 100 });

// 5.

// google for Record type
function stringEntries(a: Array<any> | Object): Array<any> {
  return Array.isArray(a) ? a : Object.keys(a);
}

// 6.

// you don't know Promises and async/await yet. Or do you?
// ....can be hard, don't worry and SKIP if you do not know how to do it

async function world(a: number): Promise<string> {
  return "*".repeat(a);
}
const hello = async () => {
  return await world(10);
};
hello()
  .then((r) => console.log(r))
  .catch((e) => console.log("fail"));
