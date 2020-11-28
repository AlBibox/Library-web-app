let myLibrary = [];
myLibrary.id = "myLibrary";
let form = document.querySelector(".form");
let submitButton = document.querySelector(".submit");
const libraryTable = document.querySelector(".libraryTable");


function Book(author, title, pages, isRead){
    this.author = author,
    this.title = title,
    this.pages = pages,
    this.isRead = isRead
}

Book.prototype.checkIndex = function(){
    return myLibrary.indexOf(this); 
}

Book.prototype.changeReadStatus = function () {
    this.isRead == true ? this.isRead = false : this.isRead = true;   
}




function showForm() {
    let form = document.querySelector(".container__form");
    form.classList.add("showForm");
}

function hideForm(){
    let form = document.querySelector(".container__form");
    form.classList.remove("showForm");
    
}

const newBookButton = document.querySelector(".newBook");
newBookButton.addEventListener("click",() => showForm());



function checkIsRead(row, book) {
    let isRead = document.createElement('td');
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    book.isRead == true ? checkbox.checked = true : checkbox.checked = false;
    checkbox.addEventListener("change", () => {
        book.changeReadStatus();
    });
    isRead.appendChild(checkbox);
    row.appendChild(isRead);
}

function createRemoveBtn(row, book) {
    let remove = document.createElement('td');
    let removeBtn = document.createElement('button');
    removeBtn.classList.add("removeBtn");
    removeBtn.textContent = "Delete";
    removeBtn.dataset.number = book.checkIndex();
    remove.appendChild(removeBtn);
    row.appendChild(remove);

    removeBtn.addEventListener("click", () => {
        let dataAtt = removeBtn.getAttribute('data-number');
        myLibrary.splice(dataAtt, 1);

        let btns = document.querySelectorAll(".removeBtn");
        btns.forEach((btn) => {
            if (btn.dataset.number > dataAtt) {
                btn.dataset.number -= 1;
            }
        });
    });
}


function addRow(book) {
    let row = document.createElement('tr');
    row.classList.add("book");
    libraryTable.appendChild(row);

    let author = document.createElement('td');
    author.textContent = book.author;
    row.appendChild(author);
    

    let bookTitle = document.createElement('td');
    bookTitle.textContent = book.title;
    row.appendChild(bookTitle);

    let pagesN = document.createElement('td');
    pagesN.textContent = book.pages;
    row.appendChild(pagesN);


    checkIsRead(row, book);
    createRemoveBtn(row, book);   
}




function addBookToLibrary() {
    let formAuthor = document.querySelector(".author");
    let formTitle = document.querySelector(".bookName");
    let formPages = document.querySelector(".bookPages");
    let formIsRead = document.querySelector(".isRead");

    if(formAuthor.value == "" || formTitle.value == "" || formPages.value ==""){
        return false;
    }else{
        let book = new Book(formAuthor.value, formTitle.value, formPages.value, formIsRead.checked);
        myLibrary.push(book);
        addRow(book);
        formAuthor.value = "";
        formTitle.value = "";
        formPages.value = "";
        formIsRead.checked = false;
        hideForm();
    }
}
submitButton.addEventListener("click",() => addBookToLibrary());










    



