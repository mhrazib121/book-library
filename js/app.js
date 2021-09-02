const loadBook=()=>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // Error massage 
    const errorMassageField = document.getElementById('error-massage');
    errorMassageField.innerText = "";
    if(searchText === ""){
        
        const p = document.createElement('p');
        p.innerText = " Please input your book name.";
        errorMassageField.appendChild(p);
    }
    else{
        loadData(searchText);
    }
    searchField.value= "";
}

const loadData=(searchItem)=>{
    const url = `https://openlibrary.org/search.json?q=${searchItem}`;
    fetch(url)
    .then(res=> res.json())
    .then( data => displaySearchValue(data.docs))
}

const displaySearchValue = (books)=>{
    console.log(books);
    const displayField = document.getElementById('display-result');
    displayField.innerText = "";
    if (books.length === 0){
        const div = document.createElement('div');
        div.innerHTML = `<p class="text-danger text-center"> No result found </p>`;
        displayField.appendChild(div);
    }
    else{
        books.forEach(book=>{
            console.log(book)
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML=`
                <div class="card">
                    <img class='w-75' src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="">
                    <div class="card-body">
                      <h5 class="card-title">${book.title}</h5>
                      <p class="card-text text-danger"> Author Name: ${book.author_name}</p>
                      <p class="card-text text-danger"> First publish year: ${book.first_publish_year}</p>
                    </div>
                </div>
            `
            displayField.appendChild(div);
        })
    }
    
}