/*
   This JavaScript code was generated by Jemplate, the JavaScript
   Template Toolkit. Any changes made to this file will be lost the next
   time the templates are compiled.

   Copyright 2006-2008 - Ingy döt Net - All rights reserved.
*/

if (typeof(Jemplate) == 'undefined')
    throw('Jemplate.js must be loaded before any Jemplate template files');

Jemplate.templateMap['Pager.html'] = function(context) {
    if (! context) throw('Jemplate function called without context\n');
    var stash = context.stash;
    var output = '';

    try {
output += '<div id="pager" class="pager box blue ">\n	<form>\n		<span class="icon first" ></span>\n		<span class="icon prev" ></span>\n		<input type="text" class="pagedisplay grid_2" />\n		<span class="icon last"/></span>\n		<span class="icon next"/></span>\n		<select class="pagesize">\n			<option selected="selected"  value="10">10</option>\n			<option value="20">20</option>\n			<option value="30">30</option>\n			<option  value="40">40</option>\n		</select>\n	</form>\n</div>\n\n\n';
    }
    catch(e) {
        var error = context.set_error(e, output);
        throw(error);
    }

    return output;
}

Jemplate.templateMap['add_security.html'] = function(context) {
    if (! context) throw('Jemplate function called without context\n');
    var stash = context.stash;
    var output = '';

    try {
output += '<form class="grid_6 yellow box">\n	<p><b>Add Security</b></p>\n	<input type="text" id="autocomplete" />\n	<li class="form hii">\n       	<input type="submit" value="Save" class="button" />\n        <input type=reset value="Reset" name="reset" class="button" />\n	</li>\n</form>';
    }
    catch(e) {
        var error = context.set_error(e, output);
        throw(error);
    }

    return output;
}

Jemplate.templateMap['bill-edit-add-menu.html'] = function(context) {
    if (! context) throw('Jemplate function called without context\n');
    var stash = context.stash;
    var output = '';

    try {
output += '<p>Action</p>\n<ul>\n\n    <li><a id="create">Add New Bill</a></li>\n\n    <li><a id="delete">Delete this Bill</a></li>\n\n    <li><a id="update">Print this Bill</a></li>\n\n    <li><a id="search">Search Bill</a></li>\n\n</ul>';
    }
    catch(e) {
        var error = context.set_error(e, output);
        throw(error);
    }

    return output;
}

Jemplate.templateMap['bill-edit-add.html'] = function(context) {
    if (! context) throw('Jemplate function called without context\n');
    var stash = context.stash;
    var output = '';

    try {
output += '<form class="form blue" action="">\n    <fieldset >\n        <legend></legend>\n            <ul class="vhh" >\n                <li>\n                    <label class="grid_3"style="border-bottom : none"class="">Bill No</label>\n                    <input class="grid_3" type="text" name="bill_no" value="';
//line 7 "bill-edit-add.html"
output += stash.get(['list', 0, 'bill_no', 0]);
output += '"/>\n                </li>\n                <li>\n                    <label class="grid_3">Bill Date</label>\n                    <input class="grid_3 datepicker" type="text" name="bill_date" value="';
//line 11 "bill-edit-add.html"
output += stash.get(['list', 0, 'bill_date', 0]);
output += '" />\n                </li>\n                <li>\n                    <label class="grid_3">Broker</label>\n                    <select class="grid_3" name="broker" value="';
//line 15 "bill-edit-add.html"
output += stash.get(['list', 0, 'broker', 0]);
output += '">\n                        <option value="rss">RSS\n                        <option value="hdfc">HDFC\n                    </select>\n                </li>\n            </ul>\n            <ul class="vhh">\n                <li>\n                    <label class="grid_3">Settlement No</label>\n                    <input class="grid_3" type="text" name="settlement_no" value="';
//line 24 "bill-edit-add.html"
output += stash.get(['list', 0, 'settlement_no', 0]);
output += '"/>\n                </li>\n                <li>\n                    <label class="grid_3">Settlement Type</label>\n                    <select class="grid_3" name="settlement_type" value="';
//line 28 "bill-edit-add.html"
output += stash.get(['list', 0, 'settlement_no', 0]);
output += '">\n                        <option value="normal">NORMAL\n                        <option value="rolling">ROLLING\n                    </select>\n                </li>\n                <li>\n                    <label class="grid_3">Exchange</label>\n                    <select class="grid_3" name="exchange" vlaue="';
//line 35 "bill-edit-add.html"
output += stash.get(['list', 0, 'exchange', 0]);
output += '">\n                        <option value="bse">BSE\n                        <option value="nse">NSE\n                        <option value="cmx">CMX\n                    </select>\n                </li>\n            </ul>\n            <ul class="vhh">\n                <li>\n                    <label class="">Period</label>\n                </li>\n                <li>\n                    <input class="" type="text" name="from_period" value="';
//line 47 "bill-edit-add.html"
output += stash.get(['list', 0, 'from_period', 0]);
output += '"/>\n                </li>\n                <li>\n                    <input type="text" name="to_period" value="';
//line 50 "bill-edit-add.html"
output += stash.get(['list', 0, 'to_period', 0]);
output += '"/>\n                </li>\n            </ul>\n    </fieldset>\n</form>\n<ul>\n    \n    <li>\n        <table class="basetable tablesorter" id="MyTable"  >\n            <thead>\n                <tr>\n                    <td style="border-right : none">\n                    <label class="pull_5"> List Of Trasactions </label>\n                    <label class="push_5" id="new"><a>Add New Transaction</a></label>\n                    </td>\n                </tr>\n                <tr>\n                    <th class="grid_3"> Transaction No </th>\n                    <th class="grid_3"> Transaction Date </th>\n                    <th class="grid_3"> Security </th>\n                    <th class="grid_3"> Type </th>\n                    <th class="grid_3"> Amount </th>\n                </tr>\n            </thead>\n            <tbody id="new-row">\n                ';
//line 79 "bill-edit-add.html"

// FOREACH 
(function() {
    var list = stash.get(['list', 0, 'transaction', 0]);
    list = new Jemplate.Iterator(list);
    var retval = list.get_first();
    var value = retval[0];
    var done = retval[1];
    var oldloop;
    try { oldloop = stash.get('loop') } finally {}
    stash.set('loop', list);
    try {
        while (! done) {
            stash.data['item'] = value;
output += '\n\n			';
//line 77 "bill-edit-add.html"
output += context.process('transaction-list-item.html');
output += '\n\n		';;
            retval = list.get_next();
            value = retval[0];
            done = retval[1];
        }
    }
    catch(e) {
        throw(context.set_error(e, output));
    }
    stash.set('loop', oldloop);
})();

output += '\n            </tbody>\n            <tfoot>\n                <tr>\n                    <td class="" style="border-right : none" >\n                        <label class="pull_6">Total</label>\n                        <label class="push_6">';
//line 85 "bill-edit-add.html"
output += stash.get('total');
output += '</label>\n                    </td>\n                </tr>\n            </tfoot>\n        </table>\n    </li>\n</ul>';
    }
    catch(e) {
        var error = context.set_error(e, output);
        throw(error);
    }

    return output;
}

Jemplate.templateMap['bill-list-item.html'] = function(context) {
    if (! context) throw('Jemplate function called without context\n');
    var stash = context.stash;
    var output = '';

    try {
output += '\n<tr>\n        <td class=" grid_3" >';
//line 3 "bill-list-item.html"
output += stash.get(['item', 0, 'account', 0]);
output += '</td>\n\n        <td class=" grid_3"><a id="row_';
//line 5 "bill-list-item.html"
output += stash.get(['item', 0, 'bill_no', 0]);
output += '">';
//line 5 "bill-list-item.html"
output += stash.get(['item', 0, 'bill_no', 0]);
output += '</a></td>\n\n        <td class=" grid_3">';
//line 7 "bill-list-item.html"
output += stash.get(['item', 0, 'bill_date', 0]);
output += '</td>\n\n        <td class=" grid_3">';
//line 9 "bill-list-item.html"
output += stash.get(['item', 0, 'brokerage', 0]);
output += '</td>\n\n        <td class=" grid_3">';
//line 11 "bill-list-item.html"
output += stash.get(['item', 0, 'amount', 0]);
output += '</td>\n\n</tr>\n\n\n';
    }
    catch(e) {
        var error = context.set_error(e, output);
        throw(error);
    }

    return output;
}

Jemplate.templateMap['bill-list-view-menu.html'] = function(context) {
    if (! context) throw('Jemplate function called without context\n');
    var stash = context.stash;
    var output = '';

    try {
output += '<p>Action</p>\n<ul>\n\n    <li><a id="create">Add New Bill</a></li>\n\n    <li><a id="search">Search Bill</a></li>\n\n</ul>';
    }
    catch(e) {
        var error = context.set_error(e, output);
        throw(error);
    }

    return output;
}

Jemplate.templateMap['bill-list-view.html'] = function(context) {
    if (! context) throw('Jemplate function called without context\n');
    var stash = context.stash;
    var output = '';

    try {
output += '<ul>\n\n    <li>\n        <table class="basetable tablesorter" id="MyTable"  >\n            <thead>\n                <tr>\n                    <th class="grid_3"> Account </th>\n                    <th class="grid_3"> Bill No. </th>\n                    <th class="grid_3"> Bill Date </th>\n                    <th class="grid_3"> Brokerage </th>\n                    <th class="grid_3"> Amount </th>\n                </tr>\n            </thead>\n            <tbody id="new-row">\n\n                ';
//line 20 "bill-list-view.html"

// FOREACH 
(function() {
    var list = stash.get('list');
    list = new Jemplate.Iterator(list);
    var retval = list.get_first();
    var value = retval[0];
    var done = retval[1];
    var oldloop;
    try { oldloop = stash.get('loop') } finally {}
    stash.set('loop', list);
    try {
        while (! done) {
            stash.data['item'] = value;
output += '\n\n			';
//line 18 "bill-list-view.html"
output += context.process('bill-list-item.html');
output += '\n\n		';;
            retval = list.get_next();
            value = retval[0];
            done = retval[1];
        }
    }
    catch(e) {
        throw(context.set_error(e, output));
    }
    stash.set('loop', oldloop);
})();

output += '\n\n\n                \n            </tbody>\n            <tfoot>\n                <tr>\n                    <td class="" style="border-right : none" >\n                        <div id="page" class="grid_6"></div>\n                        <label class="pull_2">Total</label>\n                        <label class="push_1">';
//line 30 "bill-list-view.html"
output += stash.get('total_brokerage');
output += '</label>\n                        <label class="push_3">';
//line 31 "bill-list-view.html"
output += stash.get('total_amount');
output += '</label>\n                    </td>\n                </tr>\n            </tfoot>\n        </table>\n    </li>\n</ul>';
    }
    catch(e) {
        var error = context.set_error(e, output);
        throw(error);
    }

    return output;
}

Jemplate.templateMap['bill_report.html'] = function(context) {
    if (! context) throw('Jemplate function called without context\n');
    var stash = context.stash;
    var output = '';

    try {
output += '\n	  <div class="grid_17 main blue box" id="bill_report">\n        <form method="post">\n		   <fieldset class="">\n		        <ul class="form hii">\n				  <li class="grid_8">\n				    <label class="grid_3">From Date</label>\n				    <input type="text" class="datepicker grid_4" name="bill_from_dt">	\n				  </li>\n				  <li  class="grid_8">\n                             <label class="grid_3">Settelment No.</label>\n                            <input   type="text" class="grid_4" name="settelment_no" value="" />\n                  </li>\n      <!-- ---------------------------------------------------------------------------- -->\n				  <li class="grid_8">\n				    <label class="grid_3">To Date</label>\n				    <input type="text" class="datepicker grid_4" name="bill_to_dt">	\n				  </li>\n				  <li class="grid_8">\n                        <label class="grid_3">Security</label>\n                        <select class="grid_4">\n							<option>Reliance</option>\n						    <option>Tata</option>\n                        </select>\n						<span class="leftNote offset1 small"> <a id="add_security">Not found ? Click here to add</a></span>\n                  </li>\n	 <!-- ---------------------------------------------------------------------------- -->\n				  <li class="grid_17">\n				     <label class="grid_3">Settlement Type</label>\n					   <select class="grid_4">\n					     <option>Normal</option>\n						 <option>Rolling</option>\n                       </select>\n				  </li>\n				   <li class="grid_8">\n				     <label class="grid_3">Exchange</label>\n					   <select class="grid_4">\n					     <option>BSE</option>\n						 <option>NSE</option>\n                         <option>CMX</option>\n					  </select>\n				  </li>\n				  <li>\n                        <label class="grid_3">Family/Group</label>\n                        <input type="text" class="grid_4" id="" />\n						<span class="bottomNote offset1 small"><a>Not found ? Click here to add</a></span>\n                  </li>\n	<!-- ---------------------------------------------------------------------------- -->\n				 \n				  <li class="grid_17">\n				     <label class="grid_3">Transcation Type</label>\n					   <select class="grid_4">\n					     <option>Bought</option>\n						 <option>Sold</option>\n                       </select>\n				  </li>\n				  <li class="grid_8"></li>\n				  <li class="grid_8">\n                        <label class="grid_3">Broker</label>\n                        <input type="text" class="grid_4" id=""/>\n						<span class="bottomNote offset1 small"><a>Not found ? Click here to add</a></span>\n                  </li>\n				   <li class="grid_17">\n				     <label class="grid_3">Report Name</label>\n					   <input type="text" class="grid_4" id="report_name" />\n				  </li>\n				  <li class="grid_8"></li>\n				  <li class="grid_8">\n                        <label class="grid_3">Account</label>\n                        <input type="text" class="grid_4" id=""/>\n						<span class="bottomNote offset1 small"><a>Not found ? Click here to add</a></span>\n                  </li> \n				</ul>\n		   </fieldset>\n		      <li class="form hii">\n                    <input type="button" value="Search" class="button" />\n					<input type="submit" value="Save" class="button" />\n                    <input type=reset value="Reset" name="reset" class="button" />\n			  </li>\n		</form>\n      </div>\n';
    }
    catch(e) {
        var error = context.set_error(e, output);
        throw(error);
    }

    return output;
}

Jemplate.templateMap['edit-account.html'] = function(context) {
    if (! context) throw('Jemplate function called without context\n');
    var stash = context.stash;
    var output = '';

    try {
output += '<fieldset>\n    <ul class="form vhh">\n        <li>\n            <label class="grid_3" >Name</label>\n            <input class="grid_3" type="text" value="';
//line 5 "edit-account.html"
output += stash.get(['item', 0, 'account_name', 0]);
output += '" name="account_name" >\n        </li>\n        <li>\n            <label class="grid_3" >Address</label>\n            <input class="grid_3" type="text" value="';
//line 9 "edit-account.html"
output += stash.get(['item', 0, 'address', 0]);
output += '" name="address" >\n        </li>\n        <li>\n            <label class="grid_3" >Birth Date</label>\n            <input class="grid_3" type="text" value="';
//line 13 "edit-account.html"
output += stash.get(['item', 0, 'birth_date', 0]);
output += '" name="birth_date" >\n        </li>\n        <li>\n            <label class="grid_3" >Family</label>\n            <select class="grid_3" name="family" value="';
//line 17 "edit-account.html"
output += stash.get(['item', 0, 'family', 0]);
output += '" >\n                <option value="shah">shah\n                <option value="desai">desai\n            </select>\n        </li>\n        <li class="hii push_1">\n            <input type="button" value="Save" class="button grid_3"/>\n        </li>\n    </ul>\n</fieldset>\n';
    }
    catch(e) {
        var error = context.set_error(e, output);
        throw(error);
    }

    return output;
}

Jemplate.templateMap['misc-menu.html'] = function(context) {
    if (! context) throw('Jemplate function called without context\n');
    var stash = context.stash;
    var output = '';

    try {
output += '<p>Action</p>\n<ul>\n\n    <li><a id="update" name="view_account">View Account</a></li>\n\n    <li><a id="create" name="edit_account">Add New Account</a></li>\n\n    <li><a id="update" name="view_enumeration">View Enumeration</a></li>\n\n    <li><a id="create" name="edit_enumeration">Add New Enumeration</a></li>\n\n</ul>';
    }
    catch(e) {
        var error = context.set_error(e, output);
        throw(error);
    }

    return output;
}

Jemplate.templateMap['transaction-detail.html'] = function(context) {
    if (! context) throw('Jemplate function called without context\n');
    var stash = context.stash;
    var output = '';

    try {
output += '<label class="push_5"><h4>Transaction Details</h4></label>\n<ul class="form grid_14">\n    <li class="">\n        <label>Transaction No.</label>\n        <input class="grid_3" type="text" value="';
//line 5 "transaction-detail.html"
output += stash.get(['list', 0, 'transaction_no', 0]);
output += '">\n        <label>Security Type</label>\n        <select class="grid_3" name="security_type" value="';
//line 7 "transaction-detail.html"
output += stash.get(['list', 0, 'security_type', 0]);
output += '" >\n            <option value="equity">EQUITY\n            <option value="derivative">DERIVATIVE\n        </select>\n    </li>\n    <li class="">\n        <label>Transaction Date</label>\n        <input class="grid_3" type="text" value="';
//line 14 "transaction-detail.html"
output += stash.get(['list', 0, 'transaction_date', 0]);
output += '">\n        \n        <label>Transaction Type</label>\n        <select class="grid_3" name="transcation_type" value="';
//line 17 "transaction-detail.html"
output += stash.get(['list', 0, 'transcation_type', 0]);
output += '" >\n            <option value="speculative">SPECULATIVE\n            <option value="delivery">DELIVERY\n        </select>\n    </li>\n    <li>\n        <label>Units</label>\n        <input class="grid_3" type="text" name="units" value="';
//line 24 "transaction-detail.html"
output += stash.get(['list', 0, 'units', 0]);
output += '">\n        <label>Brought or Sold</label>\n        <select class="grid_3" name="bought_sold" value="';
//line 26 "transaction-detail.html"
output += stash.get(['list', 0, 'bought_sold', 0]);
output += '" >\n            <option value="brought">BROUGHT\n            <option value="sold">SOLD\n        </select>\n    </li>\n    <li>\n        <label>Rate</label>\n        <input class="grid_3" type="text" name="rate" value="';
//line 33 "transaction-detail.html"
output += stash.get(['list', 0, 'rate', 0]);
output += '">\n        <label>Brokerage Rate</label>\n        <input class="grid_3" type="text" name="brokerage_rate" value="';
//line 35 "transaction-detail.html"
output += stash.get(['list', 0, 'brokerage_rate', 0]);
output += '">\n    </li>\n    <li>\n        <label>Brokerage</label>\n        <input class="grid_3" type="text" name="brokerage" value="';
//line 39 "transaction-detail.html"
output += stash.get(['list', 0, 'brokerage', 0]);
output += '">\n        <label>Net Rate</label>\n        <input class="grid_3" type="text" name="net_rate" value="';
//line 41 "transaction-detail.html"
output += stash.get(['list', 0, 'net_rate', 0]);
output += '">\n    </li>\n    <li>\n        <label><h4>Net Value</h4></label>\n        <input class="grid_3" type="text" name="net_value" value="';
//line 45 "transaction-detail.html"
output += stash.get(['list', 0, 'net_value', 0]);
output += '">\n    </li>\n    <li class="form hii push_4">\n        <input type="button" value="Delete" class="button grid_3"/>\n        <input type="button" value="Edit/Save" class="button grid_3"/>\n    </li>\n</ul>\n    ';
    }
    catch(e) {
        var error = context.set_error(e, output);
        throw(error);
    }

    return output;
}

Jemplate.templateMap['transaction-list-item.html'] = function(context) {
    if (! context) throw('Jemplate function called without context\n');
    var stash = context.stash;
    var output = '';

    try {
output += '\n<tr>\n        <td class=" grid_3" ><a id="row_';
//line 3 "transaction-list-item.html"
output += stash.get(['item', 0, 'transaction_no', 0]);
output += '">';
//line 3 "transaction-list-item.html"
output += stash.get(['item', 0, 'transaction_no', 0]);
output += '</a></td>\n\n        <td class=" grid_3">';
//line 5 "transaction-list-item.html"
output += stash.get(['item', 0, 'transaction_date', 0]);
output += '</td>\n\n        <td class=" grid_3">';
//line 7 "transaction-list-item.html"
output += stash.get(['item', 0, 'security', 0]);
output += '</td>\n\n        <td class=" grid_3">';
//line 9 "transaction-list-item.html"
output += stash.get(['item', 0, 'transaction_type', 0]);
output += '</td>\n\n        <td class=" grid_3">';
//line 11 "transaction-list-item.html"
output += stash.get(['item', 0, 'amount', 0]);
output += '</td>\n\n</tr>\n\n\n';
    }
    catch(e) {
        var error = context.set_error(e, output);
        throw(error);
    }

    return output;
}

Jemplate.templateMap['view-account-list.html'] = function(context) {
    if (! context) throw('Jemplate function called without context\n');
    var stash = context.stash;
    var output = '';

    try {
output += '\n<tr>\n        <td class=" grid_3" >';
//line 3 "view-account-list.html"
output += stash.get(['item', 0, 'account_name', 0]);
output += '</td>\n\n        <td class=" grid_3">';
//line 5 "view-account-list.html"
output += stash.get(['item', 0, 'address', 0]);
output += '</td>\n\n        <td class=" grid_3">';
//line 7 "view-account-list.html"
output += stash.get(['item', 0, 'total_outstanding', 0]);
output += '</td>\n\n        <td class=" grid_3">';
//line 9 "view-account-list.html"
output += stash.get(['item', 0, 'total_brokerage', 0]);
output += '</td>\n\n        <td class=" grid_3">';
//line 11 "view-account-list.html"
output += stash.get(['item', 0, 'total_amount', 0]);
output += '</td>\n\n</tr>\n\n\n';
    }
    catch(e) {
        var error = context.set_error(e, output);
        throw(error);
    }

    return output;
}

Jemplate.templateMap['view-account.html'] = function(context) {
    if (! context) throw('Jemplate function called without context\n');
    var stash = context.stash;
    var output = '';

    try {
output += '<ul>\n\n    <li>\n        <table class="basetable tablesorter" id="MyTable"  >\n            <thead>\n                <tr>\n                    <th class="grid_3"> Account Name </th>\n                    <th class="grid_3"> Address </th>\n                    <th class="grid_3"> Total Outstanding </th>\n                    <th class="grid_3"> Total Brokerage </th>\n                    <th class="grid_3"> Total Amount </th>\n                </tr>\n            </thead>\n            <tbody id="new-row">\n\n                ';
//line 20 "view-account.html"

// FOREACH 
(function() {
    var list = stash.get('list');
    list = new Jemplate.Iterator(list);
    var retval = list.get_first();
    var value = retval[0];
    var done = retval[1];
    var oldloop;
    try { oldloop = stash.get('loop') } finally {}
    stash.set('loop', list);
    try {
        while (! done) {
            stash.data['item'] = value;
output += '\n\n			';
//line 18 "view-account.html"
output += context.process('view-account-list.html');
output += '\n\n		';;
            retval = list.get_next();
            value = retval[0];
            done = retval[1];
        }
    }
    catch(e) {
        throw(context.set_error(e, output));
    }
    stash.set('loop', oldloop);
})();

output += '\n\n\n\n            </tbody>\n            <tfoot>\n                <tr>\n                    <td class="" style="border-right : none" >\n                        <label class="push_1">Total</label>\n                        <label class="push_7">';
//line 29 "view-account.html"
output += stash.get('total_amount');
output += '</label>\n                    </td>\n                </tr>\n            </tfoot>\n        </table>\n    </li>\n</ul>';
    }
    catch(e) {
        var error = context.set_error(e, output);
        throw(error);
    }

    return output;
}

Jemplate.templateMap['view-enumeration-list.html'] = function(context) {
    if (! context) throw('Jemplate function called without context\n');
    var stash = context.stash;
    var output = '';

    try {
output += '<tr>\n        <td class=" grid_3" >';
//line 2 "view-enumeration-list.html"
output += stash.get(['item', 0, 'key_name', 0]);
output += '</td>\n        <td class="grid_3" >';
//line 3 "view-enumeration-list.html"
output += stash.get(['item', 0, 'key_name_temp', 0]);
output += '</td>\n\n        ';
//line 13 "view-enumeration-list.html"
if (stash.get(['item', 0, 'key_name_temp', 0]) == stash.get(['item', 0, 'key_name', 0])) {
output += '\n\n            ';
//line 7 "view-enumeration-list.html"
stash.set('data', stash.get('data') + stash.get(['item', 0, 'values', 0]));
output += '\n\n        ';
}
else {
output += '\n\n            ';
//line 11 "view-enumeration-list.html"
stash.set('data', stash.get(['item', 0, 'values', 0]));
output += '\n\n        ';
}

output += '\n\n        ';
//line 15 "view-enumeration-list.html"
stash.set(['item', 0, 'key_name_temp', 0], stash.get(['item', 0, 'key_name', 0]));
output += '\n\n        <td class="grid_3" >';
//line 17 "view-enumeration-list.html"
output += stash.get(['item', 0, 'key_name_temp', 0]);
output += '</td>\n        <td class="grid_3" >';
//line 18 "view-enumeration-list.html"
output += stash.get('data');
output += '</td>\n        \n</tr>\n\n\n';
    }
    catch(e) {
        var error = context.set_error(e, output);
        throw(error);
    }

    return output;
}

Jemplate.templateMap['view-enumeration.html'] = function(context) {
    if (! context) throw('Jemplate function called without context\n');
    var stash = context.stash;
    var output = '';

    try {
output += '<ul>\n\n    <li>\n        <table class="basetable tablesorter" id="MyTable"  >\n            <thead>\n                <tr>\n                    <th class="grid_3"> Key </th>\n                    <th class="grid_3"> Value </th>\n                </tr>\n            </thead>\n            <tbody id="new-row">\n\n                ';
//line 25 "view-enumeration.html"

// FOREACH 
(function() {
    var list = stash.get('list');
    list = new Jemplate.Iterator(list);
    var retval = list.get_first();
    var value = retval[0];
    var done = retval[1];
    var oldloop;
    try { oldloop = stash.get('loop') } finally {}
    stash.set('loop', list);
    try {
        while (! done) {
            stash.data['item'] = value;
output += '\n\n                ';
//line 15 "view-enumeration.html"
stash.set(['item', 0, 'key_name_temp', 0], stash.get(['item', 0, 'key_name', 0]));
output += '\n\n                    ';
//line 21 "view-enumeration.html"
if (stash.get(['item', 0, 'key_name_temp', 0]) == stash.get(['item', 0, 'key_name', 0])) {
output += '\n\n                            ';
//line 19 "view-enumeration.html"
output += context.process('view-enumeration-list.html');
output += '\n\n                    ';
}

output += '\n\n                    ';
//line 23 "view-enumeration.html"
stash.set(['item', 0, 'key_name_temp', 0], stash.get(['item', 0, 'key_name', 0]));
output += '\n\n                ';;
            retval = list.get_next();
            value = retval[0];
            done = retval[1];
        }
    }
    catch(e) {
        throw(context.set_error(e, output));
    }
    stash.set('loop', oldloop);
})();

output += '\n\n\n\n            </tbody>\n            <tfoot>\n                <tr>\n                    <td class="" style="border-right : none" >\n                    </td>\n                </tr>\n            </tfoot>\n        </table>\n    </li>\n</ul>';
    }
    catch(e) {
        var error = context.set_error(e, output);
        throw(error);
    }

    return output;
}

