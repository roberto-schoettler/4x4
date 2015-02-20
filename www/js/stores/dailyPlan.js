Ext.define('Nutrilicious.stores.DailyPlan', {
    extend: 'Ext.data.Store',
    
    config: {
		model: 'Nutrilicious.models.DailyPlanRecipe',
		sorters: ['meal', 'item'],
		grouper: {
			groupFn: function(record) {
				return record.get('meal');
			}
		},
		data: [
			{item: 'Cookies', meal: 'Breakfast'},
			{item: 'Mashed Potatos', meal: 'Dinner'},
			{item: 'Meatballs', meal: 'Breakfast'},
			{item: 'Pasta Carbonara', meal: 'Lunch'},
			{item: 'Paçoca', meal: 'Snack'},
			{item: 'Curry', meal: 'Lunch'},
			{item: 'Borsch', meal: 'Dinner'}
		]
	}
});