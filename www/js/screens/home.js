Ext.define('Nutrilicious.screens.Home', {
    extend: 'Ext.Panel',
    
    config: {
		layout: 'fit'
	},
	
	initialize: function () {
		this.add(Ext.create('Nutrilicious.charts.Nutrients', {
		    id: 'NutrientChart'
		}));
	}
});