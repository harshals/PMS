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
            alert("i m here")
            context.redirect("#/view-account");
        });

//------------------------------------Account View------------------------------
        app.get('#/view-account', function(context) {
            context .load("api/account.json")
                    .then(function(json) {
                        this.wait();
                        alert(json)
                        console.log(json)
                        var total_amount = 0;
                    //....................Calculating Total Amount..............
                        for( var i=0;i<json.length;i++)
                        {
                            total_amount = total_amount + parseInt(json[i].total_amount)
                        }
                        context .jemplate('misc-menu.html', {}, "#section-menu");
                        context .jemplate('view-account.html',{list:json,total_amount:total_amount}, "#main-content", this);
                    })
                    .then(function(){
                        this.wait();
                        $("#MyTable").tablesorter();
                        $("#section-menu").find("a[name=view_account]").click(function(){
                            alert("View Account")
                            context.redirect("#/view-account");
                        })
                        $("#section-menu").find("a[name=edit_account]").click(function(){
                            alert("Edit Account")
                            context .jemplate('edit-account.html',{}, "#sidebar-content");
                        })
                        $("#section-menu").find("a[name=view_enumeration]").click(function(){
                            alert("View Enumeration")
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
                        context .jemplate('misc-menu.html', {}, "#section-menu");
                      //  console.log(json)

                      var nhash = {};

                      $.each(json, function(n,hash){

                        if (typeof (nhash[ hash.key_name ]) == 'undefined') {
                            nhash[ hash.key_name ] = new Array;
                        }
                        nhash[ hash.key_name ].push(hash);
                     });

                     var k = []
                     n= nhash;
                        console.log(n);

                        //console.log(nhash);
                        //console.log(nhash['bought_sold'][0]['key_name'])
                        context .jemplate('view-enumeration.html',{list:nhash}, "#main-content", this);
                    })
                    .then(function(){
                        this.wait();
                        $("#MyTable").tablesorter();
                        $("#section-menu").find("a[name=view_account]").click(function(){
                            alert("it works view account")
                            context.redirect("#/view-account");
                        })
                        $("#section-menu").find("a[name=edit_account]").click(function(){
                            alert("it works edit account")
                            context .jemplate('edit-account.html',{}, "#sidebar-content");
                        })
                        $("#section-menu").find("a[name=view_enumeration]").click(function(){
                            alert("it works view enumeration")
                            context.redirect("#/view-enumeration");
                        })
                    })
        });
//----------------------------------Enumeration View----------------------------

//-------------------------------Add Enumeration Key & Value--------------------
    app.get('#/add-enum', function(context) {
        context .load("null.html")
                .then(function(html) {
                    context .jemplate('misc-menu.html', {}, "#section-menu",this);
                })
                .then(function(){
                    this.wait();
                    context.jemplate('add-enumeration.html',{},'#sidebar-content',this);
                })
                .then(function(){
                    this.wait();
                    $("#section-menu").find("a[name=view_account]").click(function(){
                            alert("it works view account")
                            context.redirect("#/view-account");
                        })
                        $("#section-menu").find("a[name=edit_account]").click(function(){
                            alert("it works edit account")
                            context .jemplate('edit-account.html',{}, "#sidebar-content");
                        })
                        $("#section-menu").find("a[name=view_enumeration]").click(function(){
                            alert("it works view enumeration")
                            context.redirect("#/view-enumeration");
                        })
                    $("#sidebar-content").find("#value_add").click(function(){
                        context .load("null.html")
                                .then(function(json) {
                                    context.jemplate('add-enum-value.html',{},null,this);
                                })
                                .then(function(content){
                                    $.facebox(content);
                                })
                        })
                });
    });
//-------------------------------Add Enumeration Key & Value--------------------

//===================================AFTER LOADING==============================

}}