ProfileController = function(app) {with (app) {
	app.use("JSON");
	bind("profile-init", function(ev, data) {
            var context = this;
				
             context.load("null.html" )
		    .then(function(html) {
			this.wait();
                         context.jemplate('profile-menu.html', {}, '#section-menu', this);
		     }).then( function() {
			  $("#section-menu").find("a#change_password").click(function()  {
			  context.load("null.html")
				 .then(function(html) {
				      this.wait();
				      context.log("password");
				      context.jemplate('change_password.html',{},'#sidebar-content', this);
				  }).then(function(html){
					//submit code
                                       $("#submit").click(function(){
                                           $("#sidebar-content").find("#change_password").validate({
                                               rules: {
                                                  old_password: {
                                                     required:true,
                                                     minlength:4,
                                                     maxlength:15
                                                  },
                                                  new_password: {
                                                     required:true,
                                                     minlength:4,
                                                     maxlength:15
                                                  },
                                                  re_password: {
                                                     equalTo:"#new_password"
                                                  }
                                                },
                                                messages: {
                                                      old_password:"Enter Correct Password",
                                                      password:"Enter Password with min 4 char",
                                                      re_password: "Enter same password again"
                                                },
                                                errorClass: "small"
                                            });
                                            var old_password=$("#sidebar-content")
                                                                 .find("input[name=old_password]").val();
                                            var new_password=$("#sidebar-content")
                                                                 .find("input[name=new_password]").val();
                                            var json={'old':old_password,'new':new_password}
                                             context.log(json);
                                             $.ajax({
                                                 type: "POST",
                                                 url: "/change_password",
                                                 dataType: "json",
                                                 cache: false,
                                                 data : json,
                                                 success: function(data) {
                                                     alert("success");
                                                 },
                                                 error: function(data){
                                                   alert("FAILED");
                                                 }
                                            });
                                      });
					return false;
				  });
			  });
			  $("#section-menu").find("a#backup").click(function() {
			       context.load("null.html")
				      .then(function(html) {
				            this.wait();
					   context.log("click here");
					   context.jemplate('back_up.html',{},'#sidebar-content', this);
				       }).then(function(json){
                                            $("#submit").click(function(){
                                                var value=$("#sidebar-content").find("input[name=file_name]").val();
                                                var json={'name':value}
                                                   $.ajax({
                                                        type: "POST",
                                                        url: "/backup",
                                                        dataType: "json",
                                                        cache: false,
                                                        data : context.json(data),
                                                        success: function(data) {
                                                           var url =  data['url'];
                                                           $('#ADD').html('<a href = "url">'+value+'</a> <span>right click and save file</span');
                                                        },
                                                        error: function(data){
                                                            alert("FAILED")
                                                           $('#ADD').html('<a href = "url">'+value+'</a> <span>right click and save file</span');
                                                        }
                                                    });
                                             });
                                       });
                          })
			});
        })
  //-----------------------------------NAVIGATE FORM------------------------------
        bind("navigate-form", function(ev, data){
                $("#contact-form")
                    .find("fieldset.step").not("#step1")
                    .hide();
                $("#contact-form").find("a.nav-step").click(function(ev){
                    var stp = $(this).attr("id").replace("nav-",'');
                    $("#contact-form")
                        .find("fieldset.step")
                        .hide();
                    $("#contact-form")
                        .find("fieldset#" + stp).show();
                });
        });

 //-------------------end of bind---------------------------------
	app.before(/^#\/profile/, function(context) {
            context.log("inisde profile details");
	     $("#main-content").html('');
	     $("#sidebar-content").html('');
	      // make sure the menu remains all the time
	      context.trigger("profile-init");
	      context.log("i m before");
              
        });

//==================================AFTER LOADING===============================
//------------------------------------LOADING PROFILE--------------------------
       app.get("#/profile-detail", function(ev, data) {
	    var context = this;
            console.log("booom");
	    context.jemplate('profile-view.html',{},'#main-content');
        });
        app.get("#/profile-advance", function(ev, data) {
            var context = this;
            console.log("i m in advance");
            context.jemplate('contact-details.html',{},'#main-content');
            context.trigger("navigate-form");
        });
        app.get("#/profile-svg", function(context){
            String.prototype.chunk = function(n) {
                if (typeof n=='undefined') n=2;
                    return this.match(RegExp('.{1,'+n+'}','g'));
            };
            var data = {
                warehouse:{
                    "name" : "M.K Industries",
                    "address" : "Suite #711, Arun Chambers,Tardeo,Mumbai - 400034.Tel :- 022-23521453 Fax :- 40046848",
                    "range" : "III",
                    "range_address" : "Meher bldg., Chowpatty, Mumbai. - 7",
                    "division" : "A",
                    "division_address" : "Meher Bldg., Chopatty, Mumbai. - 7",
                    "commissionerate" : "MUMBAI-I",
                    "w_address" : "Gala No.6, Part-II,Gajanan Wafekar Cmpd,Purna ,Bhiwandi-421302 ,Thane,MS",
                    "w_state" : "Maharashtra",
                    "w_city" : "Mumbai",
                    "ecc" : "AAAFM88QXD001",
                    "vat_tin_no" : "274480022091V ",
                    "vat_tin_date" : "1-4-2006",
                    "cst_tin_no" : "274480022091C",
                    "cst_tin_date" : "1-4-2006",
                    "pan_no" : "746464685456"
                },
                sale:{
                    "invoice_date" : "24-Feb-2011",
                    "invoice_time" : "14:12",
                    "removal_date" : "24-Feb-2011",
                    "removal_time" : "15:21",
                    "challan_no" : "15665",
                    "challan_date" : "24-Feb-2011",
                    "vehicle_no" : "MH.12.FZ.3330",
                    "transport_mode" : "road",
                    "transporter_name" : "Suyog Motors",
                    "order_no" : "165",
                    "order_date" : "24-Feb-2011",
                    "invoice_no" : "1023",
                    "quantity" : "15.000",
                    "uom" : "MT",
                    "rate" : "59656.00",
                    "cenvat_rate" : "10",
                    "cvd_rate" : "4",
                    "sec_edu_cess_rate" : "2",
                    "hs_edu_cess_rate" : "1",
                    "cenvat" : "75098.70",
                    "cvd" : "0.00",
                    "sec_edu_cess" : "1,501.95",
                    "hs_edu_cess" : "750.90",
                    "total_duty" : "1100",
                    "taxable_value" : "894840.00",
                    "sale.custom.words.total_duty" : "sevebty five thousand fifty eight and seventy paise ",
                    "custom.words.total" : "nine lac thirty nine thousand five hundred eighty two ",
                    "sales_tax_rate" : "0",
                    "addl_sales_tax_rate" : "1",
                    "sales_tax" : "44742.00",
                    "addl_sales_tax" : "44742.00",
                    "sales_tax_type" : "C",
                    "total" : "939582.00"                    
                },
                product:{
                        "name" : "PVC Resin Grade EVIIPOL SH6830",
                        "chapter_heading" : "39042110"
                    },
                consignee:{
                    "name" : "M/S VARDHAMAN POLYEXTURSION",
                    "w_address" : "A-24/1, M.I.D.C., Chicholi,Solapur.",
                    "ecc" : "AADFV2150MXM001",
                    "range" : "1 HOTGI ROAD",
                    "division" : "HOTGI ROAD",
                    "vat_tin_no" : "27490022813V",
                    "cst_tin_no" : "27490022813C",
                    "commissionerate" : "Pune - III",
                    "id" : "1"
                },
                buyer:{
                    "name" : "M/S VARDHAMAN POLYEXTURSION",
                    "w_address" : "A-24/1, M.I.D.C., Chicholi,Solapur.",
                    "id" : "2"
                },
                supplier:{
                    "name" : "M/S VARDHAMAN POLYEXTURSION",
                    "w_address" : "A-24/1, M.I.D.C., Chicholi,Solapur.",
                    "ecc" : "AADFV2150MXM001",
                    "range" : "1 HOTGI ROAD",
                    "division" : "HOTGI ROAD",
                    "vat_tin_no" : "27490022813V",
                    "cst_tin_no" : "27490022813C",
                    "commissionerate" : "Pune - III"
                },
                purchase:{
                    "rg_page_no" : "358",
                    "range" : "III",
                    "uom" : "MT",
                    "range_address" : "gsajkaskjbkdasdasdsadakcakbckacaascacascaackasbckjasbkjas",
                    "invoice_date" : "20/01/2011",
                    "invoice_no" : "673278",
                    "invoice_date" : "20/01/2011",
                    "quantity" : "792.000",
                    "assessable_value" : "750987.90",
                    "cenvat_rate" : "10",
                    "cvd_rate" : "4",
                    "sec_edu_cess_rate" : "2",
                    "hs_edu_cess_rate" : "1" ,
                    "unit_cenvat" : "750",
                    "unit_cvd" : "0.00",
                    "unit_sec_edu_cess" : "15",
                    "unit_hs_edu_cess" : "7",
                    "cenvat" : "75098.79",
                    "cvd" : "0.00",
                    "sec_edu_cess" : "1502.00",
                    "hs_edu_cess" : "751.00",
                    "invoice_type" : "Dealer"
                },
                manufacturer:{
                    "name" : "M/S VARDHAMAN POLYEXTURSION",
                    "w_address" : "A-24/1, M.I.D.C., Chicholi,Solapur.",
                    "ecc" : "AADFV2150MXM001",
                    "range" : "1 HOTGI ROAD",
                    "division" : "HOTGI ROAD",
                    "vat_tin_no" : "27490022813V",
                    "cst_tin_no" : "27490022813C",
                    "commissionerate" : "Pune - III"
                },
                "w_city" : "Mumbai",
                "copy" : ""

            }

            data['warehouse']["w_address"] = "Godown : " + data['warehouse']["w_address"]

            if(data['sale']['sales_tax_rate'] > "0")
                {
                    data['sale']['sales_tax_rate'] = "VAT " + data['sale']['sales_tax_rate'] + "%"
                    data['sale']['sales_tax'] = data['sale']['sales_tax']
                }
            else
                {
                    data['sale']['sales_tax_rate'] = " "
                    data['sale']['sales_tax'] = " "
                }
            if(data['sale']['addl_sales_tax_rate'] > "0")
                {
                    data['sale']['addl_sales_tax_rate'] = "ADDL. VAT" + data['sale']['addl_sales_tax_rate'] + "%"
                    data['sale']['addl_sales_tax'] = data['sale']['addl_sales_tax']
                }
            else
                {
                    data['sale']['addl_sales_tax_rate'] = " "
                    data['sale']['addl_sales_tax'] = " "
                }
            if(data['sale']['sales_tax_type'] == "F" || data['sale']['sales_tax_type'] == "C")
                {
                    data['sale']['sales_tax_type'] = "FORM " + data['sale']['sales_tax_type']
                }
            else
                {
                    data['sale']['sales_tax_type'] = " "
                }
            if(data['consignee']['id'] != data['buyer']['id'])
                {
                    data['buyer']['name_address'] = data['buyer']['name'] + data['buyer']['w_address'];
                }
            if(data['sale']['cvd'] == "0.00" && data['purchase']['cvd'] != 0.00)
                {
                    data['rule'] = "NO. Credit Of the additional duty of custom leveled under rule-sec(5) of section 93 of the custom traffic at 1975 shall be admissible"
                }
            if(data['purchase']['invoice_type'] == "Importer")
                {
                    data["certificate"]="imported directly by us or received directly from the party: who have imported the said goods"
                }
            if(data['purchase']['invoice_type'] == "Manufacturer")
                {
                    data["certificate"]="Received directly from the factory/ depot / consignment agent/authorised permisesof M/s ." + data["manufacturer"]["name"]
                }
            if(data['purchase']['invoice_type'] == "Dealer")
                {
                    data["certificate"]="Received from M/s:"+data["manufacturer"]["name"]+" who are the first stage dealerof M/s" +data["supplier"]["name"]
                }
            /*data[total_duty_words] = data['sale']['custom']['words']['total_duty']
            data[total_words] = data['sale']['custom']['words']['total']
            data['warehouse']['address'] = data['warehouse']['address_1']+data['warehouse']['address_2'] + data['warehouse']['address_3'] + data['warehouse']['city'] + data['warehouse']['state'] + data['warehouse']['country']
            data['warehouse']['w_address'] = data['warehouse']['w_address_1'] +  data['warehouse']['w_address_2'] + data['warehouse']['w_city'] + data['warehouse']['w_state'] + data['warehouse']['w_country']
            data['buyer']['w_address'] = data['buyer']['w_address_1'] + data['buyer']['w_address_2'] + data['buyer']['w_city'] + data['buyer']['w_state'] + data['buyer']['w_country']
            data['manufacturer']['w_address'] = data['manufacturer']['w_address_1'] + data['manufacturer']['w_address_2'] + data['manufacturer']['w_city'] + data['manufacturer']['w_state'] + data['manufacturer']['w_country']
            data['consignee']['w_address'] = data['consignee']['w_address_1'] + data['consignee']['w_address_2'] + data['consignee']['w_city'] + data['consignee']['w_state'] + data['consignee']['w_country']
            data['supplier']['w_address'] = data['supplier']['w_address_1'] + data['supplier']['w_address_2'] + data['supplier']['w_city'] + data['supplier']['w_state'] + data['supplier']['w_country']*/
            
            data['warehouse']["address"] = data['warehouse']["address"].chunk(45);
            data['warehouse']["w_address"] = data['warehouse']["w_address"].chunk(45);
            data['warehouse']["range_address"] = data['warehouse']["range_address"].chunk(45);
            data['warehouse']["division_address"] = data['warehouse']["division_address"].chunk(45);
            data['consignee']["w_address"] = data['consignee']["w_address"].chunk(45);
            data['supplier']["w_address"] = data['supplier']["w_address"].chunk(45);
            data['purchase']["range_address"] = data['purchase']["range_address"].chunk(45);
            data['manufacturer']["w_address"] = data['manufacturer']["w_address"].chunk(45);
            data['product']["name"] = data['product']["name"].chunk(30);
            var popupWin;
            context .load('null.html')
                    .then(function() {
                        this.wait()
                        var svg_data = context.jemplate('Sales_Invoice.html',data,null,this);
                    })
                    .then(function(svg){
                        this.wait();
                        localStorage.setItem("key", svg);
                        this.next();
                    })
                    .then(function(){
                        popupWin = window.open('svg.html',popupWin,'');
                    })
        });
}}