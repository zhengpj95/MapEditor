var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 事件监听管理器
 */
var MessageManager = (function (_super) {
    __extends(MessageManager, _super);
    function MessageManager() {
        var _this = _super.call(this) || this;
        _this.events = {};
        return _this;
    }
    MessageManager.prototype.addEventListener = function (key, func, thisObj) {
        if (!this.events[key]) {
            this.events[key] = [];
        }
        var funcList = this.events[key];
        for (var _i = 0, funcList_1 = funcList; _i < funcList_1.length; _i++) {
            var item = funcList_1[_i];
            if (item[0] == func && item[1] == thisObj) {
                return;
            }
        }
        this.events[key].push([func, thisObj]);
    };
    MessageManager.prototype.removeEventListener = function (key, func, thisObj) {
        var funcList = this.events[key];
        if (!funcList || !funcList.length) {
            return;
        }
        for (var i = 0; i < funcList.length; i++) {
            var item = funcList[i];
            if (item[0] == func && item[1] == thisObj) {
                funcList[i] = null;
                break;
            }
        }
    };
    MessageManager.prototype.triggerEventListener = function (key) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var funcList = this.events[key];
        if (!funcList || !funcList.length) {
            return;
        }
        for (var i = 0; i < funcList.length; i++) {
            var item = funcList[i];
            if (!item) {
                funcList.splice(i, 1);
                i--;
                continue;
            }
            item[0].apply(item[1], params);
        }
    };
    MessageManager.prototype.removeEventListeners = function (key) {
        var funcList = this.events[key];
        if (!funcList || !funcList.length) {
            return;
        }
        for (var _i = 0, funcList_2 = funcList; _i < funcList_2.length; _i++) {
            var fun = funcList_2[_i];
            this.removeEventListener(key, fun[0], fun[1]);
        }
        delete this.events[key];
    };
    MessageManager.prototype.removeAllEventListener = function () {
        var keys = Object.keys(this.events) || [];
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            this.removeEventListeners(key);
            delete this.events[key];
        }
        this.events = {};
    };
    /**
     * =====================================================================================
     * 下面方法，重写监听的方法体，定义唯一key
     * 监听的方法需加上【函数修饰器@post()】
     * 直接运行监听方法，就会在其内部抛出监听事件，然后待执行的方法就会被运行
     * =====================================================================================
     */
    /**
     * @param func 监听的方法
     * @param myFunc 待执行的方法
     * @param thisObj
     */
    MessageManager.prototype.observe = function (func, myFunc, thisObj) {
        if (typeof func != 'function') {
            console.log("observe \u7B2C\u4E00\u4E2A\u53C2\u6570\u4E0D\u662F Function\u3002");
            return;
        }
        var funCallName = func['funCallName'];
        if (!funCallName) {
            console.error("\u65B9\u6CD5\u4E2D\u65E0 funCallName \u5C5E\u6027\uFF01" + thisObj);
            return;
        }
        this.addEventListener(funCallName, myFunc, thisObj);
    };
    /**
     * @param func 监听的方法
     * @param myFunc 待执行的方法
     * @param thisObj
     */
    MessageManager.prototype.offObserve = function (func, myFunc, thisObj) {
        var funCallName = func['funCallName'];
        if (!funCallName) {
            console.error("\u65B9\u6CD5\u4E2D\u65E0 funCallName \u5C5E\u6027\uFF01" + thisObj);
            return;
        }
        this.removeEventListener(funCallName, myFunc, thisObj);
    };
    // /**
    //  * 监听的方法运行就会在方法体内部抛出事件，不需要显示调用此方法运行
    //  * @param func 执行监听的方法
    //  * @param params
    //  */
    // public trigger(func: Function, ...params: any[]): void {
    // 	if (typeof func != 'function') {
    // 		console.log(`trigger 参数不是 Function。`);
    // 		return;
    // 	}
    // 	let funCallName = func['funCallName'];
    // 	if (!funCallName) {
    // 		console.error(`方法中无 funCallName 属性！${func}`);
    // 		return;
    // 	}
    // 	this.triggerEventListener(funCallName, ...params);
    // }
    /**
     * @param func 监听的方法
     * @param thisObj
     * @param params 监听的方法数组
     */
    MessageManager.prototype.associate = function (func, thisObj) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        for (var i = 0; i < params.length; i++) {
            this.observe(func, params[i], thisObj);
        }
    };
    return MessageManager;
}(SingletonClass));
__reflect(MessageManager.prototype, "MessageManager");
//# sourceMappingURL=MessageManager.js.map