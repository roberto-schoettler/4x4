Ext.define('Nutrilicious.screens.diets', {
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
		scrollable: true,
		defaults: {
			layout: 'hbox',
			defaults: {
				xtype: 'togglefield',
				listeners: {
					change: function (field, value) {
						setDiet(field.id, value);
					},
					initialize: function (field) {
						if (field.setValue)
							field.setValue(getDiet(field.id));
					}
				}
			}
		},
		items: [{
			xtype: 'toolbar',
			docked: 'top',
			title: 'Diet Requirements'
		}, {
			items: [{
				xtype: 'component',
				flex: 1,
				html: '<div class="field-label" style="line-height: 32px;">High Protein</div>'
			}, {
				id: 'high-protein'
			}]
		}, {
			items: [{
				xtype: 'component',
				flex: 1,
				html: '<div class="field-label" style="line-height: 32px;">Low Carb</div>'
			}, {
				id: 'low-carb'
			}]
		}, {
			items: [{
				xtype: 'component',
				flex: 1,
				html: '<div class="field-label" style="line-height: 32px;">Low Fat</div>'
			}, {
				id: 'low-fat'
			}]
		}, {
			items: [{
				xtype: 'component',
				flex: 1,
				html: '<div class="field-label" style="line-height: 32px;">Balanced</div>'
			}, {
				id: 'balanced'
			}]
		}, {
			items: [{
				xtype: 'component',
				flex: 1,
				html: '<div class="field-label" style="line-height: 32px;">High Fiber</div>'
			}, {
				id: 'high-fiber'
			}]
		}, {
			items: [{
				xtype: 'component',
				flex: 1,
				html: '<div class="field-label" style="line-height: 32px;">Low Sodium</div>'
			}, {
				id: 'low-sodium'
			}]
		}, {
			items: [{
				xtype: 'component',
				flex: 1,
				html: '<div class="field-label" style="line-height: 32px;">No Sugar</div>'
			}, {
				id: 'no-sugar'
			}]
		}, {
			items: [{
				xtype: 'component',
				flex: 1,
				html: '<div class="field-label" style="line-height: 32px;">Vegeterian</div>'
			}, {
				id: 'vegeterian'
			}]
		}, {
			items: [{
				xtype: 'component',
				flex: 1,
				html: '<div class="field-label" style="line-height: 32px;">Vegan</div>'
			}, {
				id: 'vegan'
			}]
		}, {
			items: [{
				xtype: 'component',
				flex: 1,
				html: '<div class="field-label" style="line-height: 32px;">Kidney Friendly</div>'
			}, {
				id: 'kidney-friendly'
			}]
		}, {
			items: [{
				xtype: 'component',
				flex: 1,
				html: '<div class="field-label" style="line-height: 32px;">Peanut Free</div>'
			}, {
				id: 'peanut-free'
			}]
		}, {
			items: [{
				xtype: 'component',
				flex: 1,
				html: '<div class="field-label" style="line-height: 32px;">Paleo</div>'
			}, {
				id: 'paleo'
			}]
		}, {
			items: [{
				xtype: 'component',
				flex: 1,
				html: '<div class="field-label" style="line-height: 32px;">Gluten Free</div>'
			}, {
				id: 'gluten-free'
			}]
		}, {
			items: [{
				xtype: 'component',
				flex: 1,
				html: '<div class="field-label" style="line-height: 32px;">Wheat Free</div>'
			}, {
				id: 'wheat-free'
			}]
		}, {
			items: [{
				xtype: 'component',
				flex: 1,
				html: '<div class="field-label" style="line-height: 32px;">Dairy</div>'
			}, {
				id: 'dairy'
			}]
		}, {
			items: [{
				xtype: 'component',
				flex: 1,
				html: '<div class="field-label" style="line-height: 32px;">Eggs Free</div>'
			}, {
				id: 'eggs-free'
			}]
		}, {
			items: [{
				xtype: 'component',
				flex: 1,
				html: '<div class="field-label" style="line-height: 32px;">Soy Free</div>'
			}, {
				id: 'soy-free'
			}]
		}, {
			items: [{
				xtype: 'component',
				flex: 1,
				html: '<div class="field-label" style="line-height: 32px;">Fish Free</div>'
			}, {
				id: 'fish-free'
			}]
		}, {
			items: [{
				xtype: 'component',
				flex: 1,
				html: '<div class="field-label" style="line-height: 32px;">Shellfish Free</div>'
			}, {
				id: 'shellfish-free'
			}]
		}, {
			items: [{
				xtype: 'component',
				flex: 1,
				html: '<div class="field-label" style="line-height: 32px;">Treenut Free</div>'
			}, {
				id: 'treenut-free'
			}]
		}, {
			items: [{
				xtype: 'component',
				flex: 1,
				html: '<div class="field-label" style="line-height: 32px;">Low Potassium</div>'
			}, {
				id: 'low-potassium'
			}]
		}, {
			items: [{
				xtype: 'component',
				flex: 1,
				html: '<div class="field-label" style="line-height: 32px;">Alcohol Free</div>'
			}, {
				id: 'alcohol-free'
			}]
		}]
	}
});