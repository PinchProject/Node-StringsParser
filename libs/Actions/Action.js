/**
 *
 * @constructor
 */
function Action() {
}


Action.prototype = {
    /**
     * Perform an action
     *
     * @param stringsParser
     * @param callback
     */
    perform:function perform(stringsParser, callback) {
        throw  new Error("This method must be overwritten!");
    }
};

module.exports = Action;
