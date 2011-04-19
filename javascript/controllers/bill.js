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
            context.redirect("#/bill-edit-add/"+12);
        });

//-----------------------------------BILL LIST VIEW-----------------------------
        app.get('#/bill-list-view', function(context) {
            alert("I M IN LIST VIEW");
            console.log("I m here");
            context .load("api/bill.json")
                    .then(function(json) {
                        this.wait();
                        var total_amount = 0;
                        var total_brokerage = 0;
                        for( var i=0;i<json.length;i++)
                        {
                            total_amount = total_amount + parseInt(json[i].amount)
                        }
                        for( var i=0;i<json.length;i++)
                        {
                            total_brokerage = total_brokerage + parseInt(json[i].brokerage)
                        }
                        context .jemplate('bill-list-view.html',{list:json,total_amount:total_amount,total_brokerage:total_brokerage}, "#main-content", this);
                    })
                    .then(function(){
                        this.wait();
                        context .jemplate('bill-list-view-menu.html', {}, "#section-menu", this);
                        $("#MyTable").find("a").click(function(){
                            var id = $(this).attr("id").replace("row_",'');
                            alert(id + "need to redirect");
                            context.redirect("#/bill-edit-add/"+id)
                        })
                    })
                    .then(function(){
                        context .jemplate('Pager.html', {}, '#page');
                        $("#section-menu").find("a").click(function(){
                            var id = $(this).attr("id");
                            alert(id)
                        })
                    })
                    .then(function(){
                        $("#MyTable").tablesorter()
                                         .tablesorterPager({container : $("#pager") , positionFixed: false})
                    })
        });
//-----------------------------------BILL LIST VIEW-----------------------------
//
//---------------------------------EDIT ADD TRANSACTION-------------------------
        app.get('#/bill-edit-add/:id', function(context) {
            alert("I M IN EDIT N ADD TEMPLATE");
            context .load("api/transaction.json")
                    .then(function(json) {
                        this.wait();
                        var total = 0;
                        for( var i=0;i<json.length;i++)
                        {
                            total = total + parseInt(json[i].amount)
                        }
                        context .jemplate('bill-edit-add.html',{list:json,total:total}, "#main-content", this);
                    })
                    .then(function(){
                        this.wait();
                        
                        context .jemplate('bill-edit-add-menu.html', {}, "#section-menu", this);
                        $("#main-content" ).find("input.datepicker").datepicker( {altFormat: 'yy-mm-dd' ,dateFormat : 'dd-mm-yy'});
                        $("#MyTable").find("a").click(function(){
                            var id = $(this).attr("id").replace("row_",'');
                            alert(id);
                            context .load("api/transaction-detail.json")
                                    .then(function(json) {
                                        context .jemplate('transaction-detail.html', {list:json[id-1]}, null, this)
                                    })
                                    .then(function(content){
                                        $.facebox(content);
                                    })
                        })
                    })
                    .then(function(){
                        $("#MyTable").tablesorter();
                        $("#section-menu").find("a").click(function(){
                            var id = $(this).attr("id");
                            alert(id)
                            if(id=="create")
                                {
                                    context.redirect("#/bill-list-view")
                                }
                        })
                    })
                    .then(function(){
                        $("#MyTable").tablesorter()
                    })
        });
//---------------------------------EDIT ADD TRANSACTION-------------------------

//===================================AFTER LOADING==============================

}}