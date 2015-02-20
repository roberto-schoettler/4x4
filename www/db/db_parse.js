var ingredients = [];
var recipes = [];
var ingredients_recipes = [];
var nutrients_recipes = [];
var units = [new Unit(1, "g")];
var images = [];
var nutrients = [];

//var diets = [];
//var allergies = [];

var diets = [
    new Diet("High Protein", "high-protein",        parseInt('00000000000000000000000000000001', 2)),
    new Diet("Low Carb", "low-carb",                parseInt('00000000000000000000000000000010', 2)),
    new Diet("Low Fat", "low-fat",                  parseInt('00000000000000000000000000000100', 2)),
    new Diet("Balanced", "balanced",                parseInt('00000000000000000000000000001000', 2)),
    new Diet("High Fiber", "high-fiber",            parseInt('00000000000000000000000000010000', 2)),
    new Diet("Low Sodium", "low-sodium",            parseInt('00000000000000000000000000100000', 2)),
    new Diet("No Sugar", "low-sugar",               parseInt('00000000000000000000000001000000', 2)),
    new Diet("Sugar-conscious", "sugar-conscious",  parseInt('00000000000000000000000010000000', 2)),
    new Diet("Vegetarian", "vegetarian",            parseInt('00000000000000000000000100000000', 2)),
    new Diet("Vegan", "vegan",                      parseInt('00000000000000000000001000000000', 2)),
    new Diet("Paleo", "paleo",                      parseInt('00000000000000000000010000000000', 2)),
    new Diet("Gluten Free", "gluten-free",          parseInt('00000000000000000000100000000000', 2)),
    new Diet("Wheat Free", "wheat-free",            parseInt('00000000000000000001000000000000', 2)),
    new Diet("Dairy", "dairy-free",                 parseInt('00000000000000000010000000000000', 2)),
    new Diet("Eggs", "egg-free",                    parseInt('00000000000000000100000000000000', 2)),
    new Diet("Soy", "soy-free",                     parseInt('00000000000000001000000000000000', 2)),
    new Diet("Fish", "fish-free",                   parseInt('00000000000000010000000000000000', 2)),
    new Diet("Shellfish", "shellfish-free",         parseInt('00000000000000100000000000000000', 2)),
    new Diet("Tree Nuts", "tree-nut-free",          parseInt('00000000000001000000000000000000', 2)),
    new Diet("Low Potassium", "low-potassium",      parseInt('00000000000010000000000000000000', 2)),
    new Diet("Alcohol Free", "alcohol-free",        parseInt('00000000000100000000000000000000', 2)),
    new Diet("Kidney Friendly", "kidney-friendly",  parseInt('00000000001000000000000000000000', 2)),
    new Diet("Peanuts", "peanut-free",              parseInt('00000000010000000000000000000000', 2))];


var initialSearchList = ["Beef", "Pork", "Fish", "Salad", "Indian", "Chinese", "Vegan", "Vegetarian", "Chicken", "Gluten-free",
    "Soup", "Borsch", "Arepa", "Pasta", "Feijoada", "Rice", "Canadian", "Poutine", "Pizza", "Beer", "Tea", "Coffee", "Ice Cream",
    "Banana", "Mangoe", "Apple", "Vodka"];

//var initialSearchList = ["Beef", "Vodka"];    
var iterationCounter = 0;
var globDiet = 0;
    
function runParse() {
    search(initialSearchList.pop(), parseIterate);
}    

function parseIterate(data) {
    //console.log(data);
    parseApi(data);
    console.log(recipes.length);
    
    setTimeout(function () {
        if (initialSearchList.length > 0) {
            search(initialSearchList.pop(), parseIterate);
        } else {
            if (iterationCounter <= 10) {
                iterationCounter++;
                search(ingredients[getRandomInt(0, ingredients.length - 1)].title, parseIterate);
            } else {
                /*
                console.log(recipes);
                console.log(ingredients);
                console.log(ingredients_recipes);
                console.log(units);
                console.log(images);
                console.log(nutrients);
                console.log(nutrients_recipes);
                console.log(diets);
                console.log(globDiet);
                */
                
                createDBScript();
                Ext.Ajax.request({
                    url: '../photos.php',
                    params: {
                        images: JSON.stringify(images)
             
                    },
                    method: 'POST',
                    success: function(data) {
                        console.log("Downloading images...");
                        console.log(JSON.stringify(images));
                    },
                    failure: function(data) {
                        console.log("Oops!: " + data);
                    }
                });   
    
            }
        }
    }, 5000);
}

function createDBScript() {
    var LINE_BR = '\n';
    var TAB = '\t';
    var script = 'function putDBData(tx) {' + LINE_BR;
    
    script += TAB + "tx.executeSql('DROP TABLE IF EXISTS nutrients');" + LINE_BR +
                TAB + "tx.executeSql('CREATE TABLE nutrients (id INTEGER unique, title TEXT, quantityUnit TEXT)');" + LINE_BR + 
                LINE_BR + 
                TAB + "tx.executeSql('DROP TABLE IF EXISTS ingredients');" + LINE_BR + 
                TAB + "tx.executeSql('CREATE TABLE ingredients (id INTEGER unique, title TEXT)');" + LINE_BR + 
	            LINE_BR + 
	            TAB + "tx.executeSql('DROP TABLE IF EXISTS units');" + LINE_BR + 
                TAB + "tx.executeSql('CREATE TABLE units (id INTEGER, title TEXT)');" + LINE_BR + 
	            LINE_BR + 
                TAB + "tx.executeSql('DROP TABLE IF EXISTS recipes');" + LINE_BR + 
                TAB + "tx.executeSql('CREATE TABLE recipes (id INTEGER unique, title TEXT, diet INTEGER, servingSize REAL, servingUnit INTEGER, image TEXT, url TEXT)');" + LINE_BR + 
                LINE_BR + 
                TAB + "tx.executeSql('DROP TABLE IF EXISTS recipes_nutrients');" + LINE_BR + 
                TAB + "tx.executeSql('CREATE TABLE recipes_nutrients (recipeId INTEGER, nutrientId INTEGER, quantity REAL)');" + LINE_BR + 
	            LINE_BR + 
	            TAB + "tx.executeSql('DROP TABLE IF EXISTS ingredients_recipes');" + LINE_BR + 
                TAB + "tx.executeSql('CREATE TABLE ingredients_recipes (recipeId INTEGER, ingredientId INTEGER, weight REAL, weightUnit INTEGER, quantity REAL, quantityUnit INTEGER)');" + LINE_BR + 
	            LINE_BR + 
	            TAB + "tx.executeSql('DROP TABLE IF EXISTS plan');" + LINE_BR + 
                TAB + "tx.executeSql('CREATE TABLE plan (date TEXT, recipeId INTEGER, quantity REAL, meal INTEGER)');" + LINE_BR + LINE_BR;
    
    for (var i = 0; i < recipes.length; i++) {
        script += TAB + "tx.executeSql('" + 'INSERT INTO recipes (id, title, diet, servingSize, servingUnit, image, url) VALUES (' + 
                    recipes[i].id + ', "' + recipes[i].title + 
                    '", ' + recipes[i].diet + ', ' + recipes[i].servingSize + ', ' + recipes[i].servingUnit +
                    ', "' + recipes[i].image + '", "' + recipes[i].url + '")' + "');" + LINE_BR;
    }
    
    script += LINE_BR;
    
    for (var i = 0; i < nutrients.length; i++) {
        script += TAB + "tx.executeSql('" + 'INSERT INTO nutrients (id, title, quantityUnit) VALUES (' + 
                    nutrients[i].id + ', "' + nutrients[i].title + 
                    '", ' + nutrients[i].quantityUnit + ')' + "');" + LINE_BR;
    }
    
    script += LINE_BR;
    
    for (var i = 0; i < ingredients.length; i++) {
        script += TAB + "tx.executeSql('" + 'INSERT INTO ingredients (id, title) VALUES (' + 
                    ingredients[i].id + ', "' + ingredients[i].title + '")' + "');" + LINE_BR;
    }
    
    script += LINE_BR;
    
    for (var i = 0; i < units.length; i++) {
        script += TAB + "tx.executeSql('" + 'INSERT INTO units (id, title) VALUES (' + 
                    units[i].id + ', "' + units[i].title + '")' + "');" + LINE_BR;
    }
    
    script += LINE_BR;
    
    for (var i = 0; i < nutrients_recipes.length; i++) {
        script += TAB + "tx.executeSql('" + 'INSERT INTO recipes_nutrients (recipeId, nutrientId, quantity) VALUES (' + 
                    nutrients_recipes[i].recipeId + ', ' + nutrients_recipes[i].nutrientId +
                    ', ' + nutrients_recipes[i].quantity + ')' + "');" + LINE_BR;
    }
    
    script += LINE_BR;
    
    for (var i = 0; i < ingredients_recipes.length; i++) {
        script += TAB + "tx.executeSql('" + 'INSERT INTO ingredients_recipes (recipeId, ingredientId, weight, weightUnit, quantity, quantityUnit) VALUES (' + 
                    ingredients_recipes[i].recipeId + ', ' + ingredients_recipes[i].ingredientId +
                    ', ' + ingredients_recipes[i].weight + ', ' + ingredients_recipes[i].weightUnit +
                    ', ' + ingredients_recipes[i].quantity + ', ' + ingredients_recipes[i].quantityUnit + ')' + "');" + LINE_BR;
    }

    script += '}'
    
    console.log(script);
    document.getElementById('script-out').innerHTML = script;
}
    
function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function parseApi(data) {
    //console.log(data);
    //console.log(diets);
    
    for (var i = 0; i < data.length; i++) {
        if (searchRecipe(data[i].label))
            continue;
            
        images.push(data[i].image);    
            
        recipes.push(new Recipe(recipes.length + 1, 
                        data[i].label, 
                        calculateDietMask(data[i].dietLabels) | calculateDietMask(data[i].healthLabels), 
                        data[i].totalWeight/data[i].yield,
                        1,
                        -1,
                        -1,
                        data[i].image.split("/").pop(),
                        data[i].url,
                        []));
                        
        globDiet = globDiet | recipes[recipes.length - 1].diet;
                        
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
            
            ingredients_recipes.push(new IngredientRecipe(recipes.length, 
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
            nutrients_recipes.push(new NutrientRecipe(recipes.length,
                                    searchNutrient(nutrient.label),
                                    nutrient.quantity/data[i].yield));
            }
          
        /*  
        for (var j = 0; j < data[i].dietLabels.length; j++) {
            addDiet(data[i].dietLabels[j]);
        }
        
        for (var j = 0; j < data[i].healthLabels.length; j++) {
            addAllergie(data[i].healthLabels[j]);
        }
        */
    }
    
    //console.log(recipes);
    //console.log(ingredients);
    //console.log(ingredients_recipes);
    //console.log(units);
    //console.log(images);
    //console.log(nutrients);
    //console.log(nutrients_recipes);
    //console.log(diets);
    //console.log(allergies);
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

function getDietMask(name) {
    for (var i = 0; i < diets.length; i++) {
        if (diets[i].apiTitle == name.toLowerCase())
            return diets[i].mask;
    }
    
    return 0;
}

function calculateDietMask(list) {
    var mask = 0;
    for (var i = 0; i < list.length; i++) {
        mask = mask | getDietMask(list[i]);
    }
    
    return mask;
}

/*
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
*/

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}