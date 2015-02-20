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