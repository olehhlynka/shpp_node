function Product(ID, name, description, price, brand, activeSize, quantity, date = Date.now(), reviews, images) {
    this.ID = ID
    this.name = name
    this.description = description
    this.price = price
    this.brand = brand
    this.sizes = ["XS", "S", "M", "L", "XL", "XXL"]
    this.activeSize = activeSize
    this.quantity = quantity
    this.date = date
    this.reviews = reviews
    this.images = images

    this.getID = function() {
        return this.ID
    }

    this.setID = function(ID) {
        this.ID = ID
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
                assessmentsSum += value; 
            }
            ratingsSum += assessmentsSum / 4;
        }
        return ratingsSum / reviews.length
    }
}

function Reviews(ID, author, date = Date.now(), comment, rating) {
    this.ID = ID
    this.author = author
    this.date = date
    this.comment = comment
    this.rating = rating
}