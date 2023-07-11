console.log("hello");

let searchInput = document.getElementById('search');
let btnDecroissant = document.getElementById('btn');
let range = document.getElementById('rng');
let bottom = document.querySelector('.bot-section')
let nomPlat;
let tab = [];
let meal;

const options = { method: 'GET' };



// remplacer "arrabiata" par la valeur de l'input search
searchInput.addEventListener('change', searchValueUpdate);

/* Fonction */
function searchValueUpdate() {
    nomPlat = this.value
    console.log(nomPlat)
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nomPlat}`, options)
        .then(response => response.json())
        .then(d => {
            tab = d.meals;
            console.log(tab);
            displayMeals();
        })
        .catch(err => console.error(err));
}

function displayMeals() {
    bottom.innerHTML = ''
    tab.map((meal) => {
        bottom.innerHTML += `
                <div class="meal-card">
                    <div class="card-title">
                        <h1>${meal.strMeal}</h1>
                    </div> 
                    <img id="img-test" src="${meal.strMealThumb}" alt="image plat">
                    <div class="meal-description">
                        <div class="origin">${meal.strSource}</div>
                        <p class="recette">
                        ${meal.strInstructions}
                        </p>
                    </div>
                </div>
                `

    })
}