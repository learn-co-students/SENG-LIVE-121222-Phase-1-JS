//Data 
const inventory = [
  {
    id: 1,
    title: 'Eloquent JavaScript: A Modern Introduction to Programming',
    author: 'Marjin Haverbeke',
    price: 10.00,
    reviews: [{userID: 1, content:'Good book, but not great for new coders'}],
    inventory: 10,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg'
  },
  {
    id: 2,
    title: 'JavaScript & JQuery: Interactive Front-End Web Development',
    author: 'Jon Duckett',
    price: 45.75,
    reviews: [{userID: 15, content:'good way to learn JQuery'}],
    inventory: 2,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/31SRWF+LkKL._SX398_BO1,204,203,200_.jpg'
  },
  {
    id: 3,
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    price: 36.00,
    reviews: [{userID: 25, content:'I disagree with everything in this book'}, {userID: 250, content:'Only JS book anyone needs'}],
    inventory: 8,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg'
  },
  {
    id: 4,
    title: 'JavaScript: The Definitive Guide',
    author: 'David Flanagan',
    price: 25.50,
    reviews: [{userID: 44, content:'Great intro to js book'}, {userID: 350, content:'It really is the Definitive guide'}],
    inventory: 0,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51wijnc-Y8L._SX379_BO1,204,203,200_.jpg"
  },
  {
    id: 5,
    title: 'You Don’t Know JS',
    author: 'Kyle Simpson',
    price: 6.00,
    reviews: [{userID: 76, content:'You can find this for free online, no need to pay for it!'}],
    inventory: 7,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/41T5H8u7fUL._SX331_BO1,204,203,200_.jpg'
  }, 
  {
    id: 6,
    title: 'Learn Enough JavaScript to Be Dangerous',
    author: 'Michael Hartl',
    price: 24.00,
    reviews: [{userID: 50, content:'pretty good'}],
    inventory: 5,
    imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQyf6xSyTHc7a8mx17ikh6GeTohc88Hn0UgkN-RNF-h4iOwVlkW'
  },
  {
    id: 7,
    title: 'Cracking the Coding Interview',
    author: 'Gayle Laakmann McDowell',
    price: 49.95,
    reviews: [{userID: 99, content:'One of the most helpful books for taking on the tech interview'}, {userID: 20, content: 'Great but I just wish it was in JavaScript instead of Java' }],
    inventory: 20,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/41oYsXjLvZL._SY344_BO1,204,203,200_.jpg'
  }
]

// ✅ Function ideas:
/*
- helloWorld
- formatPrice(price)
- blurb(book)
*/

// Start here!
function helloWorld() {
  let secret = "I love dates... The fruit ;)"
  return "Hello, world!";
}

helloWorld()

function formatPrice(priceNum) {
  return '$' + Number.parseFloat(priceNum).toFixed(2);
  // return `$${Number.parseFloat(priceNum).toFixed(2)}`
}

console.log('formatPrice', formatPrice(inventory[0].price))

// 💡 Arrow functions vs regular functions

// ✅ create an arrow function version of the formatPrice function

// const formatPrice = (priceNum) => {
//   return '$' + Number.parseFloat(priceNum).toFixed(2);
//   // return `$${Number.parseFloat(priceNum).toFixed(2)}`
// }


// ✅ create a blurb() function that accepts a book as an argument and logs a message in the following format:
// 'Eloquent JavaScript: A Modern Introduction to Programming by Marjin Haverbeke is on sale for $10.00'

// books look like this:
// {
//   id: 1,
//   title: 'Eloquent JavaScript: A Modern Introduction to Programming',
//   author: 'Marjin Haverbeke',
//   price: 10.00,
//   reviews: [{userID: 1, content:'Good book, but not great for new coders'}],
//   inventory: 10,
//   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg'
// },
function blurb(book) {
  const title = book.title;
  const author = book.author;
  const price = formatPrice(book.price);
  return `${title} by ${author} is on sale for ${price}`
}

console.log('blurb', blurb(inventory[0]))


// 💡 Difference between Block scope, Function scope, and Global scope

// ✅ create a variable `highestPricedBook`

let highestPriceBook;

// ✅ create a function `findHighestPricedBook` that finds that book and returns it
function findHighestPricedBook() {
  highestPriceBook = inventory[0]; // set to first book
  for (let i = 1; i < inventory.length; i++) {
    if (highestPriceBook.price < inventory[i].price) {
      highestPriceBook = inventory[i];
    } 
  }
  return highestPriceBook;
}

highestPriceBook = findHighestPricedBook()


// After Break

// ✅ Create a function called `log` that takes a function and its argument as arguments
// and logs a message explaining the name of the function, the argument passed and 
// the return value 

// 💡 Practice using callbacks for iteration

// const nums = [1, 2, 3]
// nums.forEach(num => console.log(num*num))

// ✅ Create an array of the prices of all of the books

let prices = [];
inventory.forEach(book => prices.push(formatPrice(book.price)))

console.log('prices', prices);

// ✅ Create an array of simplified book objects

const simplified = inventory.map(book => {
  return {
    title: book.title,
    author: book.author,
    price: book.price
  }
})


// ✅ Create an array of strings from the inventory in the following format:
// 'Eloquent JavaScript: A Modern Introduction to Programming by Marjin Haverbeke is on sale for $10.00'

// const blurbs = inventory.map(book => blurb(book))
const blurbs = inventory.map(blurb)

console.log('blurbs', blurbs);
// 💡 When do I use forEach vs map?