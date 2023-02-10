const usedIDs = []

function Product() {
    this.ID
    this.name
    this.description
    this.price
    this.brand
    this.sizes = ["XS", "S", "M", "L", "XL", "XXL"]
    this.activeSize
    this.quantity
    this.date
    this.reviews
    this.images

    this.getID = function() {
        return this.ID
    }

    this.setID = function(ID) {
        if (usedIDs.includes(ID)) {
            throw new Error(`ID ${ID} already exists`)
        }
        this.ID = ID
    }

    this.getName = function() {
        return this.name
    }

    this.setName = function(name) {
        this.name = name
    }

    this.getDescription = function() {
        return this.description
    }

    this.setDescription = function(description) {
        this.description = description
    }

    this.getPrice = function () {
      return this.price;
    }

    this.setPrice = function (price) {
      this.price = Math.abs(price);
    }

    this.getBrand = function() {
        return this.brand
    }

    this.setBrand = function(brand) {
        this.brand = brand
    }

    this.getSizes = function() {
        return this.sizes
    }

    this.setSizes = function(sizes) {
        this.sizes = sizes
    }

    this.getActiveSize = function() { 
        return this.activeSize
    }

    this.setActiveSize = function(activeSize) {
        this.activeSize = activeSize
    }

    this.getQuantity = function() {
        return this.quantity
    }

    this.setQuantity = function(quantity) {
        this.quantity = quantity
    }

    this.getDate = function() {
        return formatDate(this.date)
    }

    this.setDate = function(date) {
        this.date = date
    }

    this.getReviews = function() {
        return this.reviews
    }

    this.setReviews = function(reviews) {
        this.reviews = reviews
    }

    this.getImages = function() {
        return this.images
    }

    this.setImages = function(images) {
        this.images = images
    }

    this.getReviewByID = function(ID) {
        for (const review of this.reviews) {
            if (review.ID === ID) {
                return review
            }
        }
    }

    this.getImage = function(imageIndex) {
        if (imageIndex === undefined) {
            return this.images[0]
        }
        return this.images[imageIndex]
    }

    this.addSize = function(newSize) {
        if (!this.sizes.includes(newSize)) {
            this.sizer.push(newSize)
        }
    }

    this.deleteSize = function(sizeToDelete) {
        const index = this.sizes.find(sizeToDelete)
        if (index) {
            this.sizes.splice(index, 1)
        }
    }

    this.addReview = function(newReview) {
        let isPresent
        for (const review of this.reviews) {
            if (review.ID === newReview.ID) {
                isPresent = true
            }
        }
        if (!isPresent) {
            this.reviews.push(newReview)
        }
    }

    this.deleteReview = function (IDToDelete) {
      for (const review of this.reviews) {
        if (review.ID === IDToDelete) {
          this.reviews.splice(IDToDelete, 1)
        }
      }
    }

    this.getAverageRating = function() {
        let ratingsSum = 0
        for (const review of this.reviews) {
            let assessmentsSum = 0
            for (const value of review.rating.values()) {
                assessmentsSum += value
            }
            ratingsSum += assessmentsSum / 4
        }
        return ratingsSum / reviews.length
    }
}

function Reviews() {
    this.ID
    this.author
    this.date
    this.comment
    this.rating

    this.getID = function () {
      return this.ID;
    }

    this.setID = function (ID) {
      this.ID = ID;
    }

    this.getAuthor = function() {
        return this.author
    }

    this.setAuthor = function(author) {
        this.author = author
    }

    this.getDate = function() {
        return formatDate(this.date)
    }

    this.setDate = function(date) {
        this.date = date
    }

    this.getComment = function() {
        return this.comment
    }

    this.setComment = function(comment) {
        this.comment = comment
    }

    this.getRating = function() {
        return this.rating
    }

    this.setRating = function(rating) {
        this.rating = rating
    }
}

function searchProducts(products, search) {
    const matched = []
    if(search.includes('*')) {
        search = search.slice(search.indexOf('*'))
    }
    for (const product of products) {
        if(product.getName().toLowerCase().includes(search.toLowerCase())) {
            matched.push(product)
        }
        if(product.getDescription().toLowerCase().includes(search.toLowerCase())) {
            matched.push(product)
        }
    }
    return matched
}

function sortProducts(products, sortRule) {
    switch (sortRule) {
        case "id": {
            return products.sort(compareIDs)
        }
        case "price": {
            return products.sort(comparePrice)
        }
        case "name": {
            return products.sort(compareNames)
        }
        default:
            return products
    }
}

function compareIDs(first, second) {
    if(first.ID < second.ID) return -1
    if(first.ID > second.ID) return 1
    return 0
}

function comparePrice(first, second) {
    return first.price - second.price
}

function compareNames(first, second) {
  if (first.name < second.name) return -1;
  if (first.name > second.name) return 1;
  return 0;
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0")
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-") +
    " " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
  )
}