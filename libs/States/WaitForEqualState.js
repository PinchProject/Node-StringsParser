var State = require('./State.js');

/**
 *
 * @param stringsParser
 * @constructor
 */
function WaitForEqualState(stringsParser) {
    State.apply(this);

    this._stringsParser = stringsParser;
    this._ignored = [' ', '\n', '\t', '\r'];
}

WaitForEqualState.prototype = {
    /**
     * Character handler
     *
     * @param c
     * @param callback
     */
    handle:function handle(c, callback) {
        var WaitForQuoteState = require('./WaitForQuoteState.js');

        var IgnoreAction = require('../Actions/IgnoreAction.js'),
            ChangeStateAction = require('../Actions/ChangeStateAction.js');

        var self = this;

        if (c === '=') {
            callback(null, new ChangeStateAction(new WaitForQuoteState(self._stringsParser)));
        } else if (self._ignored.indexOf(c) >= 0) {
            callback(null, new IgnoreAction());
        } else {
            callback('Character must be "=" or whitespaces (\\n,\\r,\\t, )');
        }
    }
};

module.exports = WaitForEqualState;
