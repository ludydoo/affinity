#!/bin/env node

var a = require('./../../index.js');


var data = {};


data.accountTypes = new a.Relation([
    { accountTypeId : {type : a.Integer}},
    { accountTypeName : {type : a.String}}
],[
    [0, 'Savings'],
    [1, 'Checking'],
    [2, 'Credit Card']
],{
    pk : 'accountTypeId'
});

console.log('\nAccount types : ');

data.accountTypes.print();


data.accounts = new a.Relation([
    {accountId : {type : a.Integer}},
    {accountTypeId : {type : a.Integer}},
    {accountName : {type : a.String}},
    {initialBalance : {type : a.Float} },
    {added : {type : a.Date}}
],[
    [0, 0, 'Desjardins', 0.00, new Date()],
    [1, 2, 'Visa', -12000.00, new Date()]
],{
    fk : [
        { columnNames : 'accountTypeId', referencedColumnNames : 'accountTypeId', referencedRelation : data.accountTypes}
    ]
});

data.accounts.print();

// Adding transactions

data.transactions = new a.Relation([
    {transactionId : {type : a.Integer}},
    {accountId : {type : a.Integer}},
    {amount : {type : a.Float}},
    {description : {type : a.String}},
    {date : {type : a.Date}}
],[
    [0, 0, -20.00, 'Withdrawal', new Date()],
    [1, 1, -10.00, 'Bought Shoes', new Date()],
    [2, 1, 10.00, 'Bought Gifts', new Date()]
]);

data.transactions.print();

data.transactions.add({
    transactionId : 3,
    accountId : 0,
    amount : -10.23,
    description : 'New Boobs',
    date : new Date()
});

data.transactions.add({
    transactionId : 4,
    accountId : 1,
    amount : -100,
    description : 'New Furs',
    date : new Date()
});

var transactionsView = data.transactions
    .join(data.accounts)
    .project(['accountId', 'amount', 'date', 'transactionId']);

transactionsView.print();

var transactionsViewGrouped = transactionsView.group('account', ['transactionId', 'date', 'amount']);

transactionsViewGrouped.print();
