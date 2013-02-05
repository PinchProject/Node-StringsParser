var State = require('./State.js');

var KeyState = function KeyState(stringsParser) {
    State.apply(this);

    this._stringsParser = stringsParser;
    this._issue = ['\n', '\t', '\r'];
    this._key = '';
};

KeyState.prototype = {
    handle:function handle(c, callback) {
        var WaitForEqualState = require('./WaitForEqualState.js');

        var StoreAction = require('../Actions/StoreAction.js'),
            ChangeStateAction = require('../Actions/ChangeStateAction.js');

        var self = this;

        if (self._issue.indexOf(c) >= 0) {
            callback('Character can not be in the key');
        } else if (c === '"') {
            self._stringsParser._callbacks.onKeyFound(self._key);
            callback(null, new ChangeStateAction(new WaitForEqualState(self._stringsParser)));
        } else {
            callback(null, new StoreAction(c, self));
        }
    }
};

module.exports = KeyState;
