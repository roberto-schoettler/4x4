function search(ingredients, callback) {
    Ext.util.JSONP.request({
        url: 'https://api.edamam.com/search',
        params: {
            q: ingredients,
            app_id: '18cf1f0b',
            app_key: '785f31dc2852bc42e2af49f8645243cf'
        },
        type: 'get',
        success: function(data) {
            var recipes = [];

            for (var i = 0; i < data.hits.length; i++) {
                recipes.push(data.hits[i].recipe);
            }
            callback(recipes);
        },
        failure: function(data) {
            console.log("Oops!: " + data);
        }
    });
}


function getNutrition(recipe) {

    var hiddenForm = Ext.create('Ext.form.Panel', {
        title: 'hiddenForm',
        standardSubmit: true,
        timeout: 5000,
        height: 0,
        width: 0,
        hidden: true,
        items: [{
                xtype: 'hiddenfield',
                name: 'jsonData',
                value: JSON.stringify(recipe)
            },
            // additional fields
        ]
    });

    hiddenForm.submit({
        url: 'https://api.edamam.com/api/nutrition-details?app_id=4028f699&app_key=44e17ab66584a674d971a63a71508e60',
        method: 'POST',

        success: function(data) {
            console.log("success " + data);
        },
        failure: function(data) {
            console.log("nope " + data);
        }
    });

}