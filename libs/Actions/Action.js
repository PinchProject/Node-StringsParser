function Action() {
}

Action.prototype.perform = function perform(stringsParser, callback) {
    throw  new Error("This method must be overwritten!");
};

module.exports = Action;
