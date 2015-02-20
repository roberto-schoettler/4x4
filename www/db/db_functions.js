function queryDBSuccess(tx, results) {
    var len = results.rows.length;
    console.log("DEMO table: " + len + " rows found.");
    
	var content = "";
	for (var i = 0; i < len; i++) {
        content = content + "<tr>";
		content = content + "<td>" + results.rows.item(i).id + "</td><td>" + results.rows.item(i).data + "</td>";
		console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
		content = content + "</tr>";
    }
	
	document.getElementById("data-table").innerHTML = content;
}

// Transaction error callback
function queryDBError(err) {
   // console.log("Error processing SQL: "+err.code);
   //alert("Error processing SQL: " + err.message);
   console.log("Error processing SQL: " + err.message);
}

function getRecipesList(mask, titleFilter, callback) {
	var result = [];
	
	db.transaction(function(tx) {
		tx.executeSql('SELECT r.id, r.title, r.diet, r.servingSize, r.image, r.url, u.title AS utitle FROM recipes r, units u ' +
						'WHERE r.servingUnit = u.id AND ((r.diet & ?) == ?) AND r.title LIKE ?', [mask, mask, '%' + titleFilter + '%'], function(tx, results) {
			var len = results.rows.length;
			    
			for (var i = 0; i < len; i++) {
				var item = results.rows.item(i);
				result[i] = new Recipe(item.id, item.title, item.diet, item.servingSize, item.utitle, 0, 0, item.image, item.url, null);
			}
						
			callback(result);
			}, queryDBError); }, queryDBError);
}

function getRecipesListByDate(startDate, endDate, callback) {
	var result = [];
	
	db.transaction(function(tx) {
		tx.executeSql('SELECT r.id, r.title, r.diet, r.servingSize, r.image, r.url, u.title AS utitle, p.quantity, p.meal FROM recipes r, plan p, units u ' +
						'WHERE r.id = p.recipeId AND r.servingUnit = u.id AND p.date BETWEEN ? AND ?', [startDate, endDate], function(tx, results) {
			var len = results.rows.length;
			    
			for (var i = 0; i < len; i++) {
				var item = results.rows.item(i);
				result[i] = new Recipe(item.id, item.title, item.diet, item.servingSize, item.utitle, item.quantity, item.meal, item.image, item.url, null);
			}
						
			callback(result);
			}, queryDBError); }, queryDBError);
}

function getRecipeInfo(id, callback) {
	var result = [];
	
	db.transaction(function(tx) {
		tx.executeSql('SELECT r.id, r.title, r.diet, r.servingSize, r.image, r.url, u.title AS utitle FROM recipes r, units u ' +
						'WHERE r.servingUnit = u.id AND r.id = ?', [id], function(tx, results) {
			var len = results.rows.length;
			    
			for (var i = 0; i < len; i++) {
				var item = results.rows.item(i);
				result[i] = new Recipe(item.id, item.title, item.diet, item.servingSize, item.utitle, 0, 0, item.image, item.url, null);
			}
						
			callback(result);
			}, queryDBError); }, queryDBError);
}

function getRecipeIngredients(recipeId, callback) {
	var result = [];
	
	db.transaction(function(tx) {
		tx.executeSql('SELECT i.id AS iid, i.title AS ititle, ir.weight, ir.quantity AS iquantity, u.title AS utitle ' +
						'FROM ingredients i, ingredients_recipes ir, units u ' +
						'WHERE i.id = ir.ingredientId AND ir.quantityUnit = u.id AND ir.recipeId = ? ' +
						'ORDER BY ititle', [recipeId], function(tx, results) {
			var len = results.rows.length;
			
			for (var i = 0; i < len; i++) {
				var item = results.rows.item(i);
				
				result[i] = new Ingredient(item.iid, item.ititle, item.weight, 'g', item.iquantity, item.utitle);
			}
						
			callback(result);
			
			}, queryDBError); }, queryDBError);
}

function getRecipeNutrients(recipeId, callback) {
	var result = [];
	
	db.transaction(function(tx) {
		tx.executeSql('SELECT n.id, n.title AS ntitle, rn.quantity, u.title AS utitle ' +
						'FROM recipes_nutrients rn, nutrients n, recipes r, units u ' +
						'WHERE r.id = ? AND r.id = rn.recipeId AND rn.nutrientId = n.id AND n.quantityUnit = u.id', [recipeId], function(tx, results) {
			var len = results.rows.length;
						
			for (var i = 0; i < len; i++) {
				var item = results.rows.item(i);
				
				result.push(new Nutrient(item.id, item.ntitle, item.quantity, item.utitle));
			}
						
			callback(result);
			
			}, queryDBError); }, queryDBError);
}

function getNutrientsByDate(date, callback) {
	var result = [];
	
	db.transaction(function(tx) {
		tx.executeSql('SELECT n.id, n.title, rn.quantity, u.title AS utitle ' +
						'FROM recipes_nutrients rn, nutrients n, plan p, recipes r, units u ' +
						'WHERE p.date = ? AND p.recipeId = r.id AND r.id = rn.recipeId ' +
						'AND rn.nutrientId = n.id AND n.quantityUnit = u.id', [date], function(tx, results) {
			var len = results.rows.length;
						
			for (var i = 0; i < len; i++) {
				var item = results.rows.item(i);
				
				if (result[item.id-1] == undefined) {
					result[item.id-1] = new Nutrient(item.id, item.title, item.quantity, item.utitle);
				} else {
					result[item.id-1].quantity += item.quantity;
				}
			}
						
			callback(result);
			
			}, queryDBError); }, queryDBError);
}

function addRecipeToPlan(recipeId, quantity, meal, date, callback) {
	db.transaction(function(tx) {
		tx.executeSql('INSERT INTO plan (date, recipeId, quantity, meal) VALUES (?, ?, ?, ?)', [date, recipeId, quantity, meal], 
			function(tx, results) { callback() }, queryDBError); }, queryDBError);
}

function removeRecipeFromPlan(recipeId, date, callback) {
	db.transaction(function(tx) {
		tx.executeSql('DELETE FROM plan WHERE recipeId = ? AND date = ?', [recipeId, date], 
			function(tx, results) { callback() }, queryDBError); }, queryDBError);
}

function getIngredientsByDate(startDate, endDate, callback) {
	var result = [];
	
	db.transaction(function(tx) {
		tx.executeSql('SELECT i.id, i.title AS ititle, ir.weight, u.title AS utitle, p.quantity ' +
						'FROM ingredients i, ingredients_recipes ir, units u, plan p ' +
						'WHERE i.id = ir.ingredientId AND ir.weightUnit = u.id AND ir.recipeId = p.recipeId AND p.date BETWEEN ? AND ? ' +
						'ORDER BY ititle', [startDate, endDate], function(tx, results) {
			var len = results.rows.length;
			
			for (var i = 0; i < len; i++) {
				var item = results.rows.item(i);
				
				id = getIngredientPos(result, item.id);
				if (id == -1)
					result[i] = new Ingredient(item.id, item.ititle, item.weight * item.quantity, item.utitle, 0, 0);
				else
					result[id].weight += item.weight * item.quantity;
			}
						
			callback(result);
			}, queryDBError); }, queryDBError);
}

function getIngredientPos(list, ingredientId) {
	for (var i = 0; i < list.length; i++) {
		if (list[i].id == ingredientId)
				return i;
	}
	
	return -1;
}

/*
function getRecipeIngredients(recipeId, callback) {
	var result = [];
	
	db.transaction(function(tx) {
		tx.executeSql('SELECT i.id AS iid, i.title AS ititle, ir.quantity AS iquantity, u.title AS utitle ' +
						'FROM ingredients i, ingredients_recipes ir, units u ' +
						'WHERE i.id = ir.ingredientId AND ir.quantityUnit = u.id AND ir.recipeId = ? ' +
						'ORDER BY ititle', [recipeId], function(tx, results) {
			var len = results.rows.length;
			var currentIngredient = 0;
			for (var i = 0; i < len; i++) {
				var item = results.rows.item(i);
				var nutrient = new Nutrient(item.nid, item.ntitle, item.nquantity);
				
				if (item.iid != currentIngredient) {
					currentIngredient = item.iid;
					result[result.length] = new Ingredient(item.iid, item.ititle, item.iquantity, [nutrient]);
				} else {
					result[result.length-1].nutrients[result[result.length-1].nutrients.length] = nutrient;
				}
			}
						
			callback(result);
			
			}, queryDBError); }, queryDBError);
}

function getNutrientsByDate(date, callback) {
	var result = [];
	
	db.transaction(function(tx) {
		tx.executeSql('SELECT n.id AS nid, n.title AS ntitle, inn.quantity AS nquantity, ir.quantity AS iquantity ' +
						'FROM ingredients i, ingredients_nutrients inn, nutrients n, ingredients_recipes ir, plan p, recipes r ' +
						'WHERE p.date = ? AND p.recipeId = r.id AND r.id = ir.recipeId AND ir.ingredientId = i.id ' +
						'AND i.id = inn.ingredientId AND n.id = inn.nutrientId', [date], function(tx, results) {
			var len = results.rows.length;
			console.log(len);
			
			for (var i = 0; i < len; i++) {
				var item = results.rows.item(i);
				
				if (result[item.nid] == undefined) {
					result[item.nid] = new Nutrient(item.nid, item.ntitle, item.nquantity * item.iquantity);
				} else {
					result[item.nid].quantity = result[item.nid].quantity + item.nquantity * item.iquantity;
				}
			}
						
			callback(result);
			
			}, queryDBError); }, queryDBError);
}
*/