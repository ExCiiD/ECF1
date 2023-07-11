let searchInput = document.getElementById('search');
let btnDecroissant = document.getElementById('btn');
let range = document.getElementById('rng');
let bottom = document.querySelector('.bot-section');
let spanRange = document.getElementById('nbResult');
let rangeValue;
let nomPlat;
let tab = [];
let meal;
let btnState = true;

// remplacer "arrabiata" par la valeur de l'input search

// eventlistener sur l'input pour activer la fonction searchValueUpdate
searchInput.addEventListener('change', searchValueUpdate);

// fonction pour obtenir la liste des repas quand on tape dans l'input, puis les affiche
function searchValueUpdate() {
    nomPlat = this.value
    console.log(nomPlat)
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nomPlat}`)
        .then(response => response.json())
        .then(d => {
            tab = d.meals;
            console.log(tab);
            displayMeals();
        })
        .catch(err => console.error(err));
}

// fonction pour afficher les repas
function displayMeals() {
    bottom.innerHTML = ''/* efface les anciennes cartes */
    const sortMethod = (a, b) => {
        if (btnState == true) {
            return a.strMeal.localeCompare(b.strMeal);
        }
        else {
            return b.strMeal.localeCompare(a.strMeal);
        }
    }
    tab
        .slice(0, rangeValue)
        .sort((sortMethod))
        .map((meal) => {
        bottom.innerHTML += `
                <div class="meal-card">
                    <div class="card-title">
                        <h1>${meal.strMeal}</h1>
                    </div> 
                    <img id="img-test" src="${meal.strMealThumb}" alt="image plat">
                    <div class="meal-description">
                        <div class="origin">${meal.strArea}</div>
                        <p class="recette">
                        ${meal.strInstructions}
                        </p>
                    </div>
                </div>
            `
        })
}

// Affichage du nombre de résultats :
range.addEventListener('change', nbResults);

//  fonction pour que la span prennent la valeur de l'input range puis affiche les plats par rapport a la valeur
function nbResults() {
    spanRange.innerHTML = '';
    rangeValue = this.value
    console.log(rangeValue)
    spanRange.innerHTML += `${this.value}`;
    displayMeals();
}

// eventlistener sur le bouton pour trier
btnDecroissant.addEventListener('click', sortTab)

// fonction pour trier 
function sortTab() {
    if (btnState == true) {
        btnState = false;
        btnDecroissant.innerHTML = 'Décroissant'
        console.log(btnState)
    }
    else if (btnState == false) {
        btnState = true;
        btnDecroissant.innerHTML = 'Croissant'
        console.log(btnState)
    }
    displayMeals();
}


