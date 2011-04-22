BillController = function(app) {with (app) {

        app.use("Template" , 'html');
        app.use("JSON");
        app.use(utils);
//===================================BEFORE LOADING=============================
        app.before(/^#\/bill-/, function(context) {
                context.log("inside contact");
                $("#main-content").html('');
                $("#sidebar-content").html('');
                $("#content-extra").html('');
                $("#section-menu").html('');
        });
//===================================BEFORE LOADING=============================

//===================================AFTER LOADING==============================
        app.get('#/bill-list', function(context) {
            context.redirect("#/bill-list-view");
        });

//-----------------------------------BILL LIST VIEW-----------------------------
        app.get('#/bill-list-view', function(context) {
            alert("I m in List View");
            console.log("I m in List View");
            context .load("api/bill.json")
                    .then(function(json) {
                        this.wait();
                        var total_amount = 0;
                        var total_brokerage = 0;
                    //....................Calculate Total Amount................
                        for( var i=0;i<json.length;i++)
                        {
                            total_amount = total_amount + parseInt(json[i].amount)
                        }
                    //...................Calculate Total Brokerage..............
                        for( var i=0;i<json.length;i++)
                        {
                            total_brokerage = total_brokerage + parseInt(json[i].brokerage)
                        }
                        context .jemplate('bill-list-view-menu.html', {}, "#section-menu");
                        context .jemplate('bill-list-view.html',{list:json,total_amount:total_amount,total_brokerage:total_brokerage}, "#main-content", this);
                    })
                    .then(function(){
                        this.wait();
                    //.........To Edit The Bill by clicking on Bill No..........
                        $("#MyTable").find("a").click(function(){
                            var id = $(this).attr("id").replace("row_",'');
                            alert(id + "need to redirect");
                            context.redirect("#/bill-edit-add/"+id)
                        })
                        context .jemplate('Pager.html', {}, '#page');//pager
                    //.................To Add n Search Bill.....................
                        $("#section-menu").find("a").click(function(){
                            var id = $(this).attr("id");
                            alert(id)
                        })
                    })
                    //..................TableSorter N Pagination................
                    .then(function(){
                        $("#MyTable").tablesorter()
                                         .tablesorterPager({container : $("#page") , positionFixed: false})
                    })
        });
//-----------------------------------BILL LIST VIEW-----------------------------

//---------------------------------EDIT ADD TRANSACTION-------------------------
        app.get('#/bill-edit-add/:id', function(context) {
            var id = context.params['id']
            alert("ID is" + id)
            context .load("api/transaction.json")
                    .then(function(json) {
                        this.wait();
                        var total = 0;
                        var trans = {}
                        trans = json[id].transaction
                        console.log(trans)
                    //..................Calculating Total Amount................
                        for( var i=0;i<trans.length;i++)
                        {
                            total = total + parseInt(trans[i].amount)
                        }
                        context .jemplate('bill-edit-add-menu.html', {}, "#section-menu");
                        context .jemplate('bill-edit-add.html',{list:json[id],total:total}, "#main-content", this);
                    })
                    .then(function(){
                        this.wait();
                        $("#main-content" ) .find("input.datepicker")//datepicker
                                            .datepicker( {altFormat: 'yy-mm-dd' ,dateFormat : 'dd-mm-yy'});
                    //...To Edit N Add Transaction by clicking on Transaction No...
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
                    //...............To Add Delete N Print Bill.................
                        $("#section-menu").find("a").click(function(){
                            var id = $(this).attr("id");
                            alert(id)
                        })
                    })
                    .then(function(){
                        $("#MyTable").tablesorter();
                    })
        });
//---------------------------------EDIT ADD TRANSACTION-------------------------

//===================================AFTER LOADING==============================

}}