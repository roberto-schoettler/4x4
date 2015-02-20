Ext.define('Nutrilicious.screens.ShoppingList', {
    extend: 'Ext.Panel',
    
    config: {
		width: '80%',
		height: '80%',
		centered: true,
		modal: true,
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
		hideOnMaskTap: true,
		padding: 20,
		scrollable: true,
		defaults: {
			labelAlign: 'top'
		},
		items: [{
			xtype: 'toolbar',
			docked: 'top',
			title: 'Shopping List',
			margin: 0
		}, {
			xtype: 'datepickerfield',
			id: 'dateFromSL',
			label: 'From',
			value: new Date(),
			listeners: {
				change: function (startDate) {
					var endDate = Ext.getCmp('dateToSL');
					
					if (!startDate || !endDate)
						return;
					
					// Check if this value is greater than the end date...
					if (startDate.getValue() > endDate.getValue()) {
						endDate.setValue(startDate.getValue());
					}
					
					updateShoppingList();
				}
			}
		}, {
			xtype: 'datepickerfield',
			id: 'dateToSL',
			label: 'To',
			value: new Date(),
			listeners: {
				change: function (endDate) {
					var startDate = Ext.getCmp('dateFromSL');
					
					if (!startDate || !endDate)
						return;
					
					// Check if this value is smaller than the start date...
					if (endDate.getValue() < startDate.getValue()) {
						endDate.setValue(startDate.getValue());
					}
					
					updateShoppingList();
				},
				initialize: function (field) {
					var d = new Date();
					d.setDate(d.getDate() + 7);
					field.setValue(d);
				}
			}
		}, {
			id: 'shoppingListContainer',
			listeners: {
				initialize: updateShoppingList
			}
		}]
	}
});

function updateShoppingList() {
	var startDate = Ext.getCmp('dateFromSL');
	var endDate = Ext.getCmp('dateToSL');
	
	getIngredientsByDate(formatDate(startDate.getValue()), formatDate(endDate.getValue()), function (result) {
		var ingredients = '<hr><h1>List</h1>';
		
		if (result.length > 0) {
			ingredients += '<ul class="ingredients-list">';
			for (var i = 0; i < result.length; i++) {						
				try {
					var weight = Math.round(parseFloat(result[i].weight));
					if (weight == 0)
						continue;
						
					ingredients += '<li>' + result[i].title + ' - ' + weight + ' ' + result[i].weightUnit + '</li>';
				} catch (ex) {}
			}
				
			ingredients += '</ul>';
		}
		else {
			ingredients += '<br><p style="font-size: .8em;">You don\'t have any ingredients on your shopping list!</p>';
		}
		
		Ext.getCmp('shoppingListContainer').setHtml(ingredients);
	});
}