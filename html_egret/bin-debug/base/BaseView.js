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
 * 基础页面类
 */
var BaseView = (function (_super) {
    __extends(BaseView, _super);
    function BaseView() {
        var _this = _super.call(this) || this;
        _this.events = [];
        // this.once(eui.UIEvent.COMPLETE, this.initUI, this);
        _this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, _this.initUI, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.open, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.close, _this);
        return _this;
    }
    /**
     * 初始化
     */
    BaseView.prototype.initUI = function () {
        true && console.log("\u6267\u884CinitUi --- \u6210\u529F\u521D\u59CB" + egret.getQualifiedClassName(this));
    };
    /**
     * 在将显示对象直接添加到舞台显示列表或将包含显示对象的子树添加至舞台显示列表中时调度。
     */
    BaseView.prototype.open = function () {
        true && console.log("\u6267\u884Copen --- \u6210\u529F\u6253\u5F00" + egret.getQualifiedClassName(this));
    };
    /**
     * 在从显示列表中直接删除显示对象或删除包含显示对象的子树时调度。
     */
    BaseView.prototype.close = function () {
        true && console.log("\u6267\u884Cclose --- \u6210\u529F\u5173\u95ED" + egret.getQualifiedClassName(this));
        this.removeAllEvents();
    };
    /**
     * 添加监听事件
     * @param eventType 事件类型
     * @param obj 事件对象
     * @param func 事件方法
     */
    BaseView.prototype.addEvent = function (eventType, obj, func) {
        var hasEventListener = true;
        for (var _i = 0, _a = this.events; _i < _a.length; _i++) {
            var item = _a[_i];
            if (eventType == item[0] && func == item[1] && obj == item[2]) {
                hasEventListener = false;
                break;
            }
        }
        if (hasEventListener) {
            obj.addEventListener(eventType, func, this);
            this.events.push([eventType, func, obj]);
        }
    };
    /**
     * 移除事件
     * @param eventType 事件类型
     * @param obj 事件对象
     * @param func 事件方法
     */
    BaseView.prototype.removeEvent = function (eventType, obj, func) {
        for (var i = 0; i < this.events.length; i++) {
            var event_1 = this.events[i];
            if (eventType == event_1[0] && func == event_1[1] && obj == event_1[2]) {
                obj.removeEventListener(eventType, func, this);
                this.events.splice(i, 1);
                break;
            }
        }
    };
    /**
     * 移除全部事件
     */
    BaseView.prototype.removeAllEvents = function () {
        for (var _i = 0, _a = this.events; _i < _a.length; _i++) {
            var event_2 = _a[_i];
            event_2[2].removeEventListener(event_2[0], event_2[1], this);
        }
        this.events.length = 0;
    };
    BaseView.prototype.setSkinPart = function (partName, instance, otherProps) {
        _super.prototype.setSkinPart.call(this, partName, instance);
        if (!instance || !this.skin[partName] || this.skin[partName] == instance) {
            return;
        }
        var parent = this.skin[partName].parent;
        var keys = BaseView.replaceKeys;
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            instance[key] = this.skin[partName][key];
        }
        if (otherProps && otherProps.length > 0) {
            for (var i = 0; i < otherProps.length; i++) {
                var key = otherProps[i];
                instance[key] = this.skin[partName][key];
            }
        }
        if (parent) {
            var pIndex = parent.getChildIndex(this.skin[partName]);
            DisplayUtils.removeFromParent(this.skin[partName]);
            parent.addChildAt(instance, pIndex);
        }
        this.skin[partName] = instance;
    };
    BaseView.replaceKeys = ['x', 'y', 'width', 'height', 'alpha', 'anchorOffsetX', 'anchorOffsetY',
        'bottom', 'top', 'left', 'right', 'scaleX', 'scaleY', 'verticalCenter', 'horizontalCenter', 'rotation',
        'skinName', 'visible', 'touchChildren', 'touchEnabled'];
    return BaseView;
}(eui.Component));
__reflect(BaseView.prototype, "BaseView", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=BaseView.js.map