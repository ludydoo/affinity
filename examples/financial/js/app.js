function parseDate(input) {
    var parts = input.split('-');
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}

var accounts = new affinity.Relation([
    {account_id              : {type : affinity.Integer, autoIncrement : true}},
    {account_name            : {type : affinity.String }},
    {account_initial_balance : {type : affinity.Float  }},
    {account_type                    : {type : affinity.String}}
],[
    [  0, 'Checkings Account',   400.00, 'concrete' ],
    [  1, 'Credit Card',         200.00, 'concrete' ],
    [  2, 'Savings',             120.00, 'concrete' ],
    [  3, 'Student Loan',     -10000.00, 'concrete' ],
    [  4, 'Marie',                 0.00, 'virtual'  ],
    [  5, 'Nicolas',               0.00, 'virtual'  ],
    [  6, 'Easymage',              0.00, 'virtual'  ],
    [  7, 'Raymond',               0.00, 'virtual'  ],
    [  8, 'Michèle',               0.00, 'virtual'  ],
    [  9, 'Andréanne',             0.00, 'virtual'  ],
    [ 10, 'Rent',                  0.00, 'category' ],
    [ 11, 'Furniture',             0.00, 'category' ],
    [ 12, 'Electricity',           0.00, 'category' ],
    [ 13, 'Insurance',             0.00, 'category' ],
    [ 14, 'Appliances',            0.00, 'category' ],
    [ 15, 'Home Supplies',         0.00, 'category' ],
    [ 16, 'Food',                  0.00, 'category' ],
    [ 17, 'Scholarship',           0.00, 'category' ],
    [ 18, 'School Supplies',       0.00, 'category' ],
    [ 19, 'Transportation',        0.00, 'category' ]
]);

var concreteAccounts = accounts.restrict(accounts.get('account_type').eq('concrete'));

var transactions = new affinity.Relation([
    {transaction_id         : {type : affinity.Integer, autoIncrement : true}},
    {transaction_debit      : {type : affinity.Float, default : 0  }},
    {transaction_credit     : {type : affinity.Float, default : 0  }},
    {transaction_date       : {type : affinity.Date   }},
    {account_id             : {type : affinity.Integer}},
    {transaction_desc       : {type : affinity.String }}
],[
    [0, 1200.00, 0.00, parseDate('2014-01-01'), 0, 'January Rent'],
    [1, 1200.00, 0.00, parseDate('2014-02-01'), 0, 'February Rent'],
    [2, 1200.00, 0.00, parseDate('2014-03-01'), 0, 'March Rent'],
    [3, 1200.00, 0.00, parseDate('2014-04-01'), 0, 'April Rent'],
    [4, 1200.00, 0.00, parseDate('2014-05-01'), 0, 'May Rent'],
    [5, 1200.00, 0.00, parseDate('2014-06-01'), 0, 'June Rent'],
]);

var radiations = new affinity.Relation([
    {radiations_id    : {type : affinity.Integer, autoIncrement : true}},
    {transaction_id   : {type : affinity.Integer}},
    {account_id       : {type : affinity.Integer}},
    {radiation_amount : {type : affinity.Float  }}
],[
    [  0, 0,  4, 600.00 ],
    [  1, 0, 10, 600.00 ],
    [  2, 1,  4, 600.00 ],
    [  3, 1, 10, 600.00 ],
    [  4, 2,  4, 600.00 ],
    [  5, 2, 10, 600.00 ],
    [  6, 3,  4, 600.00 ],
    [  7, 3, 10, 600.00 ],
    [  8, 4,  4, 600.00 ],
    [  9, 4, 10, 600.00 ],
    [ 10, 5,  4, 600.00 ],
    [ 11, 6, 10, 600.00 ]
]);



$(function(){

    accounting.settings.currency.format = {
        pos : "%v",
        neg : "(%v)",
        zero: "-"
    };

    var transactionsElement = $('#transactions');
    var transactionsBody = transactionsElement.find('tbody');

    // Add transactions to transactions table
    transactions.each(function(transaction){

        var date = transaction.get('transaction_date');

        var day = date.getDate();
        var month = date.getMonth()+1;
        var year = date.getFullYear();

        if(month < 10){
            month = '0'+month;
        }else {
            month = month.toString();
        }

        if(day < 10 ){
            day = '0'+day;
        } else {
            day = day.toString();
        }

        var account = accounts.restrict(accounts.get('account_id').eq(transaction.get('account_id'))).first();

        var transactionElement = $('<tr>' +
            '<td>' + year+'-'+month+'-'+day+'</td>' +
            '<td>' + accounting.formatMoney(transaction.get('transaction_credit'),"", 2, " ", ",") +'</td>' +
            '<td>' + accounting.formatMoney(transaction.get('transaction_debit'),"", 2, " ", ",") +'</td>' +
            '<td>' + account.get('account_name') +'</td>' +
            '<td>' + transaction.get('transaction_desc') +'</td>' +
            '</tr>');

        transactionsBody.append(transactionElement) ;

    });

    var concreteAccountOptions = [];
    concreteAccounts.each(function(concreteAccount){
        concreteAccountOptions.push('<option value="'+concreteAccount.get("account_id")+'">'+concreteAccount.get('account_name')+'</option>')
    });

    var nowDate = new Date();

    var nowYear = nowDate.getFullYear();
    var nowMonth = nowDate.getMonth()+1;
    nowMonth = nowMonth<10?'0'+nowMonth:nowMonth.toString();
    var nowDay = nowDate.getDate();
    nowDay = nowDay<10?'0'+nowDay:nowDay.toString();

    var nowDateParsed = nowYear+'-'+nowMonth+'-'+nowDay;

    var transactionForm = $('<tr id="transactionFormRow">' +
            '<td><input class="dateInput" value="'+nowDateParsed+'"/></td>' +
            '<td><input class="creditInput" value="'+transactions.get('transaction_credit').default()+'"/></td>' +
            '<td><input class="debitInput"  value="'+transactions.get('transaction_debit').default()+'"/></td>' +
            '<td>' +
                '<select class="accountInput">' +
                    concreteAccountOptions.join('') +
                '</select>' +
            '</td>' +
            '<td><input class="descInput"/></td>' +
        '</tr><tr>' +
        '<td colspan="5">'+
        '<button type="submit" class="add">Add</button>'+
        '</td>'+
        '</tr>');

    var clicked = null;

    transactionsBody.append(transactionForm);

    transactionsElement.submit(function(e){

        e.preventDefault();

        var tuple;

        var date = parseDate(transactionsElement.find('.dateInput').val());
        var credit = transactionsElement.find('.creditInput').val();
        var debit = transactionsElement.find('.debitInput').val();
        var account = transactionsElement.find('.accountInput').val();
        var desc = transactionsElement.find('.descInput').val();

        tuple = {transaction_date : date, transaction_credit : credit, transaction_debit : debit, account_id : account, transaction_desc : desc};

        console.log(tuple);

        transactions.add(tuple);

    });

    transactions.ee.on('afterAdd', function(transaction){

        var date = transaction.get('transaction_date');

        var day = date.getDate();
        var month = date.getMonth()+1;
        var year = date.getFullYear();

        if(month < 10){
            month = '0'+month;
        }else {
            month = month.toString();
        }

        if(day < 10 ){
            day = '0'+day;
        } else {
            day = day.toString();
        }

        var account = accounts.restrict(accounts.get('account_id').eq(transaction.get('account_id'))).first();

        var transactionElement = $('<tr>' +
            '<td>' + year+'-'+month+'-'+day+'</td>' +
            '<td>' + accounting.formatMoney(transaction.get('transaction_credit'),"", 2, " ", ",") +'</td>' +
            '<td>' + accounting.formatMoney(transaction.get('transaction_debit'),"", 2, " ", ",") +'</td>' +
            '<td>' + account.get('account_name') +'</td>' +
            '<td>' + transaction.get('transaction_desc') +'</td>' +
            '</tr>');

        transactionElement.insertBefore($('#transactionFormRow'));

    });

});