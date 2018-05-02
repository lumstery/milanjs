
bA.v.deleteBankAccount={
    setupUserInterface:function () {
       var deleteButton= document.forms["Account"].commit;
       var selectEl =document.forms["Account"].selectAccount;
       var key="", keys=[], account=null, optionEl=null, i=0;
        // load all book objects
        Account.retrieveAll();
        keys = Object.keys( Account.instances);
        // populate the selection list with books
        for (i=0; i < keys.length; i++) {
            key = keys[i];
            account = Account.instances[key];
            optionEl = document.createElement("option");
            optionEl.label = account.ownerName;
            optionEl.value =account.iban;
            selectEl.add( optionEl, null);
        }
        // Set an event handler for the submit/delete button
        deleteButton.addEventListener("click",
            bA.v.deleteBankAccount.handleDeleteButtonClickEvent);
        // Set a handler for the event when the browser window/tab is closed
        window.addEventListener("beforeunload", Account.saveAll);
    },
    // Event handler for deleting a book
    handleDeleteButtonClickEvent: function () {
        var selectEl = document.forms['Account'].selectAccount;
        var iban = selectEl.value;
        if (iban) {
            Account.destroy( iban);
            // remove deleted book from select options
            selectEl.remove( selectEl.selectedIndex);
        }
    }
};
        

