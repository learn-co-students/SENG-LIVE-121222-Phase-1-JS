// Rendering functions
// Renders Header
function renderHeader(bookStore) {
  document.querySelector('header h1').textContent = bookStore.name;
}

function renderFooter(bookStore) {
  document.querySelector('#address').textContent = bookStore.address;
  document.querySelector('#number').textContent = bookStore.number;
  document.querySelector('#store').textContent = bookStore.location;
}

// adds options to a select tag that allows swapping between different stores
function renderStoreSelectionOptions(stores) {
  // target the select tag
  const storeSelector = document.querySelector('#store-selector');
  // clear out any currently visible options
  storeSelector.innerHTML = "";
  // add an option to the select tag for each store
  stores.forEach(addSelectOptionForStore)
  // add a listener so that when the selection changes, we fetch that store's data from the server and load it into the DOM
  storeSelector.addEventListener('change', (e) => {
    getJSON(`http://localhost:3000/stores/${e.target.value}`)
      .then(store => {
        renderHeader(store);
        renderFooter(store);
      })
  })
}

const storeSelector = document.querySelector('#store-selector');

function addSelectOptionForStore(store) {
  const option = document.createElement('option');
  // the option value will appear within e.target.value
  option.value = store.id;
  // the options textContent will be what the user sees when choosing an option
  option.textContent = store.name;
  storeSelector.append(option);
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
  pPrice.textContent = `${formatPrice(book.price)}`;
  
  const pStock = document.createElement('p');
  pStock.className = "grey";
  if (book.inventory === 0) {
    pStock.textContent = "Out of stock";
  } else if (book.inventory < 3) {
    pStock.textContent = "Only a few left!";
  } else {
    pStock.textContent = "In stock"
  }
  
  const img = document.createElement('img');
  img.src = book.imageUrl;
  img.alt = `${book.title} cover`;

  const btn = document.createElement('button');
  btn.textContent = 'Delete';

  btn.addEventListener('click', (e) => {
    li.remove();
  })

  li.append(h3, pAuthor, pPrice, pStock, img, btn);
  document.querySelector('#book-list').append(li);
}

function renderError(error) {
  const main = document.querySelector('main');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error';
  if (error.message === "Failed to fetch") {
    errorDiv.textContent = "Whoops! Looks like you forgot to start your JSON-server!"
  } else {
    errorDiv.textContent = error;
  }
  main.prepend(errorDiv);
  window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      errorDiv.remove();
    }
  })
}

function formatPrice(price) {
  return '$' + Number.parseFloat(price).toFixed(2);
}

// Event Handlers
const toggleBookFormBtn = document.querySelector('#toggleBookForm');
const bookForm = document.querySelector('#book-form');
const toggleStoreFormBtn = document.querySelector('#toggleStoreForm');
const storeForm = document.querySelector('#store-form');

// hide and show the new book form when toggle buton is clicked
toggleBookFormBtn.addEventListener('click', (e) => {
  const formHidden = bookForm.classList.toggle('collapsed')
  toggleBookFormBtn.textContent = formHidden ?  "New Book" : "Hide Book Form";
});

toggleStoreFormBtn.addEventListener('click', (e) => {
  const formHidden = storeForm.classList.toggle('collapsed');
  toggleStoreFormBtn.textContent = formHidden ? " New Store" : "Hide Store Form";
});

// also hide both form when they're visible and the escape key is pressed

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!bookForm.classList.contains('collapsed')) {
      bookForm.classList.add('collapsed')
      toggleBookFormBtn.textContent = "New Book";
    };
    if (!storeForm.classList.contains('collapsed')) {
      storeForm.classList.add('collapsed')
      toggleStoreFormBtn.textContent = "New Store";
    };
  }
})





// this is what a book looks like in db.json
// {
//   id:1,
//   title: 'Eloquent JavaScript: A Modern Introduction to Programming',
//   author: 'Marjin Haverbeke',
//   price: 10.00,
//   reviews: [{userID: 1, content:'Good book, but not great for new coders'}],
//   inventory: 10,
//   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg'
// }
// we can use a book as an argument for renderBook!  This will add the book's info to the webpage.
bookForm.addEventListener('submit', (e) => { 
  e.preventDefault();
  // pull the info for the new book out of the form
  const book = {
    title: e.target.title.value,
    author: e.target.author.value,
    price: Number.parseFloat(e.target.price.value),
    reviews: [],
    inventory: Number(e.target.inventory.value),
    imageUrl: e.target.imageUrl.value
  }
  // pass the info as an argument to renderBook for display!
  
  // 1. Add the ability to perist the book to the database when the form is submitted. When this works, we should still see the book that is added to the DOM on submission when we refresh the page.


  // optimistic rendering
  // because the fetch request doesn't have a then attached
  // the renderBook function is called before the `fetch` promise resolves
  // this means that the DOM updates whether or not the server updates
  // we're being optimistic that the server will update
  // and so we don't wait for the server to update
  // before updating the DOM
  // fetch("http://localhost:3000/books", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(book)
  // })

  // renderBook(book); // updates the DOM whether the fetch works or not

  // pessimistic version
  
  fetch("http://localhost:3000/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(book)
  })
    .then(response => response.json())
    .then(renderBook); // only updates the DOM after the server has responded

  e.target.reset();
  bookForm.classList.add('collapsed');
  toggleBookFormBtn.textContent = 'New Book';
})

// 2. Hook up the new Store form so it that it works to add a new store to our database and also to the DOM (as an option within the select tag)

storeForm.name.value = "BooksRUs"
storeForm.location.value = "LaLaLand"
storeForm.number.value = "555-555-5555"
storeForm.address.value = "555 Shangri-La"
storeForm.hours.value = "Monday - Friday 9am - 6pm"

storeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log('handler is working')

  // pessimistic version
  // fetch("http://localhost:3000/stores", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({
  //     "location": e.target.location.value,
  //     "address": e.target.address.value,
  //     "number": e.target.number.value,
  //     "name": e.target.name.value,
  //     "hours": e.target.hours.value
  //   })
  // })
  //   .then(response => response.json())
  //   .then(store => {
  //     addSelectOptionForStore(store);
  //   })
  
  // optimistic version
  const store = {
    "location": e.target.location.value,
    "address": e.target.address.value,
    "number": e.target.number.value,
    "name": e.target.name.value,
    "hours": e.target.hours.value
  }
  // fetch("http://localhost:3000/stores", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(store)
  // })
  //   .then(response => response.json())
  //   .then(store => {
  //     storeSelector.children[storeSelector.children.length - 1].value = store.id;
  //   })
    
  // addSelectOptionForStore(store);

  postJSON("http://localhost:3000/stores", store)
    .then(store => {
      addSelectOptionForStore(store);
    })
})

// Invoking functions    
// fetching our data!
getJSON('http://localhost:3000/stores')
  .then((stores) => {
    // this populates a select tag with options so we can switch between stores on our web page
    renderStoreSelectionOptions(stores);
    renderHeader(stores[0])
    renderFooter(stores[0])
  })
  .catch(err => {
    console.error(err);
    // renderError('Make sure to start json-server!') // I'm skipping this so we only see this error message once if JSON-server is actually not running
  });

// load all the books and render them
getJSON("http://localhost:3000/books")
  .then((books) => {
    books.forEach(renderBook)
  })
  .catch(renderError);
