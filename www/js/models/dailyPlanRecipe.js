Ext.define('Nutrilicious.models.DailyPlanRecipe', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['id', 'title', 'meal', 'quantity', 'image', 'url', 'servingSize', 'servingUnit']
    }
});