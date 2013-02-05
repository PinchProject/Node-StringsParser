/**
 *
 * @constructor
 */
function IgnoreAction() {
}

IgnoreAction.prototype = {
    /**
     * Ignore a character
     *
     * @param stringsParser
     * @param callback
     */
    perform:function perform(stringsParser, callback) {
        callback();
    }
};

module.exports = IgnoreAction;
