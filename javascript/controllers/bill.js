BillController = function(app) {with (app) {

        app.use("Template" , 'html');
        app.use("JSON");
        app.use(utils);
        var g_id;
//===================================BEFORE LOADING=============================
        app.before(/^#\/bill-/, function(context) {
                context.log("inside contact");
                $("#main-content").html('');
                $("#sidebar-content").html('');
                $("#content-extra").html('');
                $("#section-menu").html('');
        });
//===================================BEFORE LOADING=============================

//===================================BINDING FUNCTION===========================
         var sec,group,broker,acc;
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
                                sec = $("#sidebar-content").find("select[name=add_security]").val();
                                alert("You select "+sec)
                                var security_el = $("#main-content").find("input[name=security]");
                                $(security_el).val( $(security_el).val() + "," + sec );
                            });
                        });
            });
//----------------------------------------Add Security--------------------------

//-------------------------------------Add Family & Group-----------------------
            $("#main-content").find("a#family_group").click(function() {
                context .load("api/family.json")
                        .then(function(json) {
                            this.wait();
                            context.jemplate('group.html',{data:json},'#sidebar-content', this);
                        })
                        .then(function(html) {
                            $("#sidebar-content").find("select[name=family_group]").select_autocomplete();
                            $("#sidebar-content").find("input#add").click(function() {
                                group = $("#sidebar-content").find("select[name=family_group]").val();
                                alert("You select "+group);
                                var family = $("#main-content" ).find("input[name=family_group]");
                                $(family).val( $(family).val() + "," + group );
                            });
                        });
            });
//-------------------------------------Add Family & Group-----------------------

//--------------------------------------Add Broker------------------------------
            $("#main-content").find("a#broker").click(function() {
                context .load("api/broker.json")
                        .then(function(json) {
                            this.wait();
                            context.jemplate('broker.html',{data:json},'#sidebar-content', this);
                        })
                        .then(function(html) {
                            $("#sidebar-content").find("select[name=add_broker]").select_autocomplete();
                            $("#sidebar-content").find("input#add").click(function() {
                                broker = $("#sidebar-content").find("select[name=add_broker]").val();
                                alert("You select "+broker);
                                var brokername= $("#main-content" ).find("input[name=broker_name]");
                                $(brokername).val( $(brokername).val() + "," + broker )
                            });
                        });
            });
//--------------------------------------Add Broker------------------------------

//--------------------------------------Add Account------------------------------
            $("#main-content").find("a#account").click(function() {
				 context.load("api/acc.json")
				 		.then(function(json) {
							this.wait();
							context.jemplate('account.html',{data:json},"#sidebar-content", this);
							})
							.then(function(html) {
								$("#sidebar-content").find("select[name=add_account]")
													 .select_autocomplete();
							    $("#sidebar-content").find("input#add").click(function() {
									acc = $("#sidebar-content").find("select[name=add_account]")
									alert("You select "+acc);
									var acc_no = $("#main-content" ).find("input[name=account]");
									 $(acc_no).val( $(acc_no).val() + "," + acc )
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
            context .load("api/bill-view.json")
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
                        $("#MyTable").find("a[id=row_"+g_id+"]").parents("tr").remove();
                    })
                    .then(function(){
                        this.wait();
                    //.........To Edit The Bill by clicking on Bill No..........
                        $("#MyTable").find("a").click(function(){
                            var bill_no = $(this).attr("id").replace("row_",'');
                            context.redirect("#/bill-edit-add/"+bill_no)
                        })

                        context .jemplate('Pager.html', {}, '#sidebar-content');//pager
                    //.................To Add n Search Bill.....................

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
            context .jemplate('bill-edit-add-menu.html', {}, "#section-menu");
            var bill_no = context.params['id']
            var newhash = {}

            context .load("api/bill.json")
                    .then(function(json) {
                        this.wait();
                        var total = 0;
                        var trans = {}
                        trans = json[bill_no].transaction
                        console.log(trans)
                        //................Calculating Total Amount..............
                        for( var i=0;i<trans.length;i++)
                        {
                            total = total + parseInt(trans[i].amount)
                        }
                        //------------------------------------------------------
                        context .load("api/enumeration.json")
                                .then(function(jsondata) {
                                    this.wait();
                                    var nhash = {};
                                    $.each(jsondata, function(n,hash){
                                        if (typeof (nhash[ hash.key_name ]) == 'undefined') {
                                            nhash[ hash.key_name ] = new Array;
                                        }
                                        nhash[ hash.key_name ].push(hash);
                                    });
                                    newhash = nhash ;
                                    context .jemplate('bill-edit-add.html',{bill:json[bill_no],total:total,data:newhash}, "#main-content", this);
                                })
                                .then(function(){
                                    this.wait();
                                    //...To Edit N Add Transaction by clicking on Transaction No...
                                    $("#MyTable").find("a").click(function(){
                                        var transaction_id = $(this).attr("id").replace("row_",'');
                                        context .load("api/transaction-detail.json")
                                                .then(function(json) {
                                                    context .jemplate('transaction-detail.html', {list:json[transaction_id-1]}, null, this)
                                                })
                                                .then(function(content){
                                                    $.facebox(content);
                                                    $("#facebox").find("#del").click(function(){
                                                        $("#facebox").find("#del").trigger('close.facebox');

                                                        $("#MyTable").find("a#row_"+ transaction_id )
                                                                    .parents("tr:first").hide();

                                                        context.redirect("#/bill-edit-add/"+id)
                                                    })
                                                    $("#facebox").find("#save").click(function(){
                                                        $("#facebox").find("#save").trigger('close.facebox');
                                                        context.render('jemplates/single-transaction.html').appendTo("#new-row");
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
                        context.jemplate('new-bill.html',{},'#main-content',this);
                    })
                    .then(function(){
                        this.wait();
                        context .jemplate('bill-edit-add-me.nu.html', {}, "#section-menu",this);
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
                        context .jemplate('bill-edit-add-menu.html', {}, "#section-menu", this);
                        $("#main-content" ).find("input.datepicker").datepicker( {altFormat: 'yy-mm-dd' ,dateFormat : 'dd-mm-yy'});
                        context.trigger('process');
                    });
        });
//---------------------------------Search Report Form---------------------------

//---------------------------------IMport/Export Form---------------------------
 
 app.get('#/import_export-view', function(context) {
	        var data;
			context .load("null.html")
                    .then(function(){
                        this.wait();
						context .jemplate('import-export-side.html', {}, "#section-menu");
                       
                    })
					.then(function(){
						  data = "Data";
						  context .jemplate('import_export.html', {da:data}, "#main-content",this);
					      $("#section-menu").find("a").click(function(){
						    data = $(this).attr('value');
							context .jemplate('import_export.html', {da:data}, "#main-content");
						  })
					
                        
					});
});
   

//===================================AFTER LOADING==============================
}}