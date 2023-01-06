var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SingletonClass = (function () {
    function SingletonClass() {
    }
    /**
     * 获取实例
     */
    SingletonClass.ins = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var Class = this;
        if (!Class._instance) {
            Class._instance = new (Class.bind.apply(Class, [void 0].concat(param)))();
        }
        return Class._instance;
    };
    return SingletonClass;
}());
__reflect(SingletonClass.prototype, "SingletonClass");
//# sourceMappingURL=SingletonClass.js.map