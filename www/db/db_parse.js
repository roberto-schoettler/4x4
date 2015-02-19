var ingredients = [];
var recipes = [];
var ingredients_recipes = [];
var nutrients_recipes = [];
var units = [new Unit(1, "g")];
var images = [];
var nutrients = [];

var diets = [];
var allergies = [];

function parseApi(data) {
    console.log(data);
    
    for (var i = 0; i < data.length; i++) {
        if (searchRecipe(data[i].label))
            continue;
            
        images.push(data[i].image);    
            
        recipes.push(new Recipe(recipes.length+1, 
                        data[i].label, 
                        0, 
                        data[i].totalWeight/data[i].yield,
                        1,
                        -1,
                        -1,
                        data[i].image.split("/").pop(),
                        data[i].url,
                        []));
                        
        for (var j = 0; j < data[i].ingredients.length; j++) {
            var ingredient = data[i].ingredients[j];
            
            ingredient.exactFood = ingredient.exactFood.capitalize();
            var id = searchIngredient(ingredient.exactFood);
            if (id == -1) {
                id = ingredients.length + 1;
                ingredients.push(new Ingredient(id,
                                    ingredient.exactFood,
                                    -1,
                                    -1,
                                    -1,
                                    ""));
            }
            
            ingredients_recipes.push(new IngredientRecipe(recipes.length+1, 
                                        id, 
                                        ingredient.weight/data[i].yield,
                                        1,
                                        ingredient.quantity/data[i].yield,
                                        addUnit(ingredient.measure.label)));
        }
        
        if (nutrients.length == 0) {
            for (key in data[i].totalNutrients) {
                var nutrient = data[i].totalNutrients[key];
                nutrients.push(new Nutrient(nutrients.length + 1,
                                nutrient.label,
                                -1,
                                addUnit(nutrient.unit)));
            }
        }
        
        for (key in data[i].totalNutrients) {
            var nutrient = data[i].totalNutrients[key];
            nutrients_recipes.push(new NutrientRecipe(recipes.length+1,
                                    searchNutrient(nutrient.label),
                                    nutrient.quantity/data[i].yield));
            }
            
        for (var j = 0; j < data[i].dietLabels.length; j++) {
            addDiet(data[i].dietLabels[j]);
        }
        
        for (var j = 0; j < data[i].healthLabels.length; j++) {
            addAllergie(data[i].healthLabels[j]);
        }
    }
    
    console.log(recipes);
    console.log(ingredients);
    console.log(ingredients_recipes);
    console.log(units);
    console.log(images);
    console.log(nutrients);
    console.log(nutrients_recipes);
    console.log(diets);
    console.log(allergies);
}

function searchRecipe(name) {
    for (var i = 0; i < recipes.length; i++) {
        if (recipes[i].title == name)
            return true;
    }
    
    return false;
}

function searchIngredient(name) {
    for (var i = 0; i < ingredients.length; i++) {
        if (ingredients[i].title == name)
            return i + 1;
    }
    
    return -1;
}

function searchUnit(name) {
    for (var i = 0; i < units.length; i++) {
        if (units[i].title == name)
            return i + 1;
    }
    
    return -1;
}

function addUnit(name) {
    var id = searchUnit(name);
    if (id == -1) {
        id = units.length + 1;
        units.push(new Unit(id, name));
    }
    
    return id;
}

function searchNutrient(name) {
    for (var i = 0; i < nutrients.length; i++) {
        if (nutrients[i].title == name)
            return i + 1;
    }
    
    return -1;
}

function searchDiet(name) {
    for (var i = 0; i < diets.length; i++) {
        if (diets[i] == name)
            return i + 1;
    }
    
    return -1;
}

function addDiet(name) {
    id = searchDiet(name)
    if (id == -1)
        diets.push(name);
}

function searchAllergie(name) {
    for (var i = 0; i < allergies.length; i++) {
        if (allergies[i] == name)
            return i + 1;
    }
    
    return -1;
}

function addAllergie(name) {
    id = searchAllergie(name)
    if (id == -1)
        allergies.push(name);
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}