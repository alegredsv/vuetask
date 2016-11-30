'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BillManager = function () {
    function BillManager() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, BillManager);

        this.date_due = '';
        this.name = '';
        this.value = 0;
        this.done = false;
        Object.assign(this, data);
    }

    _createClass(BillManager, [{
        key: 'toJSON',
        value: function toJSON() {
            var date_duo = typeof this.date_due === 'string' && this.date_due.length == 10 ? this.date_due : this.date_due.toISOString().substring(0, 10);
            return {

                date_due: date_duo,
                name: this.name,
                value: this.value,
                done: this.done

            };
        }
    }]);

    return BillManager;
}();