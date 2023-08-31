let startIndex = 0;
let subject = 'Architecture';
let isPrice = false;
const filledStar = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none"><path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#F2C94C"/></svg>';
const emptyStar = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none"><path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#EEEDF5"/></svg>';
const booksDiv = document.querySelector('.books__wrapper');
const btnMore = document.querySelector('.books__btn-more');
let genresItem = document.querySelectorAll('.genres__item');
let loader = document.querySelector('.loader-wrapper');
let counter = document.querySelector('.header__counter');

for (let elem of genresItem) {
    elem.addEventListener('click', changeGenre)
}

btnMore.addEventListener('click', fetchBooks);

async function fetchBooks() {
    btnMore.style.display = 'none';
    loader.style.display = 'block';
    let url = `https://www.googleapis.com/books/v1/volumes?q="subject:${subject}"&key=AIzaSyCtcAZ2tEXDFxS4Jo2mZsoFCEJTeZoEcxg&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict=en`
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    for (let i = 0; i < 6; i++) {
        createBook(data.items[i]);
    }
    startIndex += 6;
    btnMore.style.display = 'block';
    loader.style.display = 'none';
}

function changeGenre(e) {
    document.querySelector('.genres__item_active').classList.remove('genres__item_active')
    booksDiv.innerHTML = '';
    e.target.classList.add('genres__item_active')
    subject = e.target.getAttribute('data-subject');
    startIndex = 0;
    fetchBooks();
}

function createBook(obj) {
    let booksItem = document.createElement('div');
    booksItem.classList.add('books__item');
    let booksImg = document.createElement('div');
    booksImg.classList.add('books__img');
    let img = document.createElement('img');
    let booksDesc = document.createElement('div');
    booksDesc.classList.add('books__desc');
    let booksAuthor = document.createElement('div');
    booksAuthor.classList.add('books__author');
    let booksTitle = document.createElement("h4");
    booksTitle.classList.add('books__title');
    let booksRating = document.createElement('div');
    booksRating.classList.add('books__rating');
    let booksRatingStar = document.createElement('div');
    booksRatingStar.classList.add('books__rating-star');
    let booksRatingCount = document.createElement('div');
    booksRatingCount.classList.add('books__rating-count');
    let booksText = document.createElement('p');
    booksText.classList.add('books__text');
    let booksPrice = document.createElement('div');
    booksPrice.classList.add('books__price');
    let booksBtn = document.createElement('button');
    booksBtn.classList.add('books__btn');
    booksBtn.setAttribute('data-id', obj.id);

    booksRating.appendChild(booksRatingStar);
    booksRating.appendChild(booksRatingCount);
    booksDesc.appendChild(booksAuthor);
    booksDesc.appendChild(booksTitle);
    booksDesc.appendChild(booksRating);
    booksDesc.appendChild(booksText);
    booksDesc.appendChild(booksPrice);
    booksDesc.appendChild(booksBtn);
    booksDiv.appendChild(booksItem);
    booksImg.appendChild(img);
    booksItem.appendChild(booksImg);
    booksItem.appendChild(booksDesc);

    addImg(img, obj.volumeInfo.imageLinks);
    addContent(booksAuthor, obj.volumeInfo.authors);
    addContent(booksTitle, obj.volumeInfo.title);
    addRating(booksRatingStar, booksRatingCount, obj.volumeInfo.averageRating, obj.volumeInfo.ratingsCount);
    addBooksText(booksText, obj.volumeInfo.description);
    addPrice(booksPrice, obj.saleInfo.retailPrice);
    addBtn(booksBtn)

    booksDiv.appendChild(booksItem);
}

function addImg(elem, obj) {
    if (obj) {
        elem.src = obj.thumbnail;
    } else {
        elem.src = 'img/noimg.jpg';
    }
    elem.alt = 'book cover';
}

function addContent(elem, str) {
    if (str) {
        elem.textContent = str;
    }
}

function addRating(elemStar, elemCount, average, count) {
    if (average) {
        let countStar = Math.round(average) - 1;
        for (let i = 0; i < 5; i++) {
            if (countStar >= i) {
                elemStar.innerHTML += filledStar;
            } else {
                elemStar.innerHTML += emptyStar;
            }
        }
        elemCount.textContent = count + ' review'
    }
}

function addBooksText(elem, str) {
    if (str) {
        if (str.length > 100) {
            str = str.slice(0, 100) + '...';
            elem.textContent = str;
        } else {
            elem.textContent = str;
        }
    } 
}

function addPrice(elem, obj) {
    if (obj) {
        elem.textContent = obj.amount + ' ' + obj.currencyCode;
        isPrice = true;
    }
}

function addBtn(elem) {
    if (isPrice === true) {
        if (localStorage.getItem(elem.getAttribute('data-id'))) {
            elem.textContent = 'in the cart';
            elem.addEventListener('click', removeFromCart);
            elem.classList.add('books__btn_in-cart');
        } else {
            elem.textContent = 'buy now';
            elem.addEventListener('click', addInCart);
        }
        isPrice = false;
    } else {
        elem.textContent = 'out of stock';
        elem.classList.add('books__btn_disable')
    }
}

function addInCart(e) {
    let elem = e.target;
    let id = elem.getAttribute('data-id');
    localStorage.setItem(id, 'book');
    counter.style.display = 'flex';
    counter.textContent = localStorage.length;
    elem.textContent = 'in the cart';
    elem.classList.add('books__btn_in-cart');
    elem.removeEventListener('click', addInCart);
    elem.addEventListener('click', removeFromCart);
}

function removeFromCart(e) {
    let elem = e.target;
    let id = elem.getAttribute('data-id');
    localStorage.removeItem(id);
    if (localStorage.length === 0) {
        counter.style.display = 'none';
    } else {
        counter.textContent = localStorage.length;
    }
    elem.textContent = 'buy now';
    elem.classList.remove('books__btn_in-cart');
    elem.removeEventListener('click', removeFromCart);
    elem.addEventListener('click', addInCart);
}

fetchBooks();

if (localStorage.length > 0) {
    counter.style.display = 'flex';
    counter.textContent = localStorage.length;
}