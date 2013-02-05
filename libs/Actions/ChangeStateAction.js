var Action = require('./Action.js');

function ChangeStateAction(state) {
    Action.apply(this);

    this._state = state;
}

ChangeStateAction.prototype = {
    perform:function perform(stringsParser, callback) {
        var self = this;

        stringsParser._setState(self._state);

        callback();
    }
};

module.exports = ChangeStateAction;
