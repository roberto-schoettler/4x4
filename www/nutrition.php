<?php 
	function getNutrition($recipe){
		$curl = curl_init('https://api.edamam.com/api/nutrition-details?app_id=4028f699&app_key=44e17ab66584a674d971a63a71508e60');
	
	 	curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");  
	  	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
		curl_setopt($curl, CURLOPT_POSTFIELDS, $recipe);
	 	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1); 

	  	$result = curl_exec($curl);
	 	curl_close($curl);  // Seems like good practice
	 	return $result;

	}

	$json = $_POST['jsondata'];
	//$json = '{"title":"Fresh Ham Roasted With Rye Bread and Dried Fruit Stuffing","prep":"1. Have your butcher bone and butterfly the ham and score the fat in a diamond pattern. ...","yield":"About 15 servings","ingr":["1 fresh ham, about 18 pounds, prepared by your butcher (See Step 1)","7 cloves garlic, minced","1 tablespoon caraway seeds, crushed","4 teaspoons salt","Freshly ground pepper to taste","1 teaspoon olive oil","1 medium onion, peeled and chopped","3 cups sourdough rye bread, cut into 1/2-inch cubes","1 1/4 cups coarsely chopped pitted prunes","1 1/4 cups coarsely chopped dried apricots","1 large tart apple, peeled, cored and cut into 1/2-inch cubes","2 teaspoons chopped fresh rosemary","1 egg, lightly beaten","1 cup chicken broth, homemade or low-sodium canned"]}';
 	var_dump(getNutrition($json));
 ?>