var State = require('./State.js');

/**
 *
 * @param stringsParser
 * @param key
 * @constructor
 */
function ValueState(stringsParser, key) {
    State.apply(this);

    this._stringsParser = stringsParser;
    this._key = key || '';
}

ValueState.prototype = {
    /**
     * Character handler
     *
     * @param c
     * @param callback
     */
    handle:function handle(c, callback) {
        var WaitForSemicolonState = require('./WaitForSemicolonState.js'),
            EscapeState = require('./EscapeState.js');

        var StoreAction = require('../Actions/StoreAction.js'),
            ChangeStateAction = require('../Actions/ChangeStateAction.js');

        var self = this;

        if (c === '\\') {
            new StoreAction(c, self).perform(self._stringsParser, function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, new ChangeStateAction(new EscapeState(self._stringsParser, self._key)));
                }
            });
        } else if (c === '"') {
            self._stringsParser._callbacks.onValueFound(self._key);
            callback(null, new ChangeStateAction(new WaitForSemicolonState(self._stringsParser)));
        } else {
            callback(null, new StoreAction(c, self));
        }
    }
};

module.exports = ValueState;
