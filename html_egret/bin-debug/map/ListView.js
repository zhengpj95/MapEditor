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
var ListView = (function (_super) {
    __extends(ListView, _super);
    function ListView() {
        var _this = _super.call(this) || this;
        _this.skinName = "skins.ListViewSkin";
        return _this;
    }
    ListView.prototype.initUI = function () {
        this.ins = MapProxy.ins();
        this.scroller.maxHeight = 300;
        this.mapList.dataProvider = this.mapData = new eui.ArrayCollection();
    };
    ListView.prototype.open = function () {
        this.x = 36;
        this.y = 58;
        this.mapData.replaceAll(this.ins.mapList);
        this.mapList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapList, this);
        this.mapList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
    };
    ListView.prototype.onTapList = function (e) {
        e.stopImmediatePropagation();
    };
    ListView.prototype.onClickList = function (e) {
        if (this.ins.mapId == +e.item) {
            this.close();
            return;
        }
        this.ins.mapId = +e.item;
        MessageManager.ins().triggerEventListener('postMapList', e.item);
        DisplayUtils.removeFromParent(this);
    };
    ListView.prototype.close = function () {
        DisplayUtils.removeFromParent(this);
        this.removeAllEvents();
    };
    return ListView;
}(BaseView));
__reflect(ListView.prototype, "ListView");
//# sourceMappingURL=ListView.js.map