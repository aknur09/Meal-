const input=document.querySelector('input')
const root=document.querySelector('#root')
const btns=document.querySelectorAll('button')

const random=document.querySelector('#random')

const detail=document.querySelector('.detail')

const url='https://www.themealdb.com/api/json/v1/1/search.php?s='

const letterUrl='https://www.themealdb.com/api/json/v1/1/search.php?f='
const randomUrl='https://www.themealdb.com/api/json/v1/1/random.php'
const urlb='https://www.themealdb.com/api/json/v1/1/search.php?f=b'
const idUrl='https://www.themealdb.com/api/json/v1/1/lookup.php?i='

function getMeals(aty) {
    fetch (url+aty)
        .then(res=>res.json())
        .then(data=>{
            console.log(data.meals);
            renderMeals(data.meals)
        })
}

input.onchange=()=>{
    getMeals(input.value)
}

function renderMeals(arr) {
    root.innerHTML=""
    for (const obj of arr) {
        root.innerHTML+=`
        <li>
        <h5>${obj.strMeal}</h5>
        <img width="30%" src='${obj.strMealThumb}' />
        </li>`
    }
}



btns.forEach(btn=>{
    btn.onclick=()=>{
        console.log(letterUrl+btn.innerText);

        fetch(letterUrl+btn.innerText)
        .then(res=>res.json())
        .then(data=>{
            console.log(data.meals);
            renderMeals(data.meals)
        })
    }
    
})  



function getMeal(id) {
    console.log(id);
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' +id)
    .then(res=>res.json())
    .then(data=>{
        console.log(data.meals);
       
    })
}

 

function getMeals(){
    fetch(urlb)
    .then(res=>res.json())
    .then(data=>{
        console.log(data.meals);
        renderMeals(data.meals.slice(0,3))
        
    })
    
}

function getOneMeal(id) {
    fetch(idUrl+id)
    .then(res=>res.json())
    .then(data=>{           
        console.log(data.meals[0]);
          showOneMeal(data.meals[0])
})

}


function renderMeals(arr){
    root.innerHTML=''
    for (const obj of arr) {
        root.innerHTML+=`
        <div class="card" style="width: 18rem;" onclick='getOneMeal(${obj.idMeal})'>
            <img src="${obj.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">${obj.strMeal}</p>
            </div>
         </div>
        `
        
    }
}
getMeals()

function showOneMeal(obj) {
     let ingredientList=""
    for (i=0;i<21; i++){
        const ingredient=obj['strIngredient' + i]
        if (ingredient) {
            ingredientList+=
            `<li>${ingredient}</li>
            <img src='https://www.themealdb.com/images/ingredients/${ingredient}-Small.png' />
            
            `
            
        }
    }

    root.innerHTML=''     
    detail.innerHTML=`
    <div>
        <div>
            <h1>${obj.strMeal} </h1>
            <img src='${obj.strMealThumb}' />
            <ol>${ingredientList} </ol>
          
        </div>
    </div>
    `
}




function getRandom() {
    fetch(randomUrl)
    .then(res=>res.json())
    .then(data=>{
        console.log(data.meals);
        renderMeals(data.meals)
    })
}  


random.onclick=()=>{
    detail.innerHTML=''
    root.innerHTML=''
    getRandom()
}