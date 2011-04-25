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
                            //alert("it works edit account");
                            context .jemplate('add-enumeration.html',{}, "#sidebar-content");
                        });
                        $("#section-menu").find("a[name=view_enumeration]").click(function(){
                            //alert("it works view enumeration")
                            context.redirect("#/view-enumeration");
                        });
                        $("#MyTable").find("a").click(function(){
                            //alert("hello")
                            var id = $(this).attr("id").replace("key_name_","");
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
                                    context .jemplate('view-each-enumeration.html',{list:nhash,enumeration_key : id}, "#main-content", this);
                                })
                                .then(function(){
                                    $("#MyTable").find("span.delete").click(function(){
                                        var data = $(this).attr("id").replace("row_","")
                                        alert("you del click : "+ data);
                                        $("#row_"+id+"]").parents("tr").hide();
                                    });
                                    $("#MyTable").find("span.edit").click(function(){
                                        var data = $(this).attr("id").replace("row_","")
                                        alert("you click : "+ data);
                                        context .jemplate('add-enum-value.html',{key_name:data}, "#sidebar-content");
                                    });
                                })
                        })
                    })
        });
//----------------------------------Enumeration View----------------------------
//===================================AFTER LOADING==============================

}}