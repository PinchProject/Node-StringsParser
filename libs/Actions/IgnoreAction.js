function IgnoreAction() {
}

IgnoreAction.prototype = {
    perform:function perform(stringsParser, callback) {
        callback();
    }
};

module.exports = IgnoreAction;
