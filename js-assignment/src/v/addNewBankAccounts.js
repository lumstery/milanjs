bA.v.addNewBankAccounts= {
    setupUserInterface: function () {
        var saveButton = document.forms['Account'].commit;
        // load all book objects
        Account.retrieveAll();
        // set an event handler for the submit/save button
        saveButton.addEventListener("click",
            bA.v.addNewBankAccounts.handleSaveButtonClickEvent);
        // set a handler for the event when the browser window/tab is closed
        window.addEventListener("beforeunload", Account.saveAll);
    },
    // save user input data
    handleSaveButtonClickEvent: function () {
        var formEl = document.forms['Account'];
        var slots = {
            iban: formEl.iban.value,
            bankName: formEl.bankName.value,
            ownerName: formEl.ownerName.value,
            currentBalance : formEl.currentBalance.value,
            openDate : formEl.openDate.value
        };
        Account.add(slots);
        formEl.reset();

    }
};