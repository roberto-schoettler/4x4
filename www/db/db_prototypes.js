function Recipe(id, title, type, servingSize, servingUnit, quantity, meal, nutrients) {
    this.id = id;
    this.title = title;
    this.type = type;
	this.servingSize = servingSize;
	this.servingUnit = servingUnit;
	this.quantity = quantity;
	this.meal = meal;
	this.nutrients = nutrients;
}

function Nutrient(id, title, quantity, quantityUnit) {
	this.id = id;
    this.title = title;
	this.quantity = quantity;
	this.quantityUnit = quantityUnit;
}

function Ingredient(id, title, quantity, quantityUnit) {
    this.id = id;
    this.title = title;
	this.quantity = quantity;
	this.quantityUnit = quantityUnit;
}