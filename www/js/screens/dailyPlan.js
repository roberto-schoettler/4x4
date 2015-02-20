Ext.define('Nutrilicious.screens.DailyPlan', {
    extend: 'Ext.Panel',
    
    config: {
		layout: 'fit',
		items: [{
			xtype: 'list',
			itemTpl: '{item}',
			itemCls: 'remove',
			store: Ext.create('Nutrilicious.stores.DailyPlan'),
			grouped: true,
			onItemDisclosure: function (record) {
				Ext.Msg.alert('Click detected', 'You clicked on ' + record.data.item);
			}
		}]
	}
});