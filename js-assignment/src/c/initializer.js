/**
 * @fileOverview  Defining the main namespace ("bank account") and its MVC subnamespaces
 * @author Marian Milian
 */
'use strict';
// main namespace bA = "bank account"
var bA = { m:{}, v:{}, c:{} };

Date.prototype.toFormattedString = function (f)
{
    var monthName = this.getMonthName();
    var month = this.getMonth();
    var dayName = this.getDayName();
    var year = this.getFullYear();
    var date = this.getDate();

    // Year patterns replacement
    f = f.replace(/yyyy/g, year);
    f = f.replace(/yy/g, String(year).substr(2,2));
    // Month patterns replacement
    f = f.replace(/MMM/g, monthName.substr(0,3).toUpperCase());
    f = f.replace(/Mmm/g, monthName.substr(0,3));
    f = f.replace(/MM\*/g, monthName.toUpperCase());
    f = f.replace(/Mm\*/g, monthName);
    f = f.replace(/mm/g, String(month+1).padLeft('0',2));
    // Day patterns replacement
    f = f.replace(/DDD/g, dayName.substr(0,3).toUpperCase());
    f = f.replace(/Ddd/g, dayName.substr(0,3));
    f = f.replace(/DD\*/g, dayName.toUpperCase());
    f = f.replace(/Dd\*/g, dayName);
    f = f.replace(/dd/g, String(date).padLeft('0',2));
    f = f.replace(/d\*/g, date);

    return f;
};
Date.prototype.getMonthName = function ()
{
    return this.toLocaleString().replace(/[^a-z]/gi,'');
};

//n.b. this is sooo not i18n safe :)
Date.prototype.getDayName = function ()
{
    switch(this.getDay())
    {
        case 0: return 'Sunday';
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
    }
};

String.prototype.padLeft = function (value, size)
{
    var x = this;
    while (x.length < size) {x = value + x;}
    return x;
};