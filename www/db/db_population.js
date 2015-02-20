function populateDB(tx) {
	tx.executeSql('DROP TABLE IF EXISTS nutrients');
	tx.executeSql('CREATE TABLE nutrients (id INTEGER unique, title TEXT, quantityUnit TEXT)');
	tx.executeSql('INSERT INTO nutrients (id, title, quantityUnit) VALUES (1, "Fat", 1)');
	tx.executeSql('INSERT INTO nutrients (id, title, quantityUnit) VALUES (2, "Cholesterol", 2)');
	
	tx.executeSql('DROP TABLE IF EXISTS ingredients');
	tx.executeSql('CREATE TABLE ingredients (id INTEGER unique, title TEXT)');
	tx.executeSql('INSERT INTO ingredients (id, title) VALUES (1, "Carrot")');
	tx.executeSql('INSERT INTO ingredients (id, title) VALUES (2, "Potato")');
	tx.executeSql('INSERT INTO ingredients (id, title) VALUES (3, "Butter")');
	
	tx.executeSql('DROP TABLE IF EXISTS units');
	tx.executeSql('CREATE TABLE units (id INTEGER, title TEXT)');
	tx.executeSql('INSERT INTO units (id, title) VALUES (1, "mg")');
	tx.executeSql('INSERT INTO units (id, title) VALUES (2, "g")');
	tx.executeSql('INSERT INTO units (id, title) VALUES (3, "ml")');
	tx.executeSql('INSERT INTO units (id, title) VALUES (4, "l")');
	
	tx.executeSql('DROP TABLE IF EXISTS recipes');
	tx.executeSql('CREATE TABLE recipes (id INTEGER unique, title TEXT, diet INTEGER, servingSize REAL, servingUnit INTEGER, image TEXT, url TEXT)');
	tx.executeSql('INSERT INTO recipes (id, title, diet, servingSize, servingUnit, image, url) VALUES (1, "Mashed potato", 3, 200, 2, "1.jpg", "google.com")');
	tx.executeSql('INSERT INTO recipes (id, title, diet, servingSize, servingUnit, image, url) VALUES (2, "Carrots salad", 4, 100, 2, "2.jpg", "facebook.com")');
	
	tx.executeSql('DROP TABLE IF EXISTS recipes_nutrients');
	tx.executeSql('CREATE TABLE recipes_nutrients (recipeId INTEGER, nutrientId INTEGER, quantity REAL)');
	tx.executeSql('INSERT INTO recipes_nutrients (recipeId, nutrientId, quantity) VALUES (1, 1, 8.5)');
	tx.executeSql('INSERT INTO recipes_nutrients (recipeId, nutrientId, quantity) VALUES (1, 2, 150)');
	tx.executeSql('INSERT INTO recipes_nutrients (recipeId, nutrientId, quantity) VALUES (2, 2, 80)');
	
	tx.executeSql('DROP TABLE IF EXISTS ingredients_recipes');
	tx.executeSql('CREATE TABLE ingredients_recipes (recipeId INTEGER, ingredientId INTEGER, weight REAL, weightUnit INTEGER, quantity REAL, quantityUnit INTEGER)');
	tx.executeSql('INSERT INTO ingredients_recipes (recipeId, ingredientId, weight, weightUnit, quantity, quantityUnit) VALUES (1, 2, 100, 2, 3, 3)');
	tx.executeSql('INSERT INTO ingredients_recipes (recipeId, ingredientId, weight, weightUnit, quantity, quantityUnit) VALUES (1, 3, 10, 2, 1, 4)');
	tx.executeSql('INSERT INTO ingredients_recipes (recipeId, ingredientId, weight, weightUnit, quantity, quantityUnit) VALUES (2, 1, 200, 2, 200, 2)');
	
	tx.executeSql('DROP TABLE IF EXISTS plan');
	tx.executeSql('CREATE TABLE plan (date TEXT, recipeId INTEGER, quantity REAL, meal INTEGER)');
	tx.executeSql('INSERT INTO plan (date, recipeId, quantity, meal) VALUES ("2015-02-20", 1, 1, 1)');
	tx.executeSql('INSERT INTO plan (date, recipeId, quantity, meal) VALUES ("2015-02-21", 2, 1, 2)');
}

function populateDBError(err) {
	alert("Error processing SQL: " + err.message);
}

function populateDBSuccess() {
	//alert("success!");
}

/*
	tx.executeSql('DROP TABLE IF EXISTS ingredients_nutrients');
	tx.executeSql('CREATE TABLE ingredients_nutrients (ingredientId INTEGER, nutrientId INTEGER, quantity REAL)');
	tx.executeSql('INSERT INTO ingredients_nutrients (ingredientId, nutrientId, quantity) VALUES (1, 2, 0.5)');
	tx.executeSql('INSERT INTO ingredients_nutrients (ingredientId, nutrientId, quantity) VALUES (2, 2, 0.8)');
	tx.executeSql('INSERT INTO ingredients_nutrients (ingredientId, nutrientId, quantity) VALUES (3, 1, 0.8)');
	tx.executeSql('INSERT INTO ingredients_nutrients (ingredientId, nutrientId, quantity) VALUES (3, 2, 0.1)');
	*/