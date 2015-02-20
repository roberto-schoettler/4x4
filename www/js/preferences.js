function setDiet(name, value) {
    localStorage.setItem(name, value);
}

function getDiet(name) {
    return localStorage.getItem(name);
}

var pref_diets = [
    new Diet("High Protein", "high-protein",        parseInt('00000000000000000000000000000001', 2)),
    new Diet("Low Carb", "low-carb",                parseInt('00000000000000000000000000000010', 2)),
    new Diet("Low Fat", "low-fat",                  parseInt('00000000000000000000000000000100', 2)),
    new Diet("Balanced", "balanced",                parseInt('00000000000000000000000000001000', 2)),
    new Diet("High Fiber", "high-fiber",            parseInt('00000000000000000000000000010000', 2)),
    new Diet("Low Sodium", "low-sodium",            parseInt('00000000000000000000000000100000', 2)),
    new Diet("No Sugar", "no-sugar",                parseInt('00000000000000000000000001000000', 2)),
    new Diet("Sugar-conscious", "sugar-conscious",  parseInt('00000000000000000000000010000000', 2)),
    new Diet("Vegetarian", "vegetarian",            parseInt('00000000000000000000000100000000', 2)),
    new Diet("Vegan", "vegan",                      parseInt('00000000000000000000001000000000', 2)),
    new Diet("Paleo", "paleo",                      parseInt('00000000000000000000010000000000', 2)),
    new Diet("Gluten Free", "gluten-free",          parseInt('00000000000000000000100000000000', 2)),
    new Diet("Wheat Free", "wheat-free",            parseInt('00000000000000000001000000000000', 2)),
    new Diet("Dairy", "dairy-free",                 parseInt('00000000000000000010000000000000', 2)),
    new Diet("Eggs", "eggs-free",                   parseInt('00000000000000000100000000000000', 2)),
    new Diet("Soy", "soy-free",                     parseInt('00000000000000001000000000000000', 2)),
    new Diet("Fish", "fish-free",                   parseInt('00000000000000010000000000000000', 2)),
    new Diet("Shellfish", "shellfish-free",         parseInt('00000000000000100000000000000000', 2)),
    new Diet("Tree Nuts", "treenut-free",           parseInt('00000000000001000000000000000000', 2)),
    new Diet("Low Potassium", "low-potassium",      parseInt('00000000000010000000000000000000', 2)),
    new Diet("Alcohol Free", "alcohol-free",        parseInt('00000000000100000000000000000000', 2)),
    new Diet("Kidney Friendly", "kidney-friendly",  parseInt('00000000001000000000000000000000', 2)),
    new Diet("Peanuts", "peanut-free",              parseInt('00000000010000000000000000000000', 2))];

function getPreferencesDietMask(name) {
    for (var i = 0; i < pref_diets.length; i++) {
        if (pref_diets[i].apiTitle == name.toLowerCase())
            return pref_diets[i].mask;
    }
    
    return 0;
}

function calculatePreferencesDietMask() {
    var mask = 0;
    for (var i = 0; i < pref_diets.length; i++) {
        if (parseInt(getDiet(pref_diets[i].apiTitle)))
            mask = mask | getPreferencesDietMask(pref_diets[i].apiTitle);
    }
    
    return mask;
}

function getPreferences(){
    var preferences = {
        birthday : localStorage.getItem("birthday"),
        heightFeet : localStorage.getItem("heightFeet"),
        heightInches : localStorage.getItem("heightInches"),
        weight : localStorage.getItem("weight"),
        gender : localStorage.getItem("gender")
    };
    
    return preferences;
}

function setPreferences(preferences){
    localStorage.setItem("birthday", preferences.birthday);
    localStorage.setItem("heightFeet", preferences.heightFeet);
    localStorage.setItem("heightInches", preferences.heightInches);
    localStorage.setItem("weight", preferences.weight);
    localStorage.setItem("gender", preferences.gender);
}

function calculateAge(birthday){
    var date = Date.now();
    var ageDate = new Date(date - new Date(birthday));
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function calculatePercentage(nutrients) {
    var result = [];
    var preferences = getPreferences();
    var age = calculateAge(preferences.birthday);
    
    var vitA = (getNutrientFromList(nutrients, "Vitamin A") ? getNutrientFromList(nutrients, "Vitamin A").quantity : 0)/vA(age).quantity ;
    var vitB6 = (getNutrientFromList(nutrients, "Vitamin B6") ? getNutrientFromList(nutrients, "Vitamin B6").quantity : 0)/vB6(age).quantity;
    var vitB12 = (getNutrientFromList(nutrients, "Vitamin B12") ? getNutrientFromList(nutrients, "Vitamin B12").quantity : 0)/vB12(age).quantity;
    var vitC = (getNutrientFromList(nutrients, "Vitamin C") ? getNutrientFromList(nutrients, "Vitamin C").quantity : 0)/vC(age).quantity;
    var vitD = (getNutrientFromList(nutrients, "Vitamin D") ? getNutrientFromList(nutrients, "Vitamin D").quantity : 0)/vD(age).quantity;
    var vitE = (getNutrientFromList(nutrients, "Vitamin E") ? getNutrientFromList(nutrients, "Vitamin E").quantity : 0)/vE(age).quantity;
    var vitamins = (vitA + vitB6 + vitB12 + vitC + vitD + vitE) / 6 * 100;
    
    var ca = (getNutrientFromList(nutrients, "Calcium") ? getNutrientFromList(nutrients, "Calcium").quantity : 0)/calcium(age).quantity;
    var mg = (getNutrientFromList(nutrients, "Magnesium") ? getNutrientFromList(nutrients, "Magnesium").quantity : 0)/magnesium(age).quantity;
    var fe = (getNutrientFromList(nutrients, "Iron") ? getNutrientFromList(nutrients, "Iron").quantity : 0)/iron(age).quantity;
    var zn = (getNutrientFromList(nutrients, "Zinc") ? getNutrientFromList(nutrients, "Zinc").quantity : 0)/zinc(age).quantity;
    var minerals = (ca + mg + fe + zn) / 4 * 100;
    
    result.push({name: "Fat", value: Math.round((getNutrientFromList(nutrients, "Fat") ? getNutrientFromList(nutrients, "Fat").quantity : 0)/fat(age).quantity * 100)});
    result.push({name: "Carbohydrates", value: Math.round((getNutrientFromList(nutrients, "Carbs") ? getNutrientFromList(nutrients, "Carbs").quantity : 0)/carbs(age).quantity * 100)});
    result.push({name: "Fiber", value: Math.round((getNutrientFromList(nutrients, "Fiber") ? getNutrientFromList(nutrients, "Fiber").quantity : 0)/fiber(age).quantity * 100)});
    result.push({name: "Protein", value: Math.round((getNutrientFromList(nutrients, "Protein") ? getNutrientFromList(nutrients, "Protein").quantity : 0)/protein(age).quantity * 100)});
    result.push({name: "Calories", value: Math.round((getNutrientFromList(nutrients, "Energy") ? getNutrientFromList(nutrients, "Energy").quantity : 0)/calories(age).quantity * 100)});
    result.push({name: "Vitamins", value: vitamins});
    result.push({name: "Minerals", value: minerals});
    
    return result;
}

function getNutrientFromList(nutrients, title) {
    for (var i = 0; i < nutrients.length; i++) {
        if (nutrients[i].title == title) 
            return nutrients[i];
    }
}

function calculateDailyNeeds(){
    var preferences = getPreferences();
    var age = calculateAge(preferences.birthday);
    
    var dailyNeeds = [];
    
    dailyNeeds.push(vA(age));
    dailyNeeds.push(vB6(age));
    dailyNeeds.push(vB12(age));
    dailyNeeds.push(vC(age));
    dailyNeeds.push(vD(age));
    dailyNeeds.push(vE(age));
    dailyNeeds.push(calories(age));
    dailyNeeds.push(carbs(age));
    dailyNeeds.push(fat(age));
    dailyNeeds.push(fiber(age));
    dailyNeeds.push(protein(age));
    dailyNeeds.push(calcium(age));
    dailyNeeds.push(magnesium(age));
    dailyNeeds.push(iron(age));
    dailyNeeds.push(zinc(age));

    return dailyNeeds;
}

function vA(age){
    var quantity;
    
    if (age == 0)
        quantity = 400;
        
    else if (0 < age <= 3)
        quantity = 300;
        
    else if (3 < age <= 8)
        quantity = 400;
        
    else if (8 < age <= 13)
        quantity = 600;
        
    else if (13 < age <= 18)
        quantity = 800;
        
    else if (18 < age <= 50)
        quantity = 800;
        
    else (age > 50)
        quantity = 800;
        
    return {
        name : "Vitamin A",
        quantity : quantity,
        quantityUnit : "µg"
    };
}

function vB6(age){
    var quantity;
    
    if (age == 0)
        quantity = 0.1;
        
    else if (0 < age <= 3)
        quantity = 0.5;
        
    else if (3 < age <= 8)
        quantity = 0.6;
        
    else if (8 < age <= 13)
        quantity = 1.0;
        
    else if (13 < age <= 18)
        quantity = 1.3;
        
    else if (18 < age <= 50)
        quantity = 1.3;
        
    else (age > 50)
        quantity = 1.7;

    return {
        name : "Vitamin B6",
        quantity : quantity,
        quantityUnit : "mg"
    };
}

function vB12(age){
    var quantity;
    
    if (age == 0)
        quantity = 0.4;
        
    else if (0 < age <= 3)
        quantity = 0.9;
        
    else if (3 < age <= 8)
        quantity = 1.2;
        
    else if (8 < age <= 13)
        quantity = 1.8;

    else (age > 13)
        quantity = 2.4;
        
    return {
        name : "Vitamin B12",
        quantity : quantity,
        quantityUnit : "µg"
    };
}

function vC(age){
    var quantity;
    
    if (age == 0)
        quantity = 50;
        
    else if (0 < age <= 3)
        quantity = 15;
        
    else if (3 < age <= 8)
        quantity = 25;
        
    else if (8 < age <= 13)
        quantity = 45;
        
    else if (13 < age <= 18)
        quantity = 75;

    else (age > 18)
        quantity = 90;
        
    return {
        name : "Vitamin C",
        quantity : quantity,
        quantityUnit : "mg"
    };
}

function vD(age){
    var quantity;
    
    if (age == 0)
        quantity = 10;
        
    else if (0 < age <= 13)
        quantity = 15;

    else if (8 < age <= 13)
        quantity = 15;
        
    else if (13 < age <= 18)
        quantity = 15;
        
    else if (18 < age <= 50)
        quantity = 15;
        
    else if (50 > age < 70)
        quantity = 15;
        
    else if (age > 70)
        quantity = 20;
        
    return {
        name : "Vitamin D",
        quantity : quantity,
        quantityUnit : "µg"
    };
}

function vE(age){
    var quantity;
    
    if (age == 0)
        quantity = 4;
        
    else if (0 < age <= 3)
        quantity = 6;
        
    else if (3 < age <= 8)
        quantity = 7;
        
    else if (8 < age <= 13)
        quantity = 11;
        
    else (age > 13)
        quantity = 15;
        
    return {
        name : "Vitamin E",
        quantity : quantity,
        quantityUnit : "mg"
    };
}

function calories(age){
    var quantity;
    
    if (age < 2)
        quantity = 1200;
        
    else if (2 <= age <= 3)
        quantity = 1350;
        
    else if (4 <= age <= 5)
        quantity = 1450;
        
    else if (6 <= age <= 7)
        quantity = 1600;
     
    else if (8 <= age <= 9)
        quantity = 1750;
        
    else if (10 <= age <= 11)
        quantity = 2000;
        
    else if (12 <= age <= 13)
        quantity = 2250;
        
    else if (14 <= age <= 16)
        quantity = 2700;
        
    else if (17 <= age <= 18)
        quantity = 2900;

    else if (19 <= age <= 30)
        quantity = 2700;
        
    else if (31 <= age <= 50)
        quantity = 2600;
    
    else if (51 <= age <= 70)
        quantity = 2350;
        
    else (age > 70)
        quantity = 2200;
        
    return {
        name : "Vitamin A",
        quantity : quantity,
        quantityUnit : "µg"
    };
}

function carbs(age){
    var quantity;
    
    if (age == 0)
        quantity = 60;

    else (age > 0)
        quantity = 130;
        
    return {
        name : "Carbohydrate",
        quantity : quantity,
        quantityUnit : "g"
    };
}

function fiber(age){
    var quantity;
    
    if (age == 0)
        quantity = 19;
        
    else if (0 < age <= 8)
        quantity = 25;
 
    else if (8 < age <= 13)
        quantity = 31;
        
    else if (13 < age <= 50)
        quantity = 38;
        
    else (age > 50)
        quantity = 30;
        
    return {
        name : "Fiber",
        quantity : quantity,
        quantityUnit : "g"
    };
}

function fat(age){
    var quantity;
    
    if (age == 0)
        quantity = 30;
        
    else if (0 < age <= 3)
        quantity = 40;
        
    else (age > 3)
        quantity = 35;
        
    return {
        name : "Fat",
        quantity : quantity,
        quantityUnit : "g"
    };
}

function protein(age){
    var quantity;
    
    if (age == 0)
        quantity = 11;
        
    else if (0 < age <= 3)
        quantity = 13;
        
    else if (3 < age <= 8)
        quantity = 20;
        
    else if (8 < age <= 13)
        quantity = 34;
        
    else if (13 < age <= 18)
        quantity = 52;

    else (age > 18)
        quantity = 56;
        
    return {
        name : "Protein",
        quantity : quantity,
        quantityUnit : "g"
    };
}

function calcium(age){
    var quantity;
    
    if (age == 0)
        quantity = 270;
        
    else if (0 < age <= 3)
        quantity = 500;
        
    else if (3 < age <= 8)
        quantity = 800;
        
    else if (8 < age <= 18)
        quantity = 1300;
        
    else if (18 < age <= 50)
        quantity = 1000;
        
    else (age > 50)
        quantity = 1200;
        
    return {
        name : "Calcium",
        quantity : quantity,
        quantityUnit : "mg"
    };
}

function magnesium(age){
    var quantity;
    
    if (age == 0)
        quantity = 75;
        
    else if (0 < age <= 3)
        quantity = 80;
        
    else if (3 < age <= 8)
        quantity = 130;
        
    else if (8 < age <= 13)
        quantity = 240;
        
    else if (13 < age <= 18)
        quantity = 410;
        
    else if (18 < age <= 30)
        quantity = 400;
        
    else (age > 30)
        quantity = 420;
        
    return {
        name : "Magnesium",
        quantity : quantity,
        quantityUnit : "mg"
    };
}

function iron(age){
    var quantity;
    
    if (age == 0)
        quantity = 11;
        
    else if (0 < age <= 3)
        quantity = 7;
        
    else if (3 < age <= 8)
        quantity = 10;
        
    else if (8 < age <= 13)
        quantity = 8;
        
    else if (13 < age <= 18)
        quantity = 11;
        
    else (age > 18)
        quantity = 8;
        
    return {
        name : "Iron",
        quantity : quantity,
        quantityUnit : "mg"
    };
}

function zinc(age){
    var quantity;
    
    if (age == 0)
        quantity = 2;
        
    else if (0 < age <= 3)
        quantity = 3;
        
    else if (3 < age <= 8)
        quantity = 5;
        
    else if (8 < age <= 13)
        quantity = 8;

    else (age > 13)
        quantity = 11;
        
    return {
        name : "Zinc",
        quantity : quantity,
        quantityUnit : "mg"
    };
}
