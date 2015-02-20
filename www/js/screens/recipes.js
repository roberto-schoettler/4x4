Ext.define('Nutrilicious.screens.Recipes', {
    extend: 'Ext.Panel',
    
    config: {
    	layout: 'vbox',
    	items: [{
    		xtype : 'toolbar',
    		docked: 'top',
    		items: [{
    			xtype: 'searchfield',
    			placeHolder: 'Search',
    			flex: 1,
    			listeners: {
    			    change: function (field, newValue) {
						var rs = Ext.getCmp('RecipesScreen');
						var list = rs.down('list');
						
						if (newValue.length > 0) {
							console.log(calculatePreferencesDietMask());
							getRecipesList(calculatePreferencesDietMask(), newValue, function(result) {
								console.log(result);
								var store = list.getStore();
								store.setData(result);
								
								var dp = Ext.getCmp('RecipesScreen').down('list');
								if (result.length > 0)
									dp.show();
								else
									dp.hide();
							});
						}
						else
							Ext.getCmp('RecipesScreen').down('list').hide();
    			    }
    			}
    		}]
    	}, {
			layout: 'fit',
			flex: 1,
			items: [{
				html: '<span class="empty-list">No recipes found!</span>',
				padding: 20
			}, {
				xtype: 'list',
				itemTpl: '{title}',
				itemCls: 'add',
				hidden: true,
				store: Ext.create('Nutrilicious.stores.Recipes'),
				grouped: true,
				listeners: {
					itemtap: function (list, index, target, record, e, eOpts) {
						showRecipe(record);
					},
					disclose: function (field, record, target, index, e, eOpts) {
						e.stopEvent();
					}
				},
				onItemDisclosure: function (record) {
					Ext.Viewport.add({
						xtype: 'panel',
						title: 'Choose',
						modal: true,
						autoHeight: true,
						closable: false,
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
						width: '80%',
						items: [{
							xtype : 'toolbar',
							docked: 'bottom',
							deafults: {
								xtype: 'button'
							},
							items: [{
								xtype: 'container',
								flex: 1
							}, {
								text: 'Ok',
								ui: 'confirm-round',
								handler: function (btn) {
									var meal = Ext.getCmp('mealSelector').getValue();								
									var quantity = Ext.getCmp('quantitySpinner').getValue();
									var date = formatDate(Ext.getCmp('datepicker').getValue());
									addRecipeToPlan(record.data.id, quantity, meal, date, function () {
										update();
									});
									
									btn.up('panel').destroy();
								}
							}, {
								text: 'Cancel',
								ui: 'decline-round',
								handler: function (btn) {
									btn.up('panel').destroy();
								}
							}]
						}, {
							xtype: 'selectfield',
							id: 'mealSelector',
							placeHolder: 'Meal',
							options: [{
								text: 'Breakfast',
								value: 0
							}, {
								text: 'Lunch',
								value: 1
							}, {
								text: 'Snack',
								value: 2
							}, {
								text: 'Dinner',
								value: 3
							}]
						}, {
							xtype: 'spinnerfield',
							id: 'quantitySpinner',
							label: 'Quantity',
							labelWidth: 90,
							stepValue: 1,
							minValue: 1,
							maxValue: 10,
							cycle: true,
							value: 1
						}]
					});
				}
			}]
		}]
	}
});