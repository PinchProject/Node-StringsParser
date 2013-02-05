/**
 *
 * @param string
 * @param callbacks
 * @constructor
 */
function StringsParser(string, callbacks) {
    this._strings = string || null;
    this._callbacks = callbacks || null;
    this._done = false;
    this._running = true;
    this._currentState = null;
}

StringsParser.prototype = {
    /**
     * Check if the parser can run
     */
    process:function process() {
        var self = this;

        if (self._done) {
            self._handleError("Attempted to parse string after parsing already done");
        }

        if (self._running) {
            self._parse();
        }
    },
    /**
     * Run the parsing
     *
     * @private
     */
    _parse:function _parse() {
        var async = require('async');

        var InitState = require('./States/InitState.js');

        var self = this;

        self._setState(new InitState(self));

        self._strings = self._strings.split('');

        async.forEachSeries(self._strings, function (c, callback) {
            self._currentState.handle(c, function (err, action) {
                if (err) {
                    callback(err);
                } else {
                    action.perform(self, function (err) {
                        if (err) {
                            callback(err);
                        } else {
                            callback();
                        }
                    });
                }
            });
        }, function (err) {
            if (err) {
                self._handleError(err);
            } else {
                self._done = true;
                self._callbacks.onEnd();
            }
        });
    },
    /**
     * Set a new state for the parser
     *
     * @param state
     * @private
     */
    _setState:function _setState(state) {
        var self = this;
        self._currentState = state;
    },
    /**
     * Error handler
     *
     * @param msg
     * @private
     */
    _handleError:function _handleError(msg) {
        var self = this,
            err = new Error(msg);

        if (self._callbacks.onerror) {
            self._callbacks.onerror(err);
        } else {
            throw err;
        }
    },
    /**
     * Reset variables to re-run the parser
     *
     * @private
     */
    _reset:function _reset() {
        var self = this;

        self._currentState = null;
        self._done = false;
    }
};

module.exports = StringsParser;
