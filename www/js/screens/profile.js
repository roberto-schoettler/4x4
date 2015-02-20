Ext.define('Nutrilicious.screens.Profile', {
    extend: 'Ext.Panel',
    
    config: {
	    layout: 'vbox',
        items: [{
			items: [{
				xtype: 'datepickerfield',
				id: 'birthdayDP',
				label: 'Birthday',
				picker: {
					yearFrom: 1900,
					value: {
						year: 1980
					}
				},
				listeners: {
					change: setProfile
				}
			}, {
				layout: 'hbox',
				items: [{
					xtype: 'component',
					flex: 6,
					html: '<div class="field-label">Weight</div>'
				}, {
					xtype: 'numberfield',
					id: 'weightN',
					flex: 12,
					listeners: {
						blur: function (field) {
							if (!field.getValue() || field.getValue() < 0)
								field.setValue(0);
							else {
								calculateBMI();
								setProfile();
							}
						}
					}
				}, {
					xtype: 'component',
					flex: 2,
					html: '<div class="field-label">lbs</div>'
				}]
			}, {
				layout: 'hbox',
				items: [{
					xtype: 'component',
					flex: 6,
					html: '<div class="field-label">Height</div>'
				}, {
					xtype: 'numberfield',
					id: 'feetsN',
					flex: 4,
					listeners: {
						blur: function (field) {
							if (!field.getValue() || field.getValue() < 0)
								field.setValue(0);
							else {
								calculateBMI();
								setProfile();
							}
						}
					}
				}, {
					xtype: 'component',
					flex: 3,
					html: '<div class="field-label">ft</div>'
				}, {
					xtype: 'numberfield',
					id: 'inchesN',
					flex: 5,
					listeners: {
						blur: function (field) {
							if (!field.getValue() || field.getValue() < 0)
								field.setValue(0);
							else {
								calculateBMI();
								setProfile();
							}
						}
					}
				}, {
					xtype: 'component',
					flex: 2,
					html: '<div class="field-label">in</div>'
				}]
			}, {
				layout: 'hbox',
				items: [{
					xtype: 'component',
					flex: 6,
					html: '<div class="field-label" style="line-height: 32px;">Gender</div>'
				}, {
					xtype: 'togglefield',
					id: 'genderT',
					styleHtmlCls: 'gender',
					styleHtmlContent: false,
					flex: 7,
					listeners: {
						change: setProfile
					}
				}, {
					xtype: 'label',
					id: 'bmi',
					html: '<div class="field-label" style="line-height: 32px;">BMI: 0</div>',
					flex: 7
				}]
			}]
		}, {
			layout: 'hbox',
			flex: 1,
			items: [{
				xtype: 'img',
				flex: 3,
				maxHeight: '100%',
				src: 'img/body.png'
			}, {
				scrollable: true,
				flex: 7,
				defaults: {
					labelAlign: 'top'
				},
				items: [{
					xtype: 'sliderfield',
					label: 'Proteins',
					value: 75,
					minValue: 0,
					maxValue: 100
				}, {
					xtype: 'sliderfield',
					label: 'Carbohydrates',
					value: 65,
					minValue: 0,
					maxValue: 100
				}, {
					xtype: 'sliderfield',
					label: 'Fiber',
					value: 90,
					minValue: 0,
					maxValue: 100
				}, {
					xtype: 'sliderfield',
					label: 'Fat',
					value: 30,
					minValue: 0,
					maxValue: 100
				}, {
					xtype: 'sliderfield',
					label: 'Sodium',
					value: 20,
					minValue: 0,
					maxValue: 100
				}, {
					xtype: 'sliderfield',
					label: 'Vitamins',
					value: 53,
					minValue: 0,
					maxValue: 100
				}, {
					xtype: 'sliderfield',
					label: 'Minerals',
					value: 45,
					minValue: 0,
					maxValue: 100
				}, {
					xtype: 'sliderfield',
					label: 'Calories',
					value: 70,
					minValue: 0,
					maxValue: 100
				}]
			}]
		}]
    },
	
	initialize: function () {
		getProfile();
	}
});

function setProfile () {
	var bd = Ext.getCmp('birthdayDP').getValue();
	var gender = Ext.getCmp('genderT').getValue();
	var weight = Ext.getCmp('weightN').getValue();
	var feet = Ext.getCmp('feetsN').getValue();
	var inches = Ext.getCmp('inchesN').getValue();
	
	if (weight && feet && inches && bd) {
		setPreferences({
			birthday: formatDate(bd),
			gender: gender,
			weight: weight,
			heightFeet: feet,
			heightInches: inches
		});
	}
}

function getProfile () {	
	var result = getPreferences();
	
	if (result.birthday)
		var bd = Ext.getCmp('birthdayDP').setValue(new Date(result.birthday + ' 11:00:00'));
	var gender = Ext.getCmp('genderT').setValue(result.gender);
	var weight = Ext.getCmp('weightN').setValue(result.weight);
	var feet = Ext.getCmp('feetsN').setValue(result.heightFeet);
	var inches = Ext.getCmp('inchesN').setValue(result.heightInches);
	
	calculateBMI();
}

function calculateBMI () {
	var weight = Ext.getCmp('weightN').getValue();
	var feet = Ext.getCmp('feetsN').getValue();
	var inches = Ext.getCmp('inchesN').getValue();
	
	if (!weight || !feet || !inches)
		return;
	
	inches = eval(feet*12) + eval(inches); 

	var bmi = Math.round(weight * 703 * 10 / inches / inches) / 10; 
	if (bmi != Infinity && isNaN(bmi) == false)
		Ext.getCmp('bmi').setHtml('<div class="field-label" style="line-height: 32px;">BMI: ' + bmi + '</div>');
}