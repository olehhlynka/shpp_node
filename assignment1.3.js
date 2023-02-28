class AbstractProduct {
  #usedKeys = [];
  key;
  name;
  description;
  price;
  numberInStock;
  reviews;
  images;
  date;
  make;

  constructor(
    key,
    name,
    description,
    price,
    numberInStock,
    reviews,
    images,
    date,
    make
  ) {
    this.setKey(key);
    this.setName(name);
    this.setDescription(description);
    this.setPrice(price);
    this.setNumberInStock(numberInStock);
    this.setReviews(reviews);
    this.setImages(images);
    this.setDate(date);
    this.setMake(make);
  }

  getKey() {
    return this.key;
  }

  setKey(key) {
    if (this.#usedKeys.includes(key)) {
      throw new Error(
        `Product with key ${key} already exists`
      );
    }
    this.#usedKeys.push(key);
    this.key = key;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getDescription() {
    return this.shortDescription;
  }

  setDescription(description) {
    this.shortDescription = description;
  }

  getPrice() {
    return this.price;
  }

  setPrice(price) {
    if (price <= 0) {
      throw new Error(
        "Price of the product has to be greater than 0"
      );
    }
    this.price = price;
  }

  getNumberInStock() {
    return this.numberInStock;
  }

  setNumberInStock(number) {
    if (number < 0) {
      throw new Error(
        "Number of products in stock can't be negative"
      );
    }
    this.numberInStock = number;
  }

  getReviews() {
    return this.reviews;
  }

  setReviews(reviews) {
    this.reviews = reviews;
  }

  getImages() {
    return this.images;
  }

  setImages(images) {
    this.images = images;
  }

  getDate() {
    return this.date;
  }

  setDate(date) {
    this.date = Date.parse(date);
  }

  getMake() {
    return this.make;
  }

  setMake(make) {
    this.make = make;
  }

  getReviewByID(ID) {
    for (const review of this.reviews) {
      if (review.ID === ID) {
        return review;
      }
    }
  }

  getImage(imageIndex) {
    if (imageIndex === undefined) {
      return this.images[0];
    }
    return this.images[imageIndex];
  }

  addReview(newReview) {
    let isPresent;
    for (const review of this.reviews) {
      if (review.ID === newReview.ID) {
        isPresent = true;
      }
    }
    if (!isPresent) {
      this.reviews.push(newReview);
    }
  }

  deleteReview(IDToDelete) {
    for (const review of this.reviews) {
      if (review.ID === IDToDelete) {
        this.reviews.splice(IDToDelete, 1);
      }
    }
  }

  getFullInformation() {
    let allInfo = "";
    Object.keys(this).forEach((key) => {
      allInfo += `${key} - ${this[key]}\n`;
    });
    return allInfo;
  }

  getPriceForQuantity(int) {
    return `$${(int * this.price).toFixed(2)}`;
  }

  getterSetter(field, value) {
    if (value === undefined) {
      return this[field];
    }
    this[field] = value;
  }
}

class Review {
  ID;
  author;
  date;
  comment;
  rating;

  constructor(ID, author, date, comment, rating) {
    this.ID = ID;
    this.author = author;
    this.date = Date.parse(date);
    this.comment = comment;
    this.rating = rating;
  }

  getID() {
    return this.ID;
  }

  setID(ID) {
    this.ID = ID;
  }

  getAuthor() {
    return this.author;
  }

  setAuthor(author) {
    this.author = author;
  }

  getDate() {
    return this.date;
  }

  setDate(date) {
    this.date = Date.parse(date);
  }

  getComment() {
    return this.comment;
  }

  setComment(comment) {
    this.comment = comment;
  }

  getRating() {
    return this.rating;
  }

  setRating(rating) {
    this.rating = rating;
  }
}

class Clothes extends AbstractProduct {
  material;
  color;

  constructor(
    key,
    name,
    description,
    price,
    numberInStock,
    reviews,
    images,
    date,
    make,
    material,
    color
  ) {
    super(
      key,
      name,
      description,
      price,
      numberInStock,
      reviews,
      images,
      date,
      make
    );
    this.material = material;
    this.color = color;
  }

  get material() {
    return this.material;
  }

  set material(material) {
    this.material = material;
  }

  get color() {
    return this.color;
  }

  set color(color) {
    this.color = color;
  }
}

class Electronics extends AbstractProduct {
  warranty;
  power;

  constructor(
    key,
    name,
    description,
    price,
    numberInStock,
    reviews,
    images,
    date,
    make,
    warranty,
    power
  ) {
    super(
      key,
      name,
      description,
      price,
      numberInStock,
      reviews,
      images,
      date,
      make
    );
    this.warranty = warranty;
    this.power = power;
  }

  get warranty() {
    return this.warranty;
  }

  set warranty(warranty) {
    this.warranty = warranty;
  }

  get power() {
    return this.power;
  }

  set power(power) {
    this.power = power;
  }
}

function searchProducts(products, search) {
  const matched = [];
  const regexForSearch = search.includes("*")
    ? new RegExp(
        `\\b${search.slice(0, search.indexOf("*"))}`
      )
    : new RegExp(`\\b${search}\\b`);

  for (const product of products) {
    if (product.getName().match(regexForSearch)) {
      matched.push(product);
    }
    if (product.getDescription().match(regexForSearch)) {
      matched.push(product);
    }
  }
  return matched;
}

function sortProducts(products, sortRule) {
  switch (sortRule) {
    case "id": {
      return products.sort(compareIDs);
    }
    case "price": {
      return products.sort(comparePrice);
    }
    case "name": {
      return products.sort(compareNames);
    }
    default:
      return products;
  }
}

function compareIDs(first, second) {
  if (first.ID < second.ID) return -1;
  if (first.ID > second.ID) return 1;
  return 0;
}

function comparePrice(first, second) {
  return first.price - second.price;
}

function compareNames(first, second) {
  if (first.name < second.name) return -1;
  if (first.name > second.name) return 1;
  return 0;
}

// Testing
const socks = new Clothes(
  "1",
  "Socks",
  "Warm wollen socks",
  90.99,
  100,
  [
    new Review(
      "12",
      "John",
      "2022-03-12 12:50:41",
      "Nice socks",
      { service: 5, value: 5, price: 4, quality: 5 }
    ),
    new Review(
      "13",
      "Jessie",
      "2022-03-16 10:10:41",
      "Beautiful socks",
      { service: 5, value: 5, price: 5, quality: 5 }
    ),
  ],
  ["socks-blue.jpg", "socks.jpg"],
  "2022-03-01 18:00:00",
  "Dodo socks",
  "wool",
  "blue"
);
const washingMachine = new Electronics(
  "2",
  "Washing machine",
  "Powerful washing machine",
  80.99,
  15,
  [
    new Review(
      "12",
      "John",
      "2022-02-12 12:50:41",
      "Nice machine",
      { service: 4, value: 5, price: 4, quality: 3 }
    ),
    new Review(
      "13",
      "Jessie",
      "2022-02-16 10:10:41",
      "Beautiful machine",
      { service: 3, value: 4, price: 4, quality: 5 }
    ),
  ],
  ["machine-blue.jpg", "machine-red.jpg"],
  "2022-02-01 15:00:00",
  "Bosh",
  12,
  1000
);

console.log(
  `Review id-13: ${JSON.stringify(
    washingMachine.getReviewByID("13")
  )}`
);
console.log(
  `Image 1 of washing mashinge: ${washingMachine.getImage(
    1
  )}`
);
washingMachine.addReview(
  new Review(
    "14",
    "Mary",
    "2022-02-19 11:10:41",
    "I like this machine",
    { service: 3, value: 4, price: 4, quality: 5 }
  )
);
console.log(
  `Added review: ${JSON.stringify(
    washingMachine.getReviewByID("14")
  )}`
);
socks.deleteReview("12");
console.log(
  `Socks reviews after id-12 review was deleted: ${JSON.stringify(
    socks.getReviews()
  )}`
);
console.log(`Full info: ${socks.getFullInformation()}`);
console.log(
  `Price for 10 pairs of socks: ${socks.getPriceForQuantity(
    10
  )}`
);
washingMachine.getterSetter("price", 100);
console.log(
  `Changed price of machine: ${washingMachine.getterSetter(
    "price"
  )}`
);
console.log(`Color of socks: ${socks.color}`);
console.log(`Power of machine: ${washingMachine.power}`);

console.log(
  `Search 1: ${JSON.stringify(
    searchProducts([socks, washingMachine], "Washing")
  )}`
);
console.log(
  `Search 2: ${JSON.stringify(
    searchProducts([socks, washingMachine], "Wa*")
  )}`
);
console.log(
  `Search 3: ${JSON.stringify(
    searchProducts([socks, washingMachine], "wollen")
  )}`
);

console.log(
  `Sort by id: ${JSON.stringify(
    sortProducts([socks, washingMachine], "id")
  )}`
);
console.log(
  `Sort by price: ${JSON.stringify(
    sortProducts([socks, washingMachine], "price")
  )}`
);
console.log(
  `Sort by name: ${JSON.stringify(
    sortProducts([socks, washingMachine], "name")
  )}`
);
