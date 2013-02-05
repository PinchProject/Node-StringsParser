var State = require('./State.js');

function StartCommentState(stringsParser) {
    State.apply(this);

    this._stringsParser = stringsParser;
    this._used = ['/', '*'];
}

StartCommentState.prototype = {
    handle:function handle(c, callback) {
        var MultiCommentState = require('./MultiCommentState.js'),
            SingleCommentState = require('./SingleCommentState.js');

        var ChangeStateAction = require('../Actions/ChangeStateAction.js');

        var self = this;

        if (self._used.indexOf(c) >= 0) {
            switch (c) {
                case '/':
                    callback(null, new ChangeStateAction(new SingleCommentState(self._stringsParser)));
                    break;
                case '*':
                    callback(null, new ChangeStateAction(new MultiCommentState(self._stringsParser)));
                    break;
            }
        } else {
            callback('Character error');
        }
    }
};

module.exports = StartCommentState;
