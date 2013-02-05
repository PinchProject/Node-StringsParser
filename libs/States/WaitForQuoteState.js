var State = require('./State.js');

/**
 *
 * @param stringsParser
 * @constructor
 */
function WaitForQuoteState(stringsParser) {
    State.apply(this);

    this._stringsParser = stringsParser;
    this._ignored = [' ', '\n', '\t', '\r'];
}

WaitForQuoteState.prototype = {
    /**
     * Character handler
     *
     * @param c
     * @param callback
     */
    handle:function handle(c, callback) {
        var ValueState = require('./ValueState.js');

        var ChangeStateAction = require('../Actions/ChangeStateAction.js'),
            IgnoreAction = require('../Actions/IgnoreAction.js');

        var self = this;

        if (c === '"') {
            callback(null, new ChangeStateAction(new ValueState(self._stringsParser)));
        } else if (self._ignored.indexOf(c) >= 0) {
            callback(null, new IgnoreAction());
        } else {
            callback('Character must be " or whitespaces (\\n,\\r,\\t, )');
        }
    }
};

module.exports = WaitForQuoteState;
