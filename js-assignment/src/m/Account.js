/*
 * Constructor function for the class Account
 * @constructor
 * @param {{iban: String, bankName:String, ownerName: String, openDate:Date, currentBalance:Decimal}} slots - Object creation slots.
 */
function Account(slots) {
    this.iban = slots.iban;
    this.bankName = slots.bankName;
    this.ownerName = slots.ownerName;
    this.openDate =parseDate(slots.openDate);
    this.currentBalance = slots.currentBalance;
};

Account.instances = {};

// Convert row to object
Account.convertRow2Obj = function (accountRow) {
    var account = new Account(accountRow);
    return account;
};

Account.add = function (slots) {
    var account = new Account(slots);
    // add accout to the Account.instances collection
    Account.instances[slots.iban] = account;
    console.log("Account " + slots.iban + " created!");
};

//  Update an existing book row
Account.update = function (slots) {
    var account = Account.instances[slots.iban];
    if (account.ownerName !== slots.ownerName) account.ownerName = slots.ownerName;
    if (account.bankName !== slots.bankName) account.bankName = slots.bankName;
    if (account.currentBalance !== slots.currentBalance) account.currentBalance = slots.currentBalance;
    if (account.openDate !== slots.openDate) account.openDate = parseDate(slots.openDate);
    Account.saveAll();*/*-+-0
    console.log("Account " + slots.iban + " modified!");
};

function parseDate(dateOrString) {

    if (dateOrString instanceof Date) {
        return dateOrString;
    }
    else {
        var dateWithOutTime=dateOrString ;
        if (dateOrString.indexOf("T") !==-1) {
            dateWithOutTime = dateOrString.split("T")[0];
        }
        var dateParts = dateWithOutTime.split("-");
        return new Date(parseInt(dateParts[0]), parseInt(dateParts[1]), parseInt(dateParts[2]))

    }

}

//  Delete a book row from persistent storage
Account.destroy = function (iban) {
    if (Account.instances[iban]) {
        console.log("Account" + iban + " deleted");
        delete Account.instances[iban];
    } else {
        console.log("There is no account with IBAN " + iban + " in the database!");
    }
};

// Load the account table from Local Storage
Account.retrieveAll = function () {
    var key = "", keys = [], accountString = "", accounts = {}, i = 0;
    try {
        if (localStorage.getItem("account")) {
            accountString = localStorage.getItem("account");
        }
    } catch (e) {
        alert("Error when reading from Local Storage\n" + e);
    }
    if (accountString) {
        accounts = JSON.parse(accountString);
        keys = Object.keys(accounts);
        console.log(keys.length + " acconts loaded.");
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            Account.instances[key] = Account.convertRow2Obj(accounts[key]);
        }
    }
};

Account.saveAll = function () {
    var accountString = "", error = false,
        nmrOfAccount = Object.keys(Account.instances).length;
    try {
        accountString = JSON.stringify(Account.instances);
        localStorage["account"] = accountString;
    } catch (e) {
        alert("Error when writing to Local Storage\n" + e);
        error = true;
    }
    if (!error) console.log(nmrOfAccount + "account saved.");
};

//  Create and save test data
Account.createTestData = function () {
    Account.instances["DE89860100900123456789"] = new Account(
        {
            iban: "DE89860100900123456789",
            bankName: "Postbank Leipzig",
            ownerName: "Hans Meier",
            openDate: new Date(2009, 5, 12),
            currentBalance: 200.39
        });
    Account.instances["DE89120700000047114711"] = new Account(
        {
            iban: "DE89120700000047114711",
            bankName: "Deutsche Account Berlin",
            ownerName: "Hans Meier",
            openDate: new Date(2011, 11, 11),
            currentBalance: 1200.55
        });
    Account.instances["DE66100800000047114711"] = new Account(
        {
            iban: "DE66100800000047114711",
            bankName: "Commerzbank Berlin",
            ownerName: "Erna Meier",
            openDate: new Date(2013, 2, 21),
            currentBalance: 62.89
        });
    Account.saveAll();
};

Account.clearData = function () {
    if (confirm("do you realy want to  delete all accounts data?")) {
        Account.instances = {};
        localStorage.setItem("account", "{}");
    }
};


// Account.dateFormat=function dateToYMD(date) {
//     var d = date.getDate();
//     var m = date.getMonth() + 1; //Month from 0 to 11
//     var y = date.getFullYear();
//     return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
// }
