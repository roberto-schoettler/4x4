Ext.define('Nutrilicious.screens.Home', {
    extend: 'Ext.Panel',
    
    config: {
		layout: 'fit',
		items: [Ext.create('Nutrilicious.charts.Nutrients', {
		    id: 'NutrientChart'
		})]
	}
});