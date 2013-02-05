/**
 *
 * @constructor
 */
function State() {
}

State.prototype = {
    /**
     * Character handler
     *
     * @param c
     * @param callback
     */
    handle:function handle(c, callback) {
        throw new Error("This method must be overwritten!");
    }
};

module.exports = State;
