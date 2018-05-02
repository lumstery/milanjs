

bA.v.showListOfBankAccounts = {



    setupUserInterface: function () {
        var tableBodyEl = document.querySelector("table#Account>tbody");
        var keys=[], key="", row={}, i=0;
        // load all account objects
        Account.retrieveAll();
        keys = Object.keys(Account.instances);
        // for each account , create a table row with a cell for each attribute
        for (i=0; i < keys.length; i++) {
            key = keys[i];
            row = tableBodyEl.insertRow();
            row.insertCell(-1).textContent = Account.instances[key].iban;
            row.insertCell(-1).textContent = Account.instances[key].bankName;
            row.insertCell(-1).textContent = Account.instances[key].ownerName;
            row.insertCell(-1).textContent = bA.v.formatDate(Account.instances[key].openDate);
            row.insertCell(-1).textContent = Account.instances[key].currentBalance;
        }
    }


};