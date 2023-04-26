const fetch = require("node-fetch");

const ipURL = "https://api.ipify.org?format=json";
/* ------------------ 1 --------------------- */
async function logIp() {
  try {
    const response = await fetch(ipURL);
    const responseData = await response.json();
    console.log(responseData.ip);
  } catch (err) {
    throw err;
  }
}

//logIp();

/* ------------------ 2 --------------------- */
async function getIp(): Promise<string> {
  try {
    const response = await fetch(ipURL);
    const responseData = await response.json();
    return responseData.ip;
  } catch (err) {
    throw err;
  }
}

/* ------------------ 3 --------------------- */
const randomNameURL =
  "https://random-data-api.com/api/name/random_name";
const numberOfRequests = 3;

async function getThreeRandomNamesOne(): Promise<string[]> {
  try {
    const names: string[] = [];
    const responses = await Promise.all(
      [...Array(numberOfRequests).keys()].map(() =>
        fetch(randomNameURL)
      )
    );
    for (const response of responses) {
      const { name } = await response.json();
      names.push(name);
    }
    return names;
  } catch (err) {
    throw err;
  }
}

async function getThreeRandomNamesTwo(): Promise<string[]> {
  try {
    const promises: Promise<Response>[] = [];
    for (let i = 0; i < numberOfRequests; i++) {
      promises.push(fetch(randomNameURL));
    }
    return new Promise(async (resolve) => {
      const names: string[] = [];
      for (const promise of promises) {
        const response = await promise;
        const { name } = await response.json();
        names.push(name);
      }
      resolve(names);
    });
  } catch (err) {
    throw err;
  }
}

async function getThreeRandomNamesThree(): Promise<
  string[]
> {
  try {
    const promises: Promise<Response>[] = [];
    for (let i = 0; i < numberOfRequests; i++) {
      promises.push(fetch(randomNameURL));
    }
    return new Promise((resolve) => {
      const names: string[] = [];
      let counter = 0;
      for (let i = 0; i < numberOfRequests; i++) {
        promises[i]
          .then((response) => response.json())
          .then((user) => {
            names.push(user.name);
            counter++;
            if (counter === numberOfRequests) {
              resolve(names);
            }
          });
      }
    });
  } catch (err) {
    throw err;
  }
}

/*getThreeRandomNamesOne().then((data) => {
  console.log(data);
});

getThreeRandomNamesTwo().then((data) => {
  console.log(data);

getThreeRandomNamesThree().then((data) => {
  console.log(data);
});*/

/* ------------------ 4 --------------------- */
const randomUserURL =
  "https://random-data-api.com/api/users/random_user";

//without async/await
async function getFemaleUserOne(): Promise<Object> {
  try {
    return fetch(randomUserURL)
      .then((response: Response) => response.json())
      .then((user: any) => {
        if (user.gender === "Female") {
          return user;
        }
        return getFemaleUserOne();
      });
  } catch (error) {
    throw error;
  }
}

//with async/await
async function getFemaleUserTwo(): Promise<Object> {
  try {
    while (true) {
      const response: Response = await fetch(randomUserURL);
      const user = await response.json();
      if (user.gender === "Female") {
        return user;
      }
    }
  } catch (error) {
    throw error;
  }
}
//getFemaleUserTwo().then((data) => console.log(data));

/* ------------------ 5 --------------------- */
async function someFunc(
  otherFunc: (callback: (ip: string) => void) => void
) {
  setTimeout(otherFunc, 5000);
}

/* ------------------ 6 --------------------- */
async function someFuncTwo(callback: (ip: string) => void) {
  const ip = await getIp();
  callback(ip);
}

export {};
