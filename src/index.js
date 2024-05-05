function searchCity(city){
    let apiKey = "92dd828taa17b53d1feo43a40bd1ab2f";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    
}

function searchForm(event){
    event.preventDefault();

    let searchInput = document.querySelector("#search-input");
    console.log(searchInput.value)
}

let formElement = document.querySelector("#search-form");
formElement.addEventListener("Submit", searchForm)