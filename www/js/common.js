function formatDate (dp) {
	return dp.getFullYear() + '-' + (dp.getMonth() < 9 ? '0' : '') + (dp.getMonth() + 1) + '-' + dp.getDate();
}

function showRecipe (record) {
	getRecipeNutrients(record.data.id, function (result) {
		var nutrients = '<ul class="ingredients-list">';
			
		for (var i = 0; i < result.length; i++) {						
			try {
				var quantity = Math.round(parseFloat(result[i].quantity) * 1000) / 1000;
				nutrients += '<li>' + result[i].title + ' - ' + quantity + ' ' + result[i].quantityUnit + '</li>';
			} catch (ex) {}
		}
			
		nutrients += '</ul>';
	
		getRecipeIngredients(record.data.id, function (result) {
			var ingredients = '<ul class="ingredients-list">';
			
			for (var i = 0; i < result.length; i++) {
				try {
					var quantity = Math.round(parseFloat(result[i].quantity) * 1000) / 1000;
					ingredients += '<li>' + result[i].title + ' - ' + quantity + ' ' + result[i].quantityUnit + '</li>';
				} catch (ex) {}
			}
			
			ingredients += '</ul>';
		
			Ext.Viewport.add({
				xtype: 'panel',
				title: 'Choose',
				modal: true,
				width: '80%',
				height: '80%',
				hideOnMaskTap: true,
				showAnimation: {
					type: 'popIn',
					duration: 250,
					easing: 'ease-out'
				},
				hideAnimation: {
					type: 'popOut',
					duration: 250,
					easing: 'ease-out'
				},
				centered: true,
				scrollable: true,
				padding: 10,
				html: '<h1 style="text-align: center;">' + record.data.title + '</h1><div style="text-align: center;"><img style="max-width: 70%; margin: 5px 0;" src="cache/' + record.data.image + '"></div><h4>Serving Size: ' + Math.round(record.data.servingSize) + ' ' + record.data.servingUnit + '</h4><h4 style="margin-top: 15px;">Ingredients List:</h4>' + ingredients + '<h4 style="margin-top: 15px;">Nutrients List:</h4>' + nutrients + '<a href="' + record.data.url + '" style="font-size: .9em;">Cooking Instructions</a>',
				items: [{
					xtype : 'toolbar',
					docked: 'top',
					title: 'Recipe'
				}]
			});
		});	
	});				
}

function update() {
	Ext.getCmp('DailyPlanScreen').down('list').getStore().update();
	Ext.getCmp('HomeScreen').down('polar').getStore().update();
}