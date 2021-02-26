// Class to create book objects
class Book {
    constructor(title,series,author,pages,status,id) {
        this.title = title;
        this.series = series;
        this.author = author;
        this.pages = pages;
        this.status= status;
        this.id = id;
    }
    
    // Function to create unique id
    static createUUID(){   
        let dt = new Date().getTime()
        
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        })
        
        return uuid;        
    }
}

// UI class to handle all UI manipulations
class UI {
    // displayBooks
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(book => UI.addBookToList(book));
    }
    // addBookToList
    static addBookToList(book) {
        const list = document.querySelector("#book-list");
        let row = document.createElement("tr");
        row.setAttribute('id', book.id);
        row.innerHTML = `
            <td class="title">${book.title}</td>
            <td>${book.series}</td>
            <td class="author">${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.status}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">&times;</a></td>
        `;
        list.appendChild(row);
    }
    
    static removeBookFromList(elem, id) {
        if(elem.classList.contains("delete")) {
            document.getElementById(id).remove();
        }
    }
    // showAlert
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className} text-center`;
        div.appendChild(document.createTextNode(message));
        const main = document.querySelector(".main");
        const table = document.querySelector(".table");
        main.insertBefore(div, table);
        setTimeout(()=> document.querySelector('.alert').remove(), 3000);
    }
    // formAlert
    static formAlert() {
        const div = document.createElement('div');
        div.classList = `alert alert-danger text-center`;
        div.appendChild(document.createTextNode("Please add name and author"));
        const formModal = document.querySelector(".modal-body");
        const form = document.querySelector("#book-form");
        formModal.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(),3000);
    }
    // clearFields
    static clearFields() {
        document.querySelector("#form-title").value = "";
        document.querySelector("#form-series").value = "";
        document.querySelector("#form-author").value = "";
        document.querySelector("#form-pages").value = "";
        document.querySelector("#form-status").value = "unread";
    }
}
// Store class to handle local storage
class Store {
    // getBooks
    static getBooks() {
        let books;
        if(localStorage.getItem('books')===null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    // addBook
    static addBook(book) {
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    // removeBook
    static deleteBook(id) {
        let books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.id===id) {
                books.splice(index,1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }

}

/* Events */
// Render books when DOM loads
document.addEventListener("DOMContentLoaded" ,UI.displayBooks);

// Form submission
const bookForm = document.querySelector("#book-form"); 
bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Getting form values
    let title = bookForm.querySelector("#form-title").value;
    let series = bookForm.querySelector("#form-series").value;
    let author = bookForm.querySelector("#form-author").value;
    let pages = bookForm.querySelector("#form-pages").value;
    let status = bookForm.querySelector("#form-status").value;

    if(title==='' || author==="") {
        // display alert
        UI.formAlert();
    } else {
        // Adding book to system
        let id = Book.createUUID();
        const book = new Book(title,series,author,pages,status,id);
        $("#newBookModal").modal("hide");
        UI.clearFields();
        UI.addBookToList(book);
        Store.addBook(book);
        UI.showAlert("Book Added", "success");
    }
})
// clear form on cancel
const cancel = document.querySelectorAll(".cancel-form-modal");
cancel.forEach(x => x.addEventListener("click", UI.clearFields));

// Remove book from list
document.querySelector("#book-list").addEventListener("click", (e) => {
    // delete book from table
    /* UI.removeBookFromList(e.target); */
    let rowID = e.target.parentElement.parentElement.id;
    UI.removeBookFromList(e.target, rowID);
    UI.showAlert("Book Deleted", "success");
    // delete book from LS 
   Store.deleteBook(rowID);
})