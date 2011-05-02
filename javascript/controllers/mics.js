MiscController = function(app) {with (app) {

        app.use("Template" , 'html');
        app.use("JSON");
        app.use(utils);
//===================================BEFORE LOADING=============================

//...............................To Clear All Fields............................
        app.before(/^#\/view-/, function(context) {
                context.log("inside contact");
                $("#main-content").html('');
                $("#sidebar-content").html('');
                $("#content-extra").html('');
                $("#section-menu").html('');
        });
        
//===================================BEFORE LOADING=============================

//===================================AFTER LOADING==============================
        app.get('#/misc-list', function(context) {
            context.redirect("#/view-account");
        });

//------------------------------------Account View------------------------------
        app.get('#/view-account', function(context) {
            context .load("api/account_list.json")
                    .then(function(json) {
                        this.wait();
                        var total_amount = 0;
                        //..................Calculating Total Amount............
                        for( var i=0;i<json.length;i++)
                        {
                            total_amount = total_amount + parseInt(json[i].total_amount)
                        }
                        context .jemplate('misc_menu.html', {data : "Accounts"},"#section-menu");
                        context .jemplate('view_account.html',{list:json,total_amount:total_amount},"#main-content", this);
                    })
                    .then(function(){
                        this.wait();
                        $("#MyTable").tablesorter();
                        $("#section-menu").find("a[name=view_account]").click(function(){
                            context.redirect("#/view-account");
                        })
                        $("#section-menu").find("a[name=view_enumeration]").click(function(){
                            context.redirect("#/view-enumeration");
                        })
                        $("#section-menu").find("a[name=add_new]").click(function(){
                            context .jemplate('add_new_account.html',{}, "#sidebar-content");
							$("#sidebar-content").find("input.datepicker")
							                     .datepicker( {altFormat: 'yy-mm-dd' ,dateFormat : 'dd-mm-yy'});
						     $("#sidebar-content").find("input[name=added]").click(function(){
							        alert("New row introduce..");
									context.render('jemplates/add_one_account.html')
										   .appendTo("#new-row");
						     });
                        });
                    })
                    .then(function(){
                        this.wait();
                        
                        $("#MyTable").find("a").click(function(){
                            var account_id = $(this).attr('id');
                            alert("Your choosen value is "+account_id);
                            context .load("api/account_list.json")
                                    .then(function(json) {
                                        this.wait();
                                        context .jemplate('view_single_account.html',{list:json[account_id-1],data:json}, null, this)
                                    })
                                    .then(function(content){
                                        $.facebox(content);
                                        $("#facebox").find("input.datepicker")
                                                     .datepicker( {altFormat: 'yy-mm-dd' ,dateFormat : 'dd-mm-yy'});
                                       
										$("#facebox").find("#Del").click(function(){
                                            $("#facebox").find("input[name=delete]")
												         .trigger('close.facebox');
                                            $("#MyTable").find("a#"+ account_id )
												         .parents("tr:first").hide();
                                        });
                                        
										$("#facebox").find("#Save").click(function(){
                                            alert("Your data is save");
                                            $("#facebox").find("input[name=delete]")
												         .trigger('close.facebox');
                                        });
                                    });
                        });//this is for table anchor click evevnt
                    });// this is for then function above table
        });//app.get close
//------------------------------------Account View------------------------------

//----------------------------------Enumeration View----------------------------
        app.get('#/view-enumeration', function(context) {
            context .load("api/enumeration.json")
                    .then(function(json) {
                        this.wait();
                        context .jemplate('misc_menu.html', {data : "Enumeartions"}, "#section-menu");
                        var nhash = {};
                        $.each(json, function(n,hash){
                            if (typeof (nhash[ hash.key_name ]) == 'undefined') {
                                nhash[ hash.key_name ] = new Array;
                            }
                            nhash[ hash.key_name ].push(hash);
                        });
                        context .jemplate('view_enumeration.html',{list:nhash}, "#main-content", this);
                    })
                    .then(function(){
                        this.wait();
                        $("#MyTable").tablesorter();
                        $("#section-menu").find("a[name=view_account]").click(function(){
                            context.redirect("#/view-account");
                        });
                        $("#section-menu").find("a[name=add_new]").click(function(){
                            context .jemplate('add_new_enumeration.html',{}, "#sidebar-content");
							        $("#sidebar-content").find("#save").click(function(){
										    alert("new row is added");
										    context.render('jemplates/single_enumeration.html')
											       .appendTo("#new-row");
									});
                        })
                        
                        $("#section-menu").find("a[name=view_enumeration]").click(function(){
                            context.redirect("#/view-enumeration");
                        });
                        $("#MyTable").find("a").click(function(){
                            var enumeration_key = $(this).attr("id").replace("key_name_","");
                            context .load("api/enumeration.json")
                                .then(function(json) {
                                    this.wait();
                                    var nhash = {};
                                    $.each(json, function(n,hash){
                                        if (typeof (nhash[ hash.key_name ]) == 'undefined') {
                                            nhash[ hash.key_name ] = new Array;
                                        }
                                        nhash[ hash.key_name ].push(hash);
                                    });
                                    context .jemplate('view_each_enumeration.html',{list:nhash,enumeration_key : enumeration_key},"#main-content", this);
                                })
                                .then(function(){
                                    $("#MyTable").find("span.edit").click(function(){
                                        var data = $(this).attr("id").replace("row_","")
                                        alert("you click : "+ data);
                                        context .jemplate('add_enum_value.html',{key_name:data}, "#sidebar-content")
                                        $("#sidebar-content").find("#save").click(function(){
                                            alert("ADD")
                                        })
                                    });
                                    $("#MyTable").find("a").click(function(){
                                        context .jemplate('add_enum_value.html',{}, "#sidebar-content")
                                        $("#sidebar-content").find("#Save").click(function(){
                                            alert("new enum value aded")
                                            context.render('jemplates/single_enum_value.html').appendTo("#new_row");
                                        })
                                    })
                                     $("#MyTable").find("span.delete").click(function(){
                                        var option_value = $(this).attr("id").replace("row_","")
                                        alert("you del click : "+ option_value);
									$("#MyTable").find("#row_"+ option_value )
                                                 .parents("tr:first").hide();

                                    });
                                });
                        });
                        
                    });
        });
//----------------------------------Enumeration View----------------------------
//===================================AFTER LOADING==============================

}}