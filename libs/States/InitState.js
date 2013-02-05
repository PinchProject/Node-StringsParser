var State = require('./State.js');

function InitState(stringsParser) {
    State.apply(this);

    this._stringsParser = stringsParser;
    this._used = ['"', '/'];
    this._ignored = [' ', '\n', '\t', '\r'];
}

InitState.prototype = {
    handle:function handle(c, callback) {
        var KeyState = require('./KeyState.js'),
            StartCommentState = require('./StartCommentState.js');

        var IgnoreAction = require('../Actions/IgnoreAction.js'),
            ChangeStateAction = require('../Actions/ChangeStateAction.js');

        var self = this;

        if (self._used.indexOf(c) >= 0) {
            switch (c) {
                case '"':
                    callback(null, new ChangeStateAction(new KeyState(self._stringsParser)));
                    break;
                case '/':
                    callback(null, new ChangeStateAction(new StartCommentState(self._stringsParser)));
                    break;
            }
        } else if (self._ignored.indexOf(c) >= 0) {
            callback(null, new IgnoreAction());
        } else {
            callback('Character not handled');
        }
    }
};

module.exports = InitState;
