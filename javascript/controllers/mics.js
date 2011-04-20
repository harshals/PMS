MiscController = function(app) {with (app) {

        app.use("Template" , 'html');
        app.use("JSON");
        app.use(utils);
//===================================BEFORE LOADING=============================
        app.before(/^#\/misc-/, function(context) {
                context.log("inside contact");
                $("#main-content").html('');
                $("#sidebar-content").html('');
                $("#content-extra").html('');
                $("#section-menu").html('');
        });
//===================================BEFORE LOADING=============================

//===================================AFTER LOADING==============================
        app.get('#/misc-list', function(context) {
            context.redirect("#/misc-account");
        });

//------------------------------------MISC ACCOUNT------------------------------
        app.get('#/misc-account', function(context) {
            context .load("api/account.json")
                    .then(function(json) {
                        this.wait();
                        var total_amount = 0;
                        for( var i=0;i<json.length;i++)
                        {
                            total_amount = total_amount + parseInt(json[i].total_amount)
                        }
                        context .jemplate('misc-report.html',{list:json,total_amount:total_amount}, "#main-content", this);
                    })
                    .then(function(){
                        this.wait();
                        context .jemplate('misc-report-menu.html', {}, "#section-menu", this);
                        $("#MyTable").tablesorter()
                    })
                    .then(function(){
                        /*$("#MyTable").find("a").click(function(){
                            var id = $(this).attr("id").replace("row_",'');
                            alert(id);
                            context .load("api/account-detail.json")
                                    .then(function(json) {
                                        context .jemplate('account-edit.html', {list:json[id-1]}, null, this)
                                    })
                                    .then(function(content){
                                        $.facebox(content);
                                    })
                        })*/
                        $("#create").click(function(){
                            var id = $(this).attr("id").replace("row_",'');
                            context .load("api/account-detail.json")
                                    .then(function(json) {
                                        context .jemplate('account-edit.html', {item:json}, "#sidebar-content", this)
                                    })
                        })
                    })
        });
//------------------------------------MISC ACCOUNT------------------------------

//===================================AFTER LOADING==============================

}}