Ext.define('Nutrilicious.stores.Nutrients', {
    extend: 'Ext.data.Store',
    
    config: {
		model: 'Nutrilicious.models.NutrientChart'
	},
	loadData: function () {
		var data = [{
			'name': 'Carbs',
			'value': 100 * Math.random()
		}, {
			'name': 'Fats',
			'value': 100 * Math.random()
		}, {
			'name': 'Fibers',
			'value': 100 * Math.random()
		}, {
			'name': 'Minerals',
			'value': 100 * Math.random()
		}, {
			'name': 'Proteins',
			'value': 100 * Math.random()
		}, {
			'name': 'Vitamins',
			'value': 100 * Math.random()
		}, {
			'name': 'Calories',
			'value': 100 * Math.random()
		}];
		
		this.setData(data);
	}
});