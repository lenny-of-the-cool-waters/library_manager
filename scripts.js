// Class to create book objects
class Book {
    constructor(title,series,author,pages,status ) {
        this.title = title;
        this.series = series;
        this.author = author;
        this.pages = pages;
        this.status= status;
    }
}

// UI class to handle all UI manipulations
class UI {
    // displayBooks
    static displayBooks() {
        const sample = [
            {
                title: "Blueheart",
                series: "",
                author: "Alison Sinclair",
                pages: "400",
                status: "unread"
            },
            {
                title: "Midshipman's Hope",
                series: "Seaforth Saga",
                author: "David Feintuch",
                pages: "375",
                status: "read"
            }
        ];
        const books = sample;
        books.forEach(book => UI.addBookToList(book));
    }
    // addBookToList
    static addBookToList(book) {
        const list = document.querySelector("#book-list");
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.series}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.status}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">&times;</a></td>
        `;
        list.appendChild(row);
    }
    
    static removeBookFromList(elem) {
        if(elem.classList.contains("delete")) {
            elem.parentElement.parentElement.remove();
        }
    }
    // showAlert
    // clearFields
}
// Store class to handle local storage
class Store {

}

/* Events */
// Render books when DOM loads
document.addEventListener("DOMContentLoaded" ,UI.displayBooks);
// Remove book from list
document.querySelector("#book-list").addEventListener("click", (e) => {
    // delete book from table
    UI.removeBookFromList(e.target);
})
// Form submission
const bookForm = document.querySelector("#book-form");
bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Getting form values
    let title = bookForm.querySelector("#title").value;
    let series = bookForm.querySelector("#series").value;
    let author = bookForm.querySelector("#author").value;
    let pages = bookForm.querySelector("#pages").value;

    if(title==='' || author==="") {
        // display alert
    } else {
        // 
    }
})