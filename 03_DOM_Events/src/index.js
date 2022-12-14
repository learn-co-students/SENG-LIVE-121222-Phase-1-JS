function formatPrice(price) {
  return '$' + Number.parseFloat(price).toFixed(2);
}

///////////////////
// render functions
///////////////////

// create a function renderHeader() that takes the store name from bookStore and adds to the DOM
function renderHeader(bookStore) {
  document.querySelector('header h1').textContent = bookStore.name;
}

function renderFooter(bookStore) {
  document.querySelector('#address').textContent = bookStore.address;
  document.querySelector('#number').textContent = bookStore.number;
  document.querySelector('#store').textContent = bookStore.location;
}

// function: renderBook(book)
// --------------------------
// accepts a book object as an argument and creates
// an li something like this:
// <li class="list-li">
//   <h3>Eloquent JavaScript</h3>
//   <p>Marjin Haverbeke</p>
//   <p>$10.00</p>
//   <img src="https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg" alt="Eloquent JavaScript cover"/>
// </li>
// appends the li to the ul#book-list in the DOM
function renderBook(book) {
    
  const li = document.createElement('li');
  li.className = 'list-li';
  
  const h3 = document.createElement('h3');
  h3.textContent = book.title;

  const pAuthor = document.createElement('p');
  pAuthor.textContent = book.author;
  
  const pPrice = document.createElement('p');
  pPrice.textContent = formatPrice(book.price);
  
  const img = document.createElement('img');
  img.src = book.imageUrl;
  img.alt = `${book.title} cover`;

  const btn = document.createElement('button');
  btn.textContent = 'Delete';
  btn.addEventListener('click', (e) => { 
    li.remove()
  })

  li.append(h3, pAuthor, pPrice, img, btn);

  document.querySelector('#book-list').append(li);
}

////////////////////////////////////////////////////////////////
// Event Listeners
////////////////////////////////////////////////////////////////

const toggleBookFormBtn = document.querySelector('#toggleForm');
const bookForm = document.querySelector('#book-form')

toggleBookFormBtn.addEventListener('click', (e) => {
  // const formShowing = !bookForm.classList.toggle('collapsed')
  // console.log('formShowing', formShowing);
  // toggleBookFormBtn.textContent = formShowing ? "Hide Book Form" : "New Book";
  // or
  const formHidden = bookForm.classList.toggle('collapsed')
  console.log('formHidden', formHidden);
  toggleBookFormBtn.textContent = formHidden ?  "New Book" : "Hide Book Form";
})

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    console.log('you just hit escape!')
    if (!bookForm.classList.contains('collapsed')) {
      const formShowing = bookForm.classList.add('collapsed')
      toggleBookFormBtn.textContent = "New Book";
    };
  }
})

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('submitting');
  // we need to create a book from the form that looks like this:
  // {
  //   id:3,
  //   title: 'JavaScript: The Good Parts',
  //   author: 'Douglas Crockford',
  //   price: 36.00,
  //   reviews: [{userID: 25, content:'I disagree with everything in this book'}, {userID: 250, content:'Only JS book anyone needs'}],
  //   inventory: 8,
  //   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg',
  // },
  // const book = {};

  // book.title = e.target.title.value;
  // book.author = e.target.author.value;
  // book.price = parseFloat(e.target.price.value);
  // book.inventory = parseInt(e.target.inventory.value);
  // book.imageUrl = e.target.imageUrl.value;

  const book = {
    title: e.target.title.value,
    author: e.target.author.value,
    price: parseFloat(e.target.price.value),
    inventory: parseInt(e.target.inventory.value),
    imageUrl: e.target.imageUrl.value
  };
  
  renderBook(book);
  e.target.reset();
})

////////////////////////////////////////////
// call render functions to populate the DOM
////////////////////////////////////////////

renderHeader(bookStore);
renderFooter(bookStore);
bookStore.inventory.forEach(renderBook);
