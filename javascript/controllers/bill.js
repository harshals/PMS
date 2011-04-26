BillController = function(app) {with (app) {

        app.use("Template" , 'html');
        app.use("JSON");
        app.use(utils);
        var g_id;
//===================================BEFORE LOADING=============================

//...............................To Clear All Fields............................
        app.before(/^#\/bill-/, function(context) {
                context.log("inside contact");
                $("#main-content").html('');
                $("#sidebar-content").html('');
                $("#content-extra").html('');
                $("#section-menu").html('');
        });
        
//===================================BEFORE LOADING=============================

//===================================BINDING FUNCTION===========================
        var security,group,broker,acc;
        bind('process',function(){
            var context = this;

//----------------------------------------Add Security--------------------------
            $("#main-content").find("a#add_security").click(function() {
                context .load("api/security.json")
                        .then(function(json) {
                            this.wait();
                            context.jemplate('add_security.html',{data:json},'#sidebar-content', this);
                        })
                        .then(function(html) {
                            $("#sidebar-content").find("select[name=add_security]").select_autocomplete();
                            $("#sidebar-content").find("input#add").click(function() {
                             var security = $("#sidebar-content").find("select[name=add_security]").val();
                                alert("You select "+security)
                                var comp_security = $("#main-content").find("input[name=security]");
                                $(comp_security).val( $(comp_security).val() + "," + security );
                            });
                        });
            });
//----------------------------------------Add Security--------------------------

//-------------------------------------Add Family & Group-----------------------
            $("#main-content").find("a#family_group").click(function() {
                context .load("api/family_group.json")
                        .then(function(json) {
                            this.wait();
                            context.jemplate('add_family_group.html',{data:json},'#sidebar-content', this);
                        })
                        .then(function(html) {
                            $("#sidebar-content").find("select[name=family_group]").select_autocomplete();
                            $("#sidebar-content").find("input#add").click(function() {
                                family_group = $("#sidebar-content").find("select[name=family_group]").val();
                                alert("You select "+family_group);
                                var comp_family_group = $("#main-content" ).find("input[name=family_group]");
                                $(comp_family_group).val( $(comp_family_group).val() + "," + family_group );
                            });
                        });
            });
//-------------------------------------Add Family & Group-----------------------

//--------------------------------------Add Broker------------------------------
            $("#main-content").find("a#broker").click(function() {
                context .load("api/broker.json")
                        .then(function(json) {
                            this.wait();
                            context.jemplate('add_broker.html',{data:json},'#sidebar-content', this);
                        })
                        .then(function(html) {
                            $("#sidebar-content").find("select[name=add_broker]").select_autocomplete();
                            $("#sidebar-content").find("input#add").click(function() {
                              var broker = $("#sidebar-content").find("select[name=add_broker]").val();
                                alert("You select "+broker);
                                var comp_broker= $("#main-content" ).find("input[name=broker_name]");
                                $(comp_broker).val( $(comp_broker).val() + "," + broker )
                            });
                        });
            });
//--------------------------------------Add Broker------------------------------

//--------------------------------------Add Account------------------------------
            $("#main-content").find("a#account").click(function() {
                context .load("api/account.json")
                        .then(function(json) {
                            this.wait();
                            context.jemplate('add_account.html',{data:json},"#sidebar-content", this);
                        })
                        .then(function(html) {
                            $("#sidebar-content").find("select[name=add_account]").select_autocomplete();
                            $("#sidebar-content").find("input#add").click(function() {
                                account = $("#sidebar-content").find("select[name=add_account]").val();
                                alert("You select "+account);
                                var comp_account = $("#main-content" ).find("input[name=account]");
                                $(comp_account).val( $(comp_account).val() + "," + account )
                            });
                        });
            });
//--------------------------------------Add Account------------------------------
        });
//===================================BINDING FUNCTION===========================

//===================================AFTER LOADING==============================
        app.get('#/bill-list', function(context) {
            context.redirect("#/bill-list-view");
        });

//-----------------------------------Bill List View-----------------------------
        app.get('#/bill-list-view', function(context) {
            context .load("api/bill_list.json")
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
                        context .jemplate('bill_list_view_menu.html', {}, "#section-menu");
                        context .jemplate('bill_list_view.html',{list:json,total_amount:total_amount,total_brokerage:total_brokerage}, "#main-content", this);
                        $("#MyTable").find("a[id=row_"+g_id+"]").parents("tr").hide();
                    })
                    .then(function(){
                        this.wait();
                    //.........To Edit The Bill by clicking on Bill No..........
                        $("#MyTable").find("a").click(function(){
                            var bill_no = $(this).attr("id").replace("row_",'');
                            context.redirect("#/bill-edit-add/"+bill_no)
                        })

                        context .jemplate('Pager.html', {}, '#sidebar-content');//pager
                    })
                    //..................TableSorter N Pagination................
                    .then(function(){
                        $("#MyTable").tablesorter()
                                     .tablesorterPager({container : $("#sidebar-content") , positionFixed: false});
                    });
        });
//-----------------------------------Bill List View-----------------------------

//---------------------------------Edit Add Transaction-------------------------
        app.get('#/bill-edit-add/:id', function(context) {
            context .jemplate('bill_edit_add_menu.html', {}, "#section-menu");
            var bill_no = context.params['id']
            context .load("api/single_bill.json")
                    .then(function(json) {
                        this.wait();
                        var total_amount = 0;
                        var transaction = {}
                        transaction = json[bill_no].transaction
                        console.log(transaction)
                        //................Calculating Total Amount..............
                        for( var i=0;i<transaction.length;i++)
                        {
                            total_amount = total_amount + parseInt(transaction[i].amount)
                        }
                        //------------------------------------------------------
                        context .load("api/enumeration.json")
                                .then(function(enumdata) {
                                    this.wait();
                                    var nhash = {};
                                    //........To Pair/sort original json .......
                                    $.each(enumdata, function(n,hash){
                                        if (typeof (nhash[ hash.key_name ]) == 'undefined') {
                                            nhash[ hash.key_name ] = new Array;
                                        }
                                        nhash[ hash.key_name ].push(hash);
                                    });
                                    context .jemplate('bill_edit_add.html',{bill:json[bill_no],total_amount:total_amount,data:nhash}, "#main-content", this);
                                })
                                .then(function(){
                                    this.wait();
                                    //...To Edit N Add Transaction by clicking on Transaction No...
                                    $("#MyTable").find("a").click(function(){
                                        var transaction_id = $(this).attr("id").replace("row_",'');
                                        context .load("api/transaction-detail.json")
                                                .then(function(json) {
                                                    context .jemplate('transaction_detail.html', {list:json[transaction_id-1]}, null, this)
                                                })
                                                .then(function(content){
                                                    $.facebox(content);
                                                    //....Delete Transaction....
                                                    $("#facebox").find("#del").click(function(){
                                                        $("#facebox").find("#del").trigger('close.facebox');
                                                        $("#MyTable").find("a#row_"+ transaction_id ).parents("tr:first").hide();
                                                    })
                                                    //.....Save Transaction.....
                                                    $("#facebox").find("#save").click(function(){
                                                        $("#facebox").find("#save").trigger('close.facebox');
                                                        context.render('jemplates/single_transaction.html').appendTo("#new-row");
                                                    })
                                                })
                                    })
                                    //..............To Delete Bill..............
                                    $("#section-menu").find("#delete").click(function(){
                                        g_id = bill_no;
                                        alert("This bill is delete ");
                                        context.redirect("#/bill-search")
                                    })
                                    $("#main-content" ) .find("input.datepicker")//datepicker
                                                        .datepicker( {altFormat: 'yy-mm-dd' ,dateFormat : 'dd-mm-yy'});
                                    $("#MyTable").tablesorter();
                                })
                        //------------------------------------------------------
                    })
        });
//---------------------------------Edit Add Transaction-------------------------

//-------------------------------Bill Add View ---------------------------------
        app.get('#/bill-add', function(context) {
            context .load("null.html")
                    .then(function(html){
                        context.jemplate('add_new_bill.html',{},'#main-content',this);
                    })
                    .then(function(){
                        this.wait();
                        context .jemplate('bill_edit_add_menu.html', {}, "#section-menu",this);
                        $("#main-content" ).find("input.datepicker").datepicker( {altFormat: 'yy-mm-dd' ,dateFormat : 'dd-mm-yy'});
                        context.trigger('process');

                    })
        });
//-------------------------------Bill Add View ---------------------------------

//---------------------------------Search Report Form---------------------------
        app.get('#/bill-search', function(context) {
            context .load("null.html")
                    .then(function(html) {
                        context.jemplate('bill_report.html',{},'#main-content',this);
                    })
                    .then(function(){
                        context .jemplate('bill_edit_add_menu.html', {}, "#section-menu", this);
                        $("#main-content" ).find("input.datepicker").datepicker( {altFormat: 'yy-mm-dd' ,dateFormat : 'dd-mm-yy'});
                        context.trigger('process');
                    });
        });
//---------------------------------Search Report Form---------------------------

//---------------------------------Import/Export Form---------------------------
 
        app.get('#/import_export-view', function(context) {
            var data;
            context .load("null.html")
                    .then(function(){
                        this.wait();
                        context .jemplate('import_export_menu.html', {}, "#section-menu");
                    })
                    .then(function(){
                        data = "Data";
                        context .jemplate('import_export.html', {da:data}, "#main-content",this);
                        //...This is to show where it goes in database table...
                        $("#section-menu").find("a").click(function(){
                            data = $(this).attr('value');
                            context .jemplate('import_export.html', {da:data}, "#main-content");
                        })
                    });
        });
//---------------------------------Import/Export Form---------------------------

//===================================AFTER LOADING==============================
}}