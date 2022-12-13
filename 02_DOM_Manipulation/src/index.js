//BookStore has been moved to data.js 
console.log(bookStore);

function formatPrice(price) {
  return '$' + Number.parseFloat(price).toFixed(2);
}

function renderHeader(bookStore) {
  document.querySelector('header h1').textContent = bookStore.name;
}

function renderFooter(bookStore) {
  // <footer>
  //   <div id="store"></div>
  //   <div id="number"></div>
  //   <div id="address"></div>
  // </footer>
  document.querySelector('#store').textContent = bookStore.location;
  document.querySelector('#number').textContent = bookStore.number;
  document.querySelector('#address').textContent = bookStore.address;
}

// create a function called renderBook(book)
// it will take a book object as an argument
// and create the html struture for rendering 
// that book and insert it into our webpage!

function renderBook(book) {
  // should create an li element that looks something like this:
  // <li class="list-li">
  //   <h3>Eloquent JavaScript : A Modern Introduction to Programming</h3>
  //   <p>Marjin Haverbeke</p>
  //   <p>$10.00</p>
  //   <img src="https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg" alt="Eloquent JavaScript cover"/>
  //   <button>Delete</button>
  // </li>
  // console.log(book);
  const li = document.createElement('li');
  li.className = 'list-li'

  const h3 = document.createElement('h3');
  h3.textContent = book.title;

  const pAuthor = document.createElement('p');
  pAuthor.textContent = book.author;

  const pPrice = document.createElement('p');
  pPrice.textContent = formatPrice(book.price);

  const img = document.createElement('img');
  img.src = book.imageUrl;
  img.alt = `${book.title} cover`
  img.title = book.title;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "Delete"

  // debugger
  li.append(h3, pAuthor, pPrice, img, deleteBtn);

  document.querySelector('#book-list').append(li)
}

function removeBook(index) {
  document.querySelectorAll('#book-list .list-li')[index].remove()
}



renderHeader(bookStore);
renderFooter(bookStore);
bookStore.inventory.forEach(renderBook)

