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
    			    change: function () {
    			        console.log('changed');
    			    }
    			}
    		}]
    	}, {
    		xtype: 'list',
    		itemTpl: '{name}',
    		itemCls: 'add',
    		flex: 1,
    		store: Ext.create('Nutrilicious.stores.Recipes'),
    		grouped: true,
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
    					align: 'right',
    					items: [{
    						xtype: 'container',
    						flex: 1
    					}, {
    						text: 'Ok',
    						ui: 'confirm-round'
    					}, {
    						text: 'Cancel',
    						ui: 'decline-round',
    						handler: function (btn) {
    							btn.up('panel').destroy();
    						}
    					}]
    				}, {
    					xtype: 'selectfield',
    					placeHolder: 'Meal',
    					store: ['asd', 'qwe']
    				}, {
    					xtype: 'spinnerfield',
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
}
});