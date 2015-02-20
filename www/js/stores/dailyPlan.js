Ext.define('Nutrilicious.stores.DailyPlan', {
    extend: 'Ext.data.Store',
    
    config: {
		model: 'Nutrilicious.models.DailyPlanRecipe',
		sorters: ['meal', 'title'],
		grouper: {
			groupFn: function(record) {
				var meal = record.get('meal');
				if (meal == 0)
					return 'Breakfast';
				else if (meal == 1)
					return 'Lunch';
				else if (meal == 2)
					return 'Snack';
				else if (meal == 3)
					return 'Dinner';
			}
		}
	},
	
	update: function() {
		var me = this;
		var date = formatDate(Ext.getCmp('datepicker').getValue());
		getRecipesListByDate(date, date, function (result) {
			me.setData(result);
			
			var dp = Ext.getCmp('DailyPlanScreen').down('list');
			if (result.length > 0)
				dp.show();
			else
				dp.hide();
		});
	}
});