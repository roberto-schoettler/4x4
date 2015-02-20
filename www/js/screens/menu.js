Ext.define('Nutrilicious.screens.Menu', {
    extend: 'Ext.Panel',
    
    config: {
		width: '80%',
		autoHeight: true,
		centered: true,
		modal: true,
		showAnimation: {
			type: 'slide'
		},
		hideAnimation: {
			type: 'slideOut',
			direction: 'right'
		},
		hideOnMaskTap: true,
		padding: 20,
		defaults: {
			xtype: 'button',
			margin: 10,
			handler: function () {
				Ext.Viewport.add({
					xtype: 'panel',
					width: '65%',
					autoHeight: true,
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
					styleHtmlContent: true,
					html: '<p>Comming soon!</p>',
					items: [{
						xtype: 'toolbar',
						docked: 'top',
						title: 'New Feature'
					}]
				}).show();
			}
		},
		items: [{
			xtype: 'toolbar',
			docked: 'top',
			title: 'Menu',
			margin: 0
		}, {
			text: 'About Us'
		}, {
			text: 'Diet Requirements'
		}, {
			text: 'Shopping List'
		}, {
			text: 'Rate Us'
		}, {
			text: 'GeoLocation'
		}]
	}
});