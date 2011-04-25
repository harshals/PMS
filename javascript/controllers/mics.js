MiscController = function(app) {with (app) {

        app.use("Template" , 'html');
        app.use("JSON");
        app.use(utils);
//===================================BEFORE LOADING=============================
        app.before(/^#\/view-/, function(context) {
                context.log("inside contact");
                $("#main-content").html('');
                $("#sidebar-content").html('');
                $("#content-extra").html('');
                //$("#section-menu").html('');
        });
//===================================BEFORE LOADING=============================

//===================================AFTER LOADING==============================
        app.get('#/misc-list', function(context) {
            context.redirect("#/view-account");
        });

//------------------------------------Account View------------------------------
        app.get('#/view-account', function(context) {
            context .load("api/account.json")
                    .then(function(json) {
                        this.wait();
                        var total_amount = 0;
                    //....................Calculating Total Amount..............
                        for( var i=0;i<json.length;i++)
                        {
                            total_amount = total_amount + parseInt(json[i].total_amount)
                        }
                        context .jemplate('misc-menu.html', {data : "Accounts"}, "#section-menu");
                        context .jemplate('view-account.html',{list:json,total_amount:total_amount}, "#main-content", this);
                    })
                    .then(function(){
                        this.wait();
                        $("#MyTable").tablesorter();
						$("#MyTable").find("a").click(function(){
						  var account_id = $(this).attr('id');
						  alert("Your choosen value is "+account_id);
						  context .load("api/account.json")
							      .then(function(json) {
							        this.wait();
                                   /* var nhash = {};
                                    $.each(json, function(n,hash){
                                        if (typeof (nhash[ hash.family ]) == 'undefined') {
                                            nhash[ hash.family ] = new Array;
                                        }
                                        nhash[ hash.family ].push(hash);
                                    });
								    newhash = nhash ;
									console.log("data is"+newhash);*/
									context .jemplate('misc-view-account.html', {list:json[account_id-1],data:json}, null, this)
								})
								.then(function(content){
									$.facebox(content);
									$("#facebox" ) .find("input.datepicker")
                                            .datepicker( {altFormat: 'yy-mm-dd' ,dateFormat : 'dd-mm-yy'});
									$("#facebox").find("input[name=delete]").click(function(){
										$("#facebox").find("input[name=delete]").trigger('close.facebox');

										$("#MyTable").find("a#"+ account_id )
													.parents("tr:first").hide();
								    })

									$("#facebox").find("input[name=save]").click(function(){
										alert("Your data is save");
										$("#facebox").find("input[name=delete]").trigger('close.facebox');
								    })
								})
						})
                        $("#section-menu").find("a[name=view_account]").click(function(){
                            //alert("View Account")
                            context.redirect("#/view-account");
                        })
                        $("#section-menu").find("a[name=edit_account]").click(function(){
                            //alert("Edit Account")
                            context .jemplate('edit-account.html',{}, "#sidebar-content");
                        })
                        $("#section-menu").find("a[name=view_enumeration]").click(function(){
                            //alert("View Enumeration")
                            context.redirect("#/view-enumeration");
                        })
                      
                    })
        });
//------------------------------------Account View------------------------------

//----------------------------------Enumeration View----------------------------
        app.get('#/view-enumeration', function(context) {
            context .load("api/enumeration.json")
                    .then(function(json) {
                        this.wait();
                        context .jemplate('misc-menu.html', {data : "Enumeartions"}, "#section-menu");
                        var nhash = {};
                        $.each(json, function(n,hash){
                            if (typeof (nhash[ hash.key_name ]) == 'undefined') {
                                nhash[ hash.key_name ] = new Array;
                            }
                            nhash[ hash.key_name ].push(hash);
                        });
                        context .jemplate('view-enumeration.html',{list:nhash}, "#main-content", this);
                    })
                    .then(function(){
                        this.wait();
                        $("#MyTable").tablesorter()
                        $("#section-menu").find("a[name=view_account]").click(function(){
                            //alert("it works view account")
                            context.redirect("#/view-account");
                        });
                        $("#section-menu").find("a[name=edit_account]").click(function(){
                            context .jemplate('add-enumeration.html',{}, "#sidebar-content",this);
                        })
                        
                        $("#section-menu").find("a[name=view_enumeration]").click(function(){
                            //alert("it works view enumeration")
                            context.redirect("#/view-enumeration");
                        });
                        $("#MyTable").find("a").click(function(){
                            //alert("hello")
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
                                    context .jemplate('view-each-enumeration.html',{list:nhash,enumeration_key : enumeration_key}, "#main-content", this);
                                })
                                .then(function(){
                                   
                                    $("#MyTable").find("span.edit").click(function(){
                                        var data = $(this).attr("id").replace("row_","")
                                        alert("you click : "+ data);
                                        context .jemplate('add-enum-value.html',{key_name:data}, "#sidebar-content")
                                        $("#sidebar-content").find("#save").click(function(){
                                            alert("new enum value aded")
                                            context .load("api/each-enumeartion.json")
                                                    .then(function(json) {
                                                        alert(json)
                                                        //context .jemplate('new_enum.html',{item:json}, "#new-row", this);
                                                    })
                                        })
                                    });
                                    $("#MyTable").find("a").click(function(){
                                        alert("hel;l")
                                        context .jemplate('add-enum-value.html',{}, "#sidebar-content")
                                        $("#sidebar-content").find("#save").click(function(){
                                            alert("new enum value aded")
                                            context.render('jemplates/new_enum_value.html').appendTo("#new-enum-value");
                                        })
                                    })
                                     $("#MyTable").find("span.delete").click(function(){
                                        var option_value = $(this).attr("id").replace("row_","")
                                        alert("you del click : "+ option_value);
                                        $("#new-row").find("#row_"+ option_value )
                                                                    .parents("tr:first").hide();

                                    });
                                })
                        })
                        
                    })
                    .then(function(){
                        $("#section-menu").find("a[name=edit_account]").click(function(){
                            //alert("it works edit account");
                            context .jemplate('add-enumeration.html',{}, "#sidebar-content")
                            $("#sidebar-content").find("#save").click(function(){
                                alert("new row")
                                context.render('jemplates/new_enum.html').appendTo("#new-row");
                            })
                                    /*.then(function(){
                                        $("#sidebar-content").find("#save").click(function(){
                                            alert("hello")
                                        })
                                    })*/
                        })
                    })
                    .then(function(){
                        
                    })
        });
//----------------------------------Enumeration View----------------------------
//===================================AFTER LOADING==============================

}}