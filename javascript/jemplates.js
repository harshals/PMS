/*
   This JavaScript code was generated by Jemplate, the JavaScript
   Template Toolkit. Any changes made to this file will be lost the next
   time the templates are compiled.

   Copyright 2006-2008 - Ingy döt Net - All rights reserved.
*/

if (typeof(Jemplate) == 'undefined')
    throw('Jemplate.js must be loaded before any Jemplate template files');

Jemplate.templateMap['Process.html'] = function(context) {
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

Jemplate.templateMap['Total.html'] = function(context) {
    if (! context) throw('Jemplate function called without context\n');
    var stash = context.stash;
    var output = '';

    try {
output += '<tr><td class="" style="border-right : none" >\n    <label class="pull_6">Total</label>\n    <!--<label class="push_6">';
//line 3 "Total.html"
output += stash.get('total_amount');
output += '</label>-->\n    </td>\n</tr>';
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
output += '<form class="form blue" action="">\n    <fieldset>\n        <legend></legend>\n            <ul class="vhh">\n                <li>\n                    <label style="border-bottom : none"class="">Bill No</label>\n                    <input class="" type="text" name="bill_no" value=""/>\n                </li>\n                <li>\n                    <label class="">Bill Date</label>\n                    <input class=" datepicker" type="text" name="bill_date" value="" />\n                </li>\n                <li>\n                    <label class="">Broker</label>\n                    <select class="" name="broker">\n                        <option value="rss">RSS\n                        <option value="hdfc">HDFC\n                    </select>\n                </li>\n            </ul>\n            <ul class="vhh">\n                <li>\n                    <label class="grid_3">Settlement No</label>\n                    <input class="" type="text" name="settlement_no" value=""/>\n                </li>\n                <li>\n                    <label class="grid_3">Settlement Type</label>\n                    <select class="" name="settlement_type">\n                        <option value="normal">NORMAL\n                        <option value="rolling">ROLLING\n                    </select>\n                </li>\n                <li>\n                    <label class="grid_3">Exchange</label>\n                    <select class="" name="exchange">\n                        <option value="bse">BSE\n                        <option value="nse">NSE\n                        <option value="cmx">CMX\n                    </select>\n                </li>\n            </ul>\n            <ul class="vhh">\n                <li>\n                    <label class="">Period</label>\n                </li>\n                <li>\n                    <input class="" type="text" name="from_period" value=""/>\n                </li>\n                <li>\n                    <input type="text" name="to_period" value=""/>\n                </li>\n            </ul>\n    </fieldset>\n</form>\n<ul>\n    \n    <li>\n        <table class="basetable tablesorter" id="MyTable"  >\n            <thead>\n                <tr>\n                    <td style="border-right : none">\n                    <label class="pull_5"> List Of Trasactions </label>\n                    <label class="push_5" id="add-new"><a>Add New Transaction</a></label>\n                    </td>\n                </tr>\n                <tr>\n                    <td class="grid_3"> Transaction No </td>\n                    <td class="grid_3"> Transaction Date </td>\n                    <td class="grid_3"> Security </td>\n                    <td class="grid_3"> Type </td>\n                    <td class="grid_3"> Amount </td>\n                </tr>\n            </thead>\n            <tbody id="new-row">\n\n            </tbody>\n        </table>\n    </li>\n</ul>';
    }
    catch(e) {
        var error = context.set_error(e, output);
        throw(error);
    }

    return output;
}

Jemplate.templateMap['delete_save.html'] = function(context) {
    if (! context) throw('Jemplate function called without context\n');
    var stash = context.stash;
    var output = '';

    try {
output += '<ul class="form hii vvv">\n    <li>\n        <input type="button" value="Delete" class="button grid_3"/>\n    </li>\n    <li>\n        <input type="button" value="Edit/Save" class="button grid_3"/>\n    </li>\n</ul>';
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
output += '<ul class="form vvv">\n    <li>\n        <label class="push_1"><h4>Transaction Details</h4></label>\n    </li>\n    <li>\n        <label>Transaction Detail :</label>\n        <input type="text" value="">\n    </li>\n    <li>\n        <label>Transaction Date :</label>\n        <input type="text" value="">\n    </li>\n    <li>\n        <label>Securitye Type :</label>\n        <input type="text" value="">\n    </li>\n    <li>\n        <label>Transaction Type :</label><input type="text" value="">\n    </li>\n    <li>\n        <label>Brought or Sold :</label>\n        <input type="text" value="">\n    </li>\n    <li>\n        <label>Units :</label>\n        <input type="text" value="">\n    </li>\n    <li>\n        <label>Rate :</label>\n        <input type="text" value="">\n    </li>\n    <li>\n        <label>Brokerage Rate :</label>\n        <input type="text" value="">\n    </li>\n    <li>\n        <label>Brokerage :</label>\n        <input type="text" value="">\n    </li>\n    <li>\n        <label>Net Rate :</label>\n        <input type="text" value="">\n    </li>\n    <li>\n        <label><h4>Net Value :</h4></label>\n        <input type="text" value="">\n    </li>\n    <li class="form hii">\n        <input type="button" value="Delete" class="button grid_3"/>\n    </li>\n    <li class="form hii">\n        <input type="button" value="Edit/Save" class="button grid_3"/>\n    </li>\n</ul>';
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
output += '\n    <tr class="">\n        <td class=" grid_3" id="row"><a>';
//line 3 "transaction-list-item.html"
output += stash.get(['item', 0, 'transaction_no', 0]);
output += '</a></td>\n\n		<td class=" grid_3">';
//line 5 "transaction-list-item.html"
output += stash.get(['item', 0, 'transaction_date', 0]);
output += '</td>\n\n		<td class=" grid_3">';
//line 7 "transaction-list-item.html"
output += stash.get(['item', 0, 'security', 0]);
output += '</td>\n\n                <td class=" grid_3">';
//line 9 "transaction-list-item.html"
output += stash.get(['item', 0, 'transaction_type', 0]);
output += '</td>\n\n		<td class=" grid_3">';
//line 11 "transaction-list-item.html"
output += stash.get(['item', 0, 'amount', 0]);
output += '</td>\n\n    </tr>\n\n\n';
    }
    catch(e) {
        var error = context.set_error(e, output);
        throw(error);
    }

    return output;
}

