var Action = require('./Action.js');

/**
 *
 * @param c
 * @param keyState
 * @constructor
 */
function StoreAction(c, keyState) {
    Action.apply(this);

    this._char = c;
    this._keyState = keyState;
}

StoreAction.prototype = {
    /**
     * Append character in 'key' variable
     *
     * @param stringsParser
     * @param callback
     */
    perform:function perform(stringsParser, callback) {
        var self = this;

        self._keyState._key += self._char;

        callback();
    }
};

module.exports = StoreAction;
