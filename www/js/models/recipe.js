Ext.define('Nutrilicious.models.Recipe', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['id', 'title', 'quantity', 'image', 'url', 'servingSize', 'servingUnit']
    }
});