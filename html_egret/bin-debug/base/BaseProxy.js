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
var BaseProxy = (function (_super) {
    __extends(BaseProxy, _super);
    function BaseProxy() {
        return _super.call(this) || this;
    }
    BaseProxy.prototype.send = function (data) {
        BaseSocket.ins().send(data);
    };
    return BaseProxy;
}(BaseSocket));
__reflect(BaseProxy.prototype, "BaseProxy");
//# sourceMappingURL=BaseProxy.js.map