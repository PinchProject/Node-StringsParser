var State = require('./State.js');

/**
 *
 * @param stringsParser
 * @constructor
 */
function SingleCommentState(stringsParser) {
    State.apply(this);

    this._stringsParser = stringsParser;
    this._key = '';
}

SingleCommentState.prototype = {
    /**
     * Character handler
     *
     * @param c
     * @param callback
     */
    handle:function handle(c, callback) {
        var InitState = require('./InitState.js');

        var ChangeStateAction = require('../Actions/ChangeStateAction.js'),
            StoreAction = require('../Actions/StoreAction.js');

        var self = this;

        if (c === '\n') {
            self._stringsParser._callbacks.onCommentFound(self._key);
            callback(null, new ChangeStateAction(new InitState(self._stringsParser)));
        } else {
            callback(null, new StoreAction(c, self));
        }
    }
};

module.exports = SingleCommentState;
