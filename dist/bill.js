'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BillManager = function BillManager() {
    var data = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    _classCallCheck(this, BillManager);

    this.date_due = '';
    this.name = '';
    this.value = 0;
    this.done = false;
    Object.assign(this.data);
};