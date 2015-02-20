Ext.define('Nutrilicious.stores.Recipes', {
    extend: 'Ext.data.Store',
    
    config: {
		model: 'Nutrilicious.models.Recipe',
		sorters: ['title'],
		grouper: {
			groupFn: function(record) {
				return record.get('title')[0];
			}
		}
	}
});