Ext.define('Nutrilicious.screens.DailyPlan', {
    extend: 'Ext.Panel',
    
    config: {
		layout: 'fit',
		items: [{
			html: '<span class="empty-list">No recipes planned for this day!</span>',
			padding: 20
		}, {
			xtype: 'list',
			itemTpl: '{[values.title.substring(0, 25)]} ({quantity})',
			itemCls: 'remove',
			store: Ext.create('Nutrilicious.stores.DailyPlan'),
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
				var date = formatDate(Ext.getCmp('datepicker').getValue());
				removeRecipeFromPlan(record.data.id, date, function () {
					update();
				});
			}
		}]
	}
});