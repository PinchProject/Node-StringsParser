var Action = require('./Action.js');

/**
 *
 * @param state
 * @constructor
 */
function ChangeStateAction(state) {
    Action.apply(this);

    this._state = state;
}

ChangeStateAction.prototype = {
    /**
     * Set a new state for the parser
     *
     * @param stringsParser
     * @param callback
     */
    perform:function perform(stringsParser, callback) {
        var self = this;

        stringsParser._setState(self._state);

        callback();
    }
};

module.exports = ChangeStateAction;
