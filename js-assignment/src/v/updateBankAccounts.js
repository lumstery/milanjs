

bA.v.updateBankAccount = {
    setupUserInterface: function () {
        var formEl = document.forms['Account'],
            saveButton = formEl.commit,
            selectBookEl = formEl.selecAccount;
        var key="", keys=[], account=null, optionEl=null, i=0;
        // load all account objects
        Account.retrieveAll();
        // populate the selection list with books
        keys = Object.keys( Account.instances);
        for (i=0; i < keys.length; i++) {
            key = keys[i];
            account = Account.instances[key];
            optionEl = document.createElement("option");
            optionEl.text =account.ownerName;
            optionEl.value=account.iban;
            selectBookEl.add( optionEl, null);
        }
        // when a book is selected, fill the form with its data
        selectBookEl.addEventListener("change",
            bA.v.updateBankAccount.handleAccountSelectionEvent);
        // set an event handler for the submit/save button
        saveButton.addEventListener("click",bA.v.updateBankAccount.handleSaveButtonClickEvent);
        // handle the event when the browser window/tab is closed
        window.addEventListener("beforeunload", Account.saveAll);
    },

    handleAccountSelectionEvent: function () {
        var formEl = document.forms['Account'];
        var selectBookEl = formEl.selecAccount,
            account=null, key = selectBookEl.value;
        if (key) {
            account= Account.instances[key];
            formEl.ownerName.value = account.ownerName;
            formEl.bankName.value = account.bankName;
            formEl.iban.value=account.iban;
            formEl.currentBalance.value =account.currentBalance;
            formEl.openDate.value =bA.v.formatDate(account.openDate);
        } else {
            formEl.reset();
        }
    },



    // save data
    handleSaveButtonClickEvent: function () {
        var formEl = document.forms['Account'],
            selectBookEl = formEl.selecAccount;
        var slots = {
            iban: formEl.iban.value,
            bankName: formEl.bankName.value,
            ownerName: formEl.ownerName.value,
            currentBalance: formEl.currentBalance.value,
            openDate:formEl.openDate.value
        };
        Account.update( slots);
        // update the selection list option
        selectBookEl.options[selectBookEl.selectedIndex].text = slots.ownerName;
        formEl.reset();
    }
};