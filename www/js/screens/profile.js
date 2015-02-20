Ext.define('Nutrilicious.screens.Profile', {
    extend: 'Ext.Panel',
    
    config: {
	    layout: 'vbox',
        items: [{
			items: [{
				xtype: 'datepickerfield',
				label: 'Birthday',
				picker: {
					yearFrom: 1900,
					value: {
						year: 1980
					}
				}
			}, {
				layout: 'hbox',
				items: [{
					xtype: 'component',
					flex: 6,
					html: '<div class="field-label">Height</div>'
				}, {
					xtype: 'numberfield',
					flex: 4,
					listeners: {
						blur: function (field) {
							if (!field.getValue() || field.getValue() < 0)
								field.setValue(0);
						}
					}
				}, {
					xtype: 'component',
					flex: 3,
					html: '<div class="field-label">ft</div>'
				}, {
					xtype: 'numberfield',
					flex: 4,
					listeners: {
						blur: function (field) {
							if (!field.getValue() || field.getValue() < 0)
								field.setValue(0);
						}
					}
				}, {
					xtype: 'component',
					flex: 3,
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
					styleHtmlCls: 'gender',
					styleHtmlContent: false,
					flex: 7
				}, {
					xtype: 'label',
					html: '<div class="field-label" style="line-height: 32px;">BMI: 50</div>',
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
					label: 'Slider 1',
					value: 50,
					minValue: 0,
					maxValue: 100
				}, {
					xtype: 'sliderfield',
					label: 'Slider 2',
					value: 50,
					minValue: 0,
					maxValue: 100
				}, {
					xtype: 'sliderfield',
					label: 'Slider 3',
					value: 50,
					minValue: 0,
					maxValue: 100
				}, {
					xtype: 'sliderfield',
					label: 'Slider 4',
					value: 50,
					minValue: 0,
					maxValue: 100
				}, {
					xtype: 'sliderfield',
					label: 'Slider 5',
					value: 50,
					minValue: 0,
					maxValue: 100
				}, {
					xtype: 'sliderfield',
					label: 'Slider 6',
					value: 50,
					minValue: 0,
					maxValue: 100
				}, {
					xtype: 'sliderfield',
					label: 'Slider 5',
					value: 50,
					minValue: 0,
					maxValue: 100
				}, {
					xtype: 'sliderfield',
					label: 'Slider 8',
					value: 50,
					minValue: 0,
					maxValue: 100
				}]
			}]
		}]
    }
});