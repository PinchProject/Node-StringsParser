var Action = require('./Action.js');

function StoreAction(c, keyState) {
    Action.apply(this);

    this._char = c;
    this._keyState = keyState;
}

StoreAction.prototype = {
    perform:function perform(stringsParser, callback) {
        var self = this;

        self._keyState._key += self._char;

        callback();
    }
};

module.exports = StoreAction;
