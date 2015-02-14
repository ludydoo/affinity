#!/bin/env node

var a = require('./../../index.js');

var data = {};

data.accountTypes = new a.Relation([
    { id : {type : a.Integer, autoIncrement : true}},
    { name : {type : a.String}}
],[
    [undefined, 'Savings'],
    [undefined, 'Checking'],
    [undefined, 'Credit Card']
],{
    pk : 'id'
});

console.log('Account Types : ');

data.accountTypes.print();

data.accounts = new a.Relation([
    {id : {type : a.Integer, autoIncrement : true}},
    {accountTypeId : {type : a.Integer}},
    {name : {type : a.String}},
    {initialBalance : {type : a.Float} },
    {added : {type : a.Date}}
],[
    [undefined, 0, 'Desjardins', 0.00, new Date()],
    [undefined, 2, 'Visa', -12000.00, new Date()]
],{
    pk : 'id',
    fk : [
        {
            columnNames           : 'accountTypeId',
            referencedColumnNames : 'id',
            referencedRelation    : data.accountTypes
        }
    ]
});

console.log('Accounts : ');

data.accounts.print();



data.transactionTypes = new a.Relation([
    {id : {type : a.Integer, autoIncrement : true}},
    {name : {type : a.String}},
    {parentId : {type : a.Integer}}
],[
    [0, 'Root', 0],
    [1, 'Home', 0],
    [2, 'Transport', 0],
    [3, 'Sports', 0],
    [4, 'Entertainment', 0],
    [5, 'Bills & Utilities', 0],
    [6, 'Income', 0],
    [7, 'Uncategorized', 0],
    [8, 'Clothing', 0],
    [9, 'Donations and Gifts', 0]
],{
    pk : 'id',
    fk : [
        {
            columnNames : 'parentId',
            referencedColumnNames : 'id',
            selfReferencing : true
        }
    ]
});

console.log('Transaction Types');

data.transactionTypes.print();


// Adding transactions

data.transactions = new a.Relation([
    {id : {type : a.Integer, autoIncrement : true}},
    {accountId : {type : a.Integer}},
    {transactionTypeId : {type : a.Integer}},
    {amount : {type : a.Float}},
    {description : {type : a.String}},
    {date : {type : a.Date}}
],[
    [undefined, 0, 7,  -20.00, 'Withdrawal',   new Date()],
    [undefined, 1, 8,  -10.00, 'Bought Shoes', new Date()],
    [undefined, 1, 9,   10.00, 'Bought Gifts', new Date()],
    [undefined, 0, 4,  -10.23, 'New Boobs',    new Date()],
    [undefined, 1, 4, -100.00, 'New Furs',     new Date()]
],{
    pk : 'id',
    fk : [
        {
            columnNames           : 'accountId',
            referencedColumnNames : 'id',
            referencedRelation    : data.accounts
        },
        {
            columnNames           : 'transactionTypeId',
            referencedColumnNames : 'id',
            referencedRelation    : data.transactionTypes
        }
    ]
});

// data.transactions.pk(['id']);

// data.transactions.pk('id');

// data.transactions.uks().add(['']);

// data.transactions.indexes().add(['id', 'accountId', 'transactionTypeId']);

// data.transactions.indexes().remove(['id', 'accountId', 'transactionTypeId']);

// data.transactions.fks().add({
//   columnNames : ['accountId'],
//   referencedRelation : data.accounts,
//   referencedColumnNames : ['id'],
//   onDelete : 'cascade',
//   onUpdate : 'cascade'
// });

console.log('Transactions : ');

data.transactions.print();