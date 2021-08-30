"use strict";
/**
 *
 * Signaller is a Helper module for Redux.
 *
 * Aim of this helper is to remove store and reducer file garbage and adopt them into low code environment.
 * With Signaller module, your each components will broadcast a signal around the application then if a component needs that, will grab that data.
 *
 * Think it as a bus topology, any broadcasted signals in the bus will be only retrieved by relevant nodes.
 *
 * Dont forget to install "redux, react-redux"
 *
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = exports.RDBroadcast = void 0;
// 3th party
var react_1 = __importDefault(require("react"));
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
Object.defineProperty(exports, "Provider", { enumerable: true, get: function () { return react_redux_1.Provider; } });
var RDBroadcast = /** @class */ (function () {
    function RDBroadcast() {
        var _this = this;
        this.reducer = function (state, action) {
            if (state === void 0) { state = _this.initialState; }
            var data = {}; // any data for your signal
            try {
                data[action.type] = action.payload;
                state = __assign(__assign({}, state), data);
            }
            catch (error) {
                // prevents uninitialized key errors, we know what the heck is the error!!!
            }
            return state;
        };
        /**
         *
         * Public Methods
         *
        */
        this.setInitialState = function (obj) {
            _this.initialState = obj;
        };
        /**
         *
         * @param devtoolEnabled This parameter currently not working, we can modify it for furthere use.
         * @param middlewares Define as you want as middlewares for your store.
         */
        this.createStore = function (devtoolEnabled) {
            var middlewares = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                middlewares[_i - 1] = arguments[_i];
            }
            if (devtoolEnabled)
                console.log("[+] Redux devtool enabled, but there are no devtool plugin!");
            _this.store = redux_1.createStore(_this.reducer, redux_1.applyMiddleware.apply(void 0, middlewares));
        };
        /**
         *
         * @param signalName This is the "type" of dispatch in redux
         * @param payload This is th "payload" of dispatch in redux
         */
        this.broadcast = function (signalName, payload) {
            _this.store ? _this.store.dispatch({ type: signalName, payload: payload }) : console.error('[-] Store is not ready.');
        };
        this.storeChecker = function (callback, timer) {
            var storeChecker = setInterval(function () {
                if (_this.store) {
                    callback(true);
                    clearInterval(storeChecker);
                }
                else {
                    console.log("[!] waiting for store...");
                }
            }, timer);
        };
        this.hoc = function (Wrapper, WrapperStyle, MainComponent) {
            var styleObject = WrapperStyle ? WrapperStyle : {};
            var Base = /** @class */ (function (_super) {
                __extends(Base, _super);
                function Base() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Base.prototype.render = function () {
                    return react_1.default.createElement(Wrapper, styleObject, react_1.default.createElement(MainComponent, this.props));
                };
                return Base;
            }(react_1.default.Component));
            return react_redux_1.connect(function (state) { return state; }, null)(Base);
        };
        this.Dhoc = function (Wrapper, WrapperStyle) {
            var styleObject = WrapperStyle ? WrapperStyle : {};
            return function (MainComponent) {
                var Base = /** @class */ (function (_super) {
                    __extends(Base, _super);
                    function Base() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    Base.prototype.render = function () {
                        return react_1.default.createElement(Wrapper, styleObject, react_1.default.createElement(MainComponent, this.props));
                    };
                    return Base;
                }(react_1.default.Component));
                return react_redux_1.connect(function (state) { return state; }, null)(Base);
            };
        };
    }
    return RDBroadcast;
}());
exports.RDBroadcast = RDBroadcast;
