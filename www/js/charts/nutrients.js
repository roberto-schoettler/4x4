Ext.define('Nutrilicious.charts.Nutrients', {
    extend: 'Ext.chart.PolarChart',
    
    config: {
		animate: true,
		store: Ext.create('Nutrilicious.stores.Nutrients'),
		background: 'white',
		flex: 1,
		insetPadding: 50,
		interactions: 'rotate',
		series: [{
			type: 'radar',
			xField: 'name',
			yField: 'value',
			style: {
				fillStyle: 'rgba(0,255,0,0.2)',
				strokeStyle: 'rgba(0,0,0,0.8)',
				lineWidth: 1
			}
		}],
		axes: [{
			type: 'numeric',
			position: 'radial',
			fields: 'value',
			grid: true,
			style: {
				estStepSize: 20
			},
			label: {
				fill: 'black'
			}
		}, {
			type: 'category',
			position: 'angular',
			fields: 'name',
			grid: true,
			style: {
				estStepSize: 2
			},
			label: {
				fill: 'black'
			}
		}]
	},
	initialize: function () {
		var me = this;
		var store = me.getStore();
		
		//store.loadData();
	}
});