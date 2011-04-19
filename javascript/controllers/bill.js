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
            context .load("null.html")
                    .then(function(json) {
                        this.wait();
                            context .jemplate('bill-edit-add.html',{}, "#main-content", this);
                    })
                    .then(function(){
                        $("#main-content" ).find("input.datepicker").datepicker( {altFormat: 'yy-mm-dd' ,dateFormat : 'dd-mm-yy'});
                        context .load('api/transaction.json')
                                .then(function(json_list) {
                                    this.wait();
                                    context .jemplate('Process.html', {}, "#section-menu", this);
                                    context .jemplate('transaction-list-item.html',{list:json_list}, "#new-row", this);
                                    context .jemplate('Total.html', {}, "#content-extra", this);
                            })
                    })
        });
//---------------------------------EDIT ADD TRANSACTION-------------------------

//===================================AFTER LOADING==============================

}}