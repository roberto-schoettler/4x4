function Recipe(id, title, diet, servingSize, servingUnit, quantity, meal, image, url, nutrients) {
    this.id = id;
    this.title = title;
    this.diet = diet;
	this.servingSize = servingSize;
	this.servingUnit = servingUnit;
	this.quantity = quantity;
	this.meal = meal;
	this.image = image;
	this.url = url;
	this.nutrients = nutrients;
}

function Nutrient(id, title, quantity, quantityUnit) {
	this.id = id;
    this.title = title;
	this.quantity = quantity;
	this.quantityUnit = quantityUnit;
}

function Ingredient(id, title, weight, weightUnit, quantity, quantityUnit) {
    this.id = id;
    this.title = title;
    this.weight = weight;
    this.weightUnit = weightUnit;
	this.quantity = quantity;
	this.quantityUnit = quantityUnit;
}

function Unit(id, title) {
	this.id = id;
	this.title = title;
}

function IngredientRecipe(recipeId, ingredientId, weight, weightUnit, quantity, quantityUnit) {
	this.recipeId = recipeId;
	this.ingredientId = ingredientId;
    this.weight = weight;
    this.weightUnit = weightUnit;
	this.quantity = quantity;
	this.quantityUnit = quantityUnit;
}

function NutrientRecipe(recipeId, nutrientId, quantity) {
	this.recipeId = recipeId;
    this.nutrientId = nutrientId;
	this.quantity = quantity;
}

function Diet(title, apiTitle, mask) {
	this.title = title;
	this.apiTitle = apiTitle;
	this.mask = mask;
}