function State() {
}

State.prototype = {
    handle:function handle(c, callback) {
        throw new Error("This method must be overwritten!");
    }
};

module.exports = State;
