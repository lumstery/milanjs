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
    Account.saveAll();
    console.log("Account " + slots.iban + " modified!");
};

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
        var year  = parseInt(dateParts[0]);
        var month = normalizeMonth(parseInt(dateParts[1]));
        var date  = parseInt(dateParts[2]);
        return createDateAsUTC(new Date(year, month, date, 0, 0, 0));

    }

}

function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

function convertDateToUTC(date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}

//  Create and save test data
Account.createTestData = function () {
    Account.instances["DE89860100900123456789"] = new Account(
        {
            iban: "DE89860100900123456789",
            bankName: "Postbank Leipzig",
            ownerName: "Hans Meier",
            openDate: createDateAsUTC(new Date(2009, normalizeMonth(5), 12, 0, 0, 0)),
            currentBalance: 200.39
        });
    Account.instances["DE89120700000047114711"] = new Account(
        {
            iban: "DE89120700000047114711",
            bankName: "Deutsche Account Berlin",
            ownerName: "Hans Meier",
            openDate: createDateAsUTC(new Date(2011, normalizeMonth(11), 11, 0, 0, 0)),
            currentBalance: 1200.55
        });
    Account.instances["DE66100800000047114711"] = new Account(
        {
            iban: "DE66100800000047114711",
            bankName: "Commerzbank Berlin",
            ownerName: "Erna Meier",
            openDate: createDateAsUTC(new Date(2013, normalizeMonth(2), 22, 0, 0, 0)),
            currentBalance: 62.89
        });
    Account.saveAll();
};

// month in JS starts from 0
// so we should pass month number - 1 , to have correct date
// e.g January has number 1 but in JS it has number 0 etc.

function normalizeMonth(month){
    return month-1;
}

Account.clearData = function () {
    if (confirm("do you realy want to  delete all accounts data?")) {
        Account.instances = {};
        localStorage.setItem("account", "{}");
    }
};