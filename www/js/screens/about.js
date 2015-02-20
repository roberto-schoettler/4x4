Ext.define('Nutrilicious.screens.about', {
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
			title: 'About Us',
			margin: 0
		}, {
			html: '<h1>Developed by:</h1><br><ul class="ingredients-list"><li>Anton Bazhal</li><li>Bruno Finelli</li><li>Yash Shah</li><li>Roberto von Schoettler</li></lu><img src="img/icon.png" style="max-width: 100%;">'
		}]
	}
});