let Book = class{
    constructor(author, title, pages, isRead){
        this.author = author,
        this.title = title,
        this.pages = pages,
        this.isRead = isRead
    }

    checkIndex(){
        return library.getLibrary().indexOf(this);
    }

    changeReadStatus(){
        this.isRead == true ? this.isRead = false : this.isRead = true;
    }
}


const library = (() => {
    let _myLibrary = [];
    const _libraryTable = document.querySelector(".libraryTable");

    const _clearLibraryTable = () => {
        if (_myLibrary.length > 0) {
            const books = document.querySelectorAll(".book");
            books.forEach(book => {
                _libraryTable.removeChild(book);
            });          
        }

    };

    const _updateLibraryTable = () => {
        dbRef.set(_myLibrary);
        _clearLibraryTable();
        _myLibrary.forEach(book => _addRow(book));
           
    };

    const _createRemoveBtn = (row, book) => {
        let remove = document.createElement('td');
        let removeBtn = document.createElement('button');
        removeBtn.classList.add("removeBtn");
        removeBtn.textContent = "Delete";
        removeBtn.dataset.number = book.checkIndex();
        remove.appendChild(removeBtn);
        row.appendChild(remove);
        
        removeBtn.addEventListener("click", () => {
            let dataAtt = removeBtn.getAttribute('data-number');
            _myLibrary.splice(dataAtt, 1);
            row.remove();
            _updateLibraryTable(); 
        });

        };

    const _checkIsRead = (row, book) =>{
        let isRead = document.createElement('td');
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        book.isRead == true ? checkbox.checked = true : checkbox.checked = false;
        checkbox.addEventListener("change", () => {
            book.changeReadStatus();
            dbRef.set(_myLibrary);
        });
        
        isRead.appendChild(checkbox);
        row.appendChild(isRead);
    };

    const _addRow = (book) => {
        let row = document.createElement('tr');
        row.classList.add("book");
        _libraryTable.appendChild(row);

        let author = document.createElement('td');
        author.textContent = book.author;
        row.appendChild(author);

        let bookTitle = document.createElement('td');
        bookTitle.textContent = book.title;
        row.appendChild(bookTitle);

        let pagesN = document.createElement('td');
        pagesN.textContent = book.pages;
        row.appendChild(pagesN);

        _checkIsRead(row, book);
        _createRemoveBtn(row, book);

    };

    const addBook = () => {
        let formAuthor = document.querySelector(".author");
        let formTitle = document.querySelector(".bookName");
        let formPages = document.querySelector(".bookPages");
        let formIsRead = document.querySelector(".isRead");

        if (formAuthor.value == "" || formTitle.value == "" || formPages.value == "") {
            return false;
        } else {
            let book = new Book(formAuthor.value, formTitle.value, formPages.value, formIsRead.checked);
            _myLibrary.push(book);
            _updateLibraryTable();
            formAuthor.value = "";
            formTitle.value = "";
            formPages.value = "";
            formIsRead.checked = false;
            controllers.hideForm();
            
            
        }
    };

    const getLibrary = () => {
        return _myLibrary;
    }

    const getData = () => {
        dbRef.once("value", data => {
            let arrDb = data.val();
            if(arrDb != null){
                arrDb.forEach(data => {
                    let book = new Book(data.author, data.title, data.pages, data.isRead);
                    _myLibrary.push(book);
                    _clearLibraryTable();
                    _myLibrary.forEach(book => _addRow(book));
                });
            }
            
        });
        
        
        
        
    };

    return {addBook, getLibrary, getData}
})();



const controllers = (() => {
    const _form = document.querySelector(".container__form");
    
    const showForm = () => {
        _form.classList.add("showForm");
    }

    const hideForm = () => {
        _form.classList.remove("showForm");
    }

    return { showForm, hideForm}
})();

library.getData();
const submitButton = document.querySelector(".submit");
const newBookButton = document.querySelector(".newBook");

newBookButton.addEventListener("click", () => controllers.showForm());
submitButton.addEventListener("click", () => library.addBook());

