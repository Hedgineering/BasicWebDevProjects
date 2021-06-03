const bookItems = document.querySelector("#book-items-list");

// Insert Deletion Functionality For Book Items List
bookItems.addEventListener("click",(e) => {
    // This works because the click event of any child
    // of this list element bubbles up to the list itself 
    // (as it is the parent)
    if(e.target.classList.contains("btn-delete")){
        const li = e.target.parentNode;
        console.log(li);
        li.parentNode.removeChild(li);
    }

    // This way we won't have to keep adding event listeners
    // to every single button we make
});

// Function to strip a string input of it's html content
function removeTags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
          
    // Regular expression to identify HTML tags in 
    // the input string. Replacing the identified 
    // HTML tag with a null string.
    return str.replace( /(<([^>]+)>)/ig, '');
}

// Function to serve as book item HTML template
function createBookItem(name) {
    const bookItems = document.querySelector("#book-items-list");
    
    // We remove html tags from inputs to prevent malicious code injection
    name = removeTags(name);

    const newItem = `<li class="book-item">
                        <p class="book-name">${name}</p>
                        <button class="btn btn-delete">delete</button>
                    </li>`;
    
    bookItems.innerHTML += newItem;
}

// Code to add book to list
const addBookInput = document.getElementById("add-book-input");
const addBookBtn = addBookInput.nextElementSibling;

addBookBtn.addEventListener("click",(e) => {
    createBookItem(addBookInput.value);
    addBookInput.value = "";
})

// Searchbar Functionality
const searchbar = document.getElementById("book-search-input");
searchbar.addEventListener("keyup", (e) => {
    // Get the user entered text every time they type a letter
    const text = e.target.value.toLowerCase();

    // Iterate through each book item
    Array.from(bookItems.getElementsByTagName("li")).forEach((item) => {
        const title = item.firstElementChild.innerText.toLowerCase();

        // Show the book item only if the entered text is in the title
        if(title.indexOf(text) != -1) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    })
})