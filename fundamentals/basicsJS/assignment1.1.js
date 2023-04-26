function Product(
  ID,
  name,
  description,
  price,
  brand,
  activeSize,
  quantity,
  date,
  reviews,
  images
) {
  usedIDs = [];
  this.ID = ID;
  this.name = name;
  this.description = description;
  this.price = price;
  this.brand = brand;
  this.sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  this.activeSize = activeSize;
  this.quantity = quantity;
  this.date = new Date(date);
  this.reviews = reviews;
  this.images = images;

  this.getID = function () {
    return this.ID;
  };

  this.setID = function (ID) {
    if (usedIDs.includes(ID)) {
      throw new Error(`ID ${ID} already exists`);
    }
    this.ID = ID;
  };

  this.getName = function () {
    return this.name;
  };

  this.setName = function (name) {
    this.name = name;
  };

  this.getDescription = function () {
    return this.description;
  };

  this.setDescription = function (description) {
    this.description = description;
  };

  this.getPrice = function () {
    return this.price;
  };

  this.setPrice = function (price) {
    this.price = Math.abs(price);
  };

  this.getBrand = function () {
    return this.brand;
  };

  this.setBrand = function (brand) {
    this.brand = brand;
  };

  this.getSizes = function () {
    return this.sizes;
  };

  this.setSizes = function (sizes) {
    this.sizes = sizes;
  };

  this.getActiveSize = function () {
    return this.activeSize;
  };

  this.setActiveSize = function (activeSize) {
    this.activeSize = activeSize;
  };

  this.getQuantity = function () {
    return this.quantity;
  };

  this.setQuantity = function (quantity) {
    this.quantity = quantity;
  };

  this.getDate = function () {
    return this.date;
  };

  this.setDate = function (date) {
    this.date = new Date(date);
  };

  this.getReviews = function () {
    return this.reviews;
  };

  this.setReviews = function (reviews) {
    this.reviews = reviews;
  };

  this.getImages = function () {
    return this.images;
  };

  this.setImages = function (images) {
    this.images = images;
  };

  this.getReviewByID = function (ID) {
    for (const review of this.reviews) {
      if (review.ID === ID) {
        return review;
      }
    }
  };

  this.getImage = function (imageIndex) {
    if (imageIndex === undefined) {
      return this.images[0];
    }
    return this.images[imageIndex];
  };

  this.addSize = function (newSize) {
    if (!this.sizes.includes(newSize)) {
      this.sizes.push(newSize);
    }
  };

  this.deleteSize = function (sizeToDelete) {
    const index = this.sizes.indexOf(sizeToDelete);
    if (index) {
      this.sizes.splice(index, 1);
    }
  };

  this.addReview = function (newReview) {
    let isPresent;
    for (const review of this.reviews) {
      if (review.ID === newReview.ID) {
        isPresent = true;
      }
    }
    if (!isPresent) {
      this.reviews.push(newReview);
    }
  };

  this.deleteReview = function (IDToDelete) {
    for (const review of this.reviews) {
      if (review.ID === IDToDelete) {
        this.reviews.splice(IDToDelete, 1);
      }
    }
  };

  this.getAverageRating = function () {
    let ratingsSum = 0;
    for (const review of this.reviews) {
      let assessmentsSum = 0;
      for (const value of review.rating.values()) {
        assessmentsSum += value;
      }
      ratingsSum += assessmentsSum / 4;
    }
    return ratingsSum / reviews.length;
  };
}

function Review(ID, author, date, comment, rating) {
  this.ID = ID;
  this.author = author;
  this.date = new Date(date);
  this.comment = comment;
  this.rating = rating;

  this.getID = function () {
    return this.ID;
  };

  this.setID = function (ID) {
    this.ID = ID;
  };

  this.getAuthor = function () {
    return this.author;
  };

  this.setAuthor = function (author) {
    this.author = author;
  };

  this.getDate = function () {
    return this.date;
  };

  this.setDate = function (date) {
    this.date = new Date(date);
  };

  this.getComment = function () {
    return this.comment;
  };

  this.setComment = function (comment) {
    this.comment = comment;
  };

  this.getRating = function () {
    return this.rating;
  };

  this.setRating = function (rating) {
    this.rating = rating;
  };
}

function searchProducts(products, search) {
  const foundProducts = [];
  const regexForSearch = search.includes("*")
    ? new RegExp(
        `\\b${search.slice(0, search.indexOf("*"))}`
      )
    : new RegExp(`\\b${search}\\b`);

  for (const product of products) {
    if (product.getName().match(regexForSearch)) {
      foundProducts.push(product);
    }
    if (product.getDescription().match(regexForSearch)) {
      foundProducts.push(product);
    }
  }
  return foundProducts;
}

function sortProducts(products, sortRule) {
  switch (sortRule) {
    case "id": {
      return products.sort((a, b) => a.ID - b.ID);
    }
    case "price": {
      return products.sort((a, b) => a.price - b.price);
    }
    case "name": {
      return products.sort((a, b) => a.name - b.name);
    }
    default:
      return products;
  }
}

//Testing
const socks = new Product(
  "1",
  "Socks",
  "Warm wollen socks",
  90.99,
  "Dodo socks",
  "M",
  100,
  "2022-03-01 18:00:00",
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
  ["socks-blue.jpg", "socks.jpg"]
);
const shirt = new Product(
  "2",
  "Shirt",
  "Nice shirt",
  10.99,
  "Maika",
  "L",
  15,
  "2022-02-01 15:00:00",
  [
    new Review(
      "12",
      "John",
      "2022-02-12 12:50:41",
      "Good shirt",
      { service: 4, value: 5, price: 4, quality: 3 }
    ),
    new Review(
      "13",
      "Jessie",
      "2022-02-16 10:10:41",
      "Beautiful shirt",
      { service: 3, value: 4, price: 4, quality: 5 }
    ),
  ],
  ["shirt-blue.jpg", "shirt-red.jpg"]
);

console.log(
  `Review id-13: ${JSON.stringify(
    shirt.getReviewByID("13")
  )}`
);
console.log(`Image 1 of shirt: ${shirt.getImage(1)}`);
shirt.addReview(
  new Review(
    "14",
    "Mary",
    "2022-02-19 11:10:41",
    "I like this shirt",
    { service: 3, value: 4, price: 4, quality: 5 }
  )
);
console.log(
  `Added review: ${JSON.stringify(
    shirt.getReviewByID("14")
  )}`
);
socks.deleteReview("12");
console.log(
  `Socks reviews after id-12 review was deleted: ${JSON.stringify(
    socks.getReviews()
  )}`
);

console.log(`Quantity of socks: ${socks.getQuantity()}`);
console.log(
  `Description of shirt: ${shirt.getDescription()}`
);
console.log(`Date of socks: ${socks.getDate()}`);

console.log(
  `Search 1: ${JSON.stringify(
    searchProducts([socks, shirt], "Shirt")
  )}`
);
console.log(
  `Search 2: ${JSON.stringify(
    searchProducts([socks, shirt], "Sh*")
  )}`
);
console.log(
  `Search 3: ${JSON.stringify(
    searchProducts([socks, shirt], "wollen")
  )}`
);

console.log(
  `Sort by id: ${JSON.stringify(
    sortProducts([socks, shirt], "id")
  )}`
);
console.log(
  `Sort by price: ${JSON.stringify(
    sortProducts([socks, shirt], "price")
  )}`
);
console.log(
  `Sort by name: ${JSON.stringify(
    sortProducts([socks, shirt], "name")
  )}`
);
