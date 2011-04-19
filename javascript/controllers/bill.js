BillController = function(app) {with (app) {

        app.use("Template" , 'html');
        app.use("JSON");
        app.use(utils);
//===================================BEFORE LOADING=============================
        app.before(/^#\/contact-/, function(context) {
                context.log("inside contact");
                $("#main-content").html('');
                $("#sidebar-content").html('');
                $("#content-extra").html('');
                $("#section-menu").html('');
        });
//===================================BEFORE LOADING=============================

//===================================AFTER LOADING==============================
        app.get('#/bill-list', function(context) {
            context.redirect("#/bill-edit-add");
        });
//---------------------------------EDIT ADD TRANSACTION-------------------------
        app.get('#/bill-edit-add', function(context) {
            context .load("api/transaction.json")
                    .then(function(json) {
                        this.wait();
                        context .jemplate('bill-edit-add.html',{list:json}, "#main-content", this);
                    })
                    .then(function(){
                        this.wait();
                        context .jemplate('bill-menu.html', {}, "#section-menu", this);
                        $("#main-content" ).find("input.datepicker").datepicker( {altFormat: 'yy-mm-dd' ,dateFormat : 'dd-mm-yy'});
                    }).then(function(){
						$("#MyTable").click(function(){
                            alert("HELLO");
                            context .jemplate('transaction-detail.html', {}, null, this)
                                    .then(function(content){
                                        alert("STEP2");
                                        $.facebox(content);
                                })
                        })		
					})
					.then(function(){
						   this.wait();
						   $("#section-menu").find("a#search").click(function() {
						     context.jemplate('bill_report.html',{},'#main-content',this);
						   });
						   
					}).then(function(){
					   this.wait();
					   $("#main-content" ).find("input.datepicker").datepicker( {altFormat: 'yy-mm-dd' ,dateFormat : 'dd-mm-yy'});
					})
                    .then(function(){
						   this.wait();
						   context.log("inside");
						   $("#main-content").find("a#add_security").click(function() {
								 alert("click");
								context.jemplate('add_security.html',{},'#sidebar-content',this);
							});
                    })
        });
//---------------------------------EDIT ADD TRANSACTION-------------------------

//===================================AFTER LOADING==============================

}}