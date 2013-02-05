var State = require('./State.js');

/**
 *
 * @param stringsParser
 * @param key
 * @constructor
 */
function EscapeState(stringsParser, key) {
    State.apply(this);

    this._stringsParser = stringsParser;
    this._accepted = ['\'', '"', '\\'];
    this._issue = [' ', '\n', '\t', '\r'];
    this._key = key || '';
}

EscapeState.prototype = {
    /**
     * Character handler
     *
     * @param c
     * @param callback
     */
    handle:function handle(c, callback) {
        var ValueState = require('./ValueState.js');

        var StoreAction = require('../Actions/StoreAction.js'),
            ChangeStateAction = require('../Actions/ChangeStateAction.js');

        var self = this;

        if (self._accepted.indexOf(c) >= 0) {
            new StoreAction(c, self).perform(self._stringsParser, function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, new ChangeStateAction(new ValueState(self._stringsParser, self._key)));
                }
            });
        } else {
            callback('Character error');
        }
    }
};

module.exports = EscapeState;
