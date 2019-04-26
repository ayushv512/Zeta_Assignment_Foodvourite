window.onload = function () {
    getCategories();
};

var otherRecipesList = []; 

function getCategories() {
    const url = "http://temp.dash.zeta.in/food.php";

    fetch(url)
      .then(result => result.json())
      .then(result => {
            displayCategories(result)   
      })
 
}


function displayCategories(result){
    let categoriesList = result.categories;
    let categoryListDiv = document.getElementById('categoriesList');
    categoriesList.forEach(element => {
        let categoryBtn = document.createElement('button');
        
        let categoryDiv = document.createElement('span');
        let innerImg = document.createElement('img');

        innerImg.src = element.image;
        innerImg.className = "imageCls";
        categoryDiv.innerHTML = element.name;
        categoryBtn.id = element.name + "id";
        categoryDiv.className = "categoryDivCls";
        categoryBtn.onclick =  function(){
            onCategoryClick(element.name)
        }
        categoryBtn.className = "categoryBtnCls";

        categoryBtn.appendChild(innerImg);
        categoryBtn.appendChild(categoryDiv);
        categoryListDiv.appendChild(categoryBtn);  
    });

    displayRecipes(result.recipes);
}


function displayRecipes(recipes){
    let favouritesListDiv = document.getElementById('favouritesList');
    let favouritesList =[];
   
    recipes.forEach(item =>{
        if(item.isFavourite){
            favouritesList.push(item);
        }
        else{
            otherRecipesList.push(item)
        }
    });
    favouritesList.forEach(item =>{
        let favouritesDetailDiv = document.createElement('div');
        favouritesDetailDiv.className ="favouritesDetailDivCls";
        let imageSpan = document.createElement('img');
        let nameDiv = document.createElement('div');
        let priceDiv = document.createElement('div');
        let reorderbtn =  document.createElement('button');
        reorderbtn.innerHTML ="REORDER";
        reorderbtn.className ="reorderBtnCls";

        nameDiv.innerHTML = item.name;
        nameDiv.className="favouriteNameCls";
        imageSpan.src = item.image;
        imageSpan.className = "favouriteImgCls";
        priceDiv.innerHTML = "&#x20b9;"+ item.price;

        priceDiv.appendChild(reorderbtn);
        favouritesDetailDiv.appendChild(imageSpan);
        favouritesDetailDiv.appendChild(nameDiv);
        favouritesDetailDiv.appendChild(priceDiv);
        favouritesListDiv.appendChild(favouritesDetailDiv);
    });

    displayOtherRecipes(otherRecipesList);
 
}

function displayOtherRecipes(otherRecipesList){
    let recipesListDiv = document.getElementById('recipes');
    recipesListDiv.innerHTML = "";  
    if(otherRecipesList.length  == 0){
        recipesListDiv.innerHTML = "No dish"; 
        recipesListDiv.className ="nodishCls"
    }
    otherRecipesList.forEach(item =>{
        let recipeDiv = document.createElement('div');

        let imageSpan = document.createElement('img');
        let nameDiv = document.createElement('div');
        let priceDiv = document.createElement('div');
        let addtobagbtn =  document.createElement('button');
        addtobagbtn.innerHTML ="ADD TO BAG";
        addtobagbtn.className ="addtobagBtnCls";
        addtobagbtn.onclick =  function(){
            onAddToBagClick(item);
        }

        imageSpan.src = item.image;
        imageSpan.className = "recipeImgCls";
        imageSpan.onclick = function(){
            onImageClick(item);
        }
        nameDiv.innerHTML = item.name;
        nameDiv.className = "nameCls";
        priceDiv.innerHTML = "&#x20b9;"+ item.price;
        priceDiv.className = "priceCls";
        recipeDiv.className = "recipeDivCls";

        priceDiv.appendChild(addtobagbtn);
        recipeDiv.appendChild(imageSpan);
        recipeDiv.appendChild(nameDiv);
        recipeDiv.appendChild(priceDiv);
        recipesListDiv.className ="";
        recipesListDiv.appendChild(recipeDiv);
    });
}

function filterData(searchFieldValue){
    let filteredData = [];
    otherRecipesList.forEach(function(item){
        if(new RegExp(searchFieldValue, "i").test(item.name)){
            filteredData.push(item);
        }
    })
    displayOtherRecipes(filteredData);
}

function onKeyUpFunction(){
    let searchFieldValue = document.getElementById('searchField').value;
    debounce(filterData(searchFieldValue), 300);
} 


const debounce = function(fn, d){
	let timer;
	return function (){    
		let context = this; 
		args = arguments;
		clearTimeout(timer); 
		timer = setTimeout(()=>{
				fn.apply(context, args)
			},d);
		}
}

function onCategoryClick(categoryName){
    let filteredData = [];
    otherRecipesList.forEach(function(item){
        if(new RegExp(categoryName, "i").test(item.category)){
            filteredData.push(item);
        }
    })
    displayOtherRecipes(filteredData);
}

function  onAddToBagClick(category){
    let filteredData = [];
    otherRecipesList.forEach(function(item){
        if(new RegExp(category.name, "i").test(item.name) == false ){
            filteredData.push(item);
        }
    })
    displayOtherRecipes(filteredData);
}

function onImageClick(item){
    console.log(item);
    let maincContianerDiv = document.getElementById('maincContianerDiv');
    maincContianerDiv.innerHTML = "";
    let recipeDiv = document.createElement('div');

    let imageSpan = document.createElement('img');
    let nameDiv = document.createElement('div');
    let priceDiv = document.createElement('div');
    let quantity =  document.createElement('input');
    let categoryDiv = document.createElement('div');
    let detailsDiv =  document.createElement('div');
    let hr = document.createElement('hr');
    let ratingSpan = document.createElement('span');
    ratingSpan.style.float = "right";


    quantity.type ="number";
    quantity.className ="addtobagBtnCls";
    

    imageSpan.src = item.image;
    imageSpan.className = "recipeImgCls";
    imageSpan.onclick = function(){
        onImageClick(item);
    }
    nameDiv.innerHTML = item.name;
    nameDiv.className = "nameCls";
    priceDiv.innerHTML = "&#x20b9;"+ item.price;
    priceDiv.className = "priceCls";
    recipeDiv.className = "recipeDivCls";

    categoryDiv.innerHTML = "Category: " + item.category;
    ratingSpan.innerHTML = "    " + item.rating + "Rating";
    categoryDiv.appendChild(ratingSpan);
    detailsDiv.innerHTML = "DETAILS </br>"+ item.details;

    priceDiv.appendChild(quantity);
    recipeDiv.appendChild(imageSpan);
    recipeDiv.appendChild(nameDiv);
    recipeDiv.appendChild(priceDiv);
    recipeDiv.appendChild(hr);
    recipeDiv.appendChild(categoryDiv);
    recipeDiv.appendChild(detailsDiv);
    maincContianerDiv.appendChild(recipeDiv);
}