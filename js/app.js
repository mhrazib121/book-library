// Search function \\
// **************** \\
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // Error massage 
    const errorMassageField = document.getElementById('massage');
    errorMassageField.innerText = "";
    if (searchText === "") {
        const p = document.createElement('p');
        p.innerText = " Please input your book name.";
        errorMassageField.appendChild(p);

        // previous search result clear 
        const displayField = document.getElementById('display-result');
        displayField.innerText = "";
    }
    else {
        loadData(searchText);
    }
    searchField.value = "";
}

// Data load \\
// ********** \\
const loadData = (searchItem) => {
    const url = `https://openlibrary.org/search.json?q=${searchItem}`;
    fetch(url)
        .then(res => res.json())
        .then(data => resultFound(data))
}

// Total Results found function \\
// ***************************** \\
const resultFound = (results) => {
    
    const totalresult = document.getElementById('massage');
    if (results.numFound === 0) {
        const div = document.createElement('div');
        div.innerHTML = `<h3 class="text-danger">No result found (${results.numFound}) </h3>`;
        totalresult.appendChild(div);

        // previous search result clear\\
        const displayField = document.getElementById('display-result');
        displayField.innerText = "";

    }
    else {
        const div = document.createElement('div');
        div.innerHTML = `<h3>Total result found (${results.numFound}) </h3>`;
        totalresult.appendChild(div);
        displaySearchValue(results.docs);
    }
}

// Result display function \\
// ************************ \\
const displaySearchValue = (books) => {
    const displayField = document.getElementById('display-result');
    displayField.innerText = "";
    books.forEach(book => {
        console.log(book)
        if (book.cover_i === undefined) {

        }
        else {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card">
                    <img class='img-fluid' src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="">
                    <div class="card-body">
                      <h5 class="card-title">${book.title}</h5>
                      <p class="card-text text-danger"> Author Name: ${book.author_name}</p>
                      <p class="card-text text-danger"> First publish year: ${book.first_publish_year}</p>
                    </div>
                </div>
            `
            displayField.appendChild(div);
        }
    })
}