function Recipe(id, title, type, servingSize, servingUnit, quantity, meal, image, url, nutrients) {
    this.id = id;
    this.title = title;
    this.type = type;
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

function IngredientRecipe(recepeId, ingredientId, weight, weightUnit, quantity, quantityUnit) {
	this.recepeId = recepeId;
	this.ingredientId = ingredientId;
    this.weight = weight;
    this.weightUnit = weightUnit;
	this.quantity = quantity;
	this.quantityUnit = quantityUnit;
}

function NutrientRecipe(recepeId, nutrientId, quantity) {
	this.recepeId = recepeId;
    this.nutrientId = nutrientId;
	this.quantity = quantity;
}

function Diet(title, apiTitle, mask) {
	this.title = title;
	this.apiTitle = apiTitle;
	this.mask = mask;
}