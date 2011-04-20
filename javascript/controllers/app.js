
MainController = function(app) { with (app) {

/*	app.use(utils);
    
    app.config={};

    $.getJSON("config.json",function(json){
    	$.extend(app.config,json);
    });
*/
	app.get('#/home', function(context) {
        });

	app.get('#/bill', function(context) {
            context.render('').replace("#section-menu");
            context.redirect("#/bill-list");
	});

        app.get('#/misc', function(context) {
            context.render('').replace("#section-menu");
            context.redirect("#/misc-list");
	});

        app.get('#/mis_reports', function(context) {
            context.render('').replace("#section-menu");
            context.redirect("#/");
	});

        app.get('#/import_export', function(context) {
            context.render('').replace("#section-menu");
            context.redirect("#/");
	});

        app.get('#/profile', function(context) {
            context.redirect("#/");
	});
        
}};
