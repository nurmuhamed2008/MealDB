const cards = document.querySelector(".cards"); 
const btns = document.querySelectorAll('button');
const random = document.getElementById("random");
const inputSearch = document.getElementById("search")


const searchMeal = "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata";
const ranMeal = "https://www.themealdb.com/api/json/v1/1/random.php";
const url = "https://www.themealdb.com/api/json/v1/1/search.php?f="; 
const urlId = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
const urlImg = "https://www.themealdb.com/images/ingredients/-Small.png";

 
function getMeals(letter) { 
  fetch(url + letter) 
    .then((response) => response.json()) 
    .then((data) => { 
      console.log(data); 
      if(data.meals == null){
        cards.innerHTML = "<h2 style='color:white'>Meal is not found</h2>";
      }else {
          showMeals(data.meals); 
      }
    }); 
} 
getMeals("b"); 

function getMealById(id){
  fetch(urlId + id)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.meals[0]);
    const meal=data.meals[0];
    let ingrs = [];
    for (let i = 1; i < 21; i++){
      console.log(meal[`strIngredient${[i]}`]);
      if(meal[`strIngredient${[i]}`]){
        ingrs.push(meal[`strIngredient${[i]}`]);
      }
    } 
    console.log(ingrs);


    showDeteilMeal(data.meals[0], ingrs);
  })
}
getMealById("");

function showDeteilMeal(obj, arrIngrs){
  const liElement = arrIngrs.map(
    (el) => `
    <li class="elements">
    <img src="https://www.themealdb.com/images/ingredients/${el}-Small.png" />
    <h4>${el}</h4>
    </li>`
  )
  cards.innerHTML = `
  <div class="deteil">
    <div class="detail-card">

         <div> 
         <h2>${obj.strMeal}</h2>
         <img src="${obj.strMealThumb}" alt="" /> 
         </div> 


         <div class="el"> 
         <ul>
         ${liElement}
         </ul>
         </div> 
                                                                                                  
    </div>
    <h2>Instructions</h2>
    <h2>${obj.strInstructions}</h2>
    <video class="mm" controls src=${obj.strYoutube}></video>
  </div>`;

}



function showMeals(arr) { 
    cards.innerHTML = ''
  for (const meal of arr) { 
    cards.innerHTML += ` 
    <div class="card mt-3" style="width: 18rem; " onclick="getMealById(${meal.idMeal})"> 
  <img src=${meal.strMealThumb} class="card-img-top" alt="..."> 
  <div class="card-body"> 
    <h5 class="card-title">${meal.strMeal}</h5> 
   
  </div> 
</div> 
    `; 
  } 
}


inputSearch.addEventListener('input', () => {
  console.log(inputSearch.value);
  const cards = document.querySelectorAll(".card");
  const searchMeal = Array.from(cards); 
  const filteredMeals = searchMeal.filter(card => card.querySelector('.card-title').textContent.toLowerCase().includes(inputSearch.value.toLowerCase()));

  renderSearchMeal(filteredMeals);
});

function renderSearchMeal(filteredMeals) {
  cards.innerHTML = '';
  if (filteredMeals.length === 0) {
      cards.innerHTML = "<h2 style='color:white'>No meals found</h2>";
  } else {
      filteredMeals.forEach(card => {
          cards.appendChild(card);
      });
  }
}


btns.forEach((btn) => {
    btn.onclick = () => {
        getMeals(btn.innerText.toLowerCase());
    }
})

random.onclick = () => {
    fetch(ranMeal)
    .then(res=>res.json())
    .then((data) => showMeals(data.meals));
}
console.log(getMeals);