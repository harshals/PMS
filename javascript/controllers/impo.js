impoController = function(app) {with (app) {

        app.use("Template" , 'html');
        app.use("JSON");
        app.use(utils);

        app.before(/^#\/impo-/, function(context) {
			
                $("#main-content").html('');
                $("#sidebar-content").html('');
                $("#content-extra").html('');
                $("#section-menu").html('');
        });
//------------------------ before loading function ---------------------------
	    app.get('#/import_export-view', function(context) {
			alert("r u there");
			context .load("null.html")
                    .then(function(){
                        this.wait();
                        context .jemplate('import_export.html', {}, "#main-content",this);
                    })
					.then(function(){
					    this.wait();
                        context .jemplate('misc-menu.html', {}, "#section-menu");
					});
		});
}}