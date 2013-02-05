var State = require('./State.js');

/**
 *
 * @param stringsParser
 * @param key
 * @param c
 * @constructor
 */
function WaitForSlashState(stringsParser, key, c) {
    State.apply(this);

    this._stringsParser = stringsParser;
    this._key = key || '';
    this._c = c || '';
}

WaitForSlashState.prototype = {
    /**
     * Character handler
     *
     * @param c
     * @param callback
     */
    handle:function handle(c, callback) {
        var InitState = require('./InitState.js'),
            MultiCommentState = require('./MultiCommentState.js');

        var StoreAction = require('../Actions/StoreAction.js'),
            ChangeStateAction = require('../Actions/ChangeStateAction.js');

        var self = this;

        if (c === '/') {
            self._stringsParser._callbacks.onCommentFound(self._key);
            callback(null, new ChangeStateAction(new InitState(self._stringsParser)));
        } else {
            self._key += self._c;

            new StoreAction(c, self).perform(self._stringsParser, function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, new ChangeStateAction(new MultiCommentState(self._stringsParser, self._key)));
                }
            });
        }
    }
};

module.exports = WaitForSlashState;
