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
var TopBarView = (function (_super) {
    __extends(TopBarView, _super);
    function TopBarView() {
        var _this = _super.call(this) || this;
        _this.skinName = 'skins.TopBarSkin';
        _this.percentWidth = 100;
        return _this;
    }
    TopBarView.prototype.initUI = function () {
        this.ins = MapProxy.ins();
        this.listMap.dataProvider = this.mapData = new eui.ArrayCollection(['选择地图']);
        this.listMap.selectedIndex = 0;
        this.lbName.text = '';
    };
    TopBarView.prototype.open = function () {
        _super.prototype.open.call(this);
        this.initHSlider();
        this.showMask.selected = true;
        this.BtnSwitch.selected = true;
        this.lbRect.fillColor = 0xff0000;
        this.addEvent(egret.Event.CHANGE, this.scaleSlider, this.onHSliderChange);
        this.addEvent(egret.Event.CHANGE, this.sizeSlider, this.onSizeSliderChange);
        this.addEvent(egret.Event.CHANGE, this.BtnSwitch, this.switchToggle);
        this.addEvent(egret.TouchEvent.TOUCH_TAP, this.btnSave, this.onMapSave);
        this.addEvent(egret.TouchEvent.TOUCH_TAP, this.showMask, this.onClickCheckBox);
        this.ins.getMapList();
        MessageManager.ins().addEventListener('postMapList', this.updateMapList, this);
        this.addEvent(egret.TouchEvent.TOUCH_TAP, this.listMap, this.onSwitchMap);
    };
    TopBarView.prototype.onSwitchMap = function () {
        this.listView = new ListView();
        if (this.parent && !this.listView.parent) {
            this.parent.addChild(this.listView);
        }
        this.listView.open();
    };
    TopBarView.prototype.updateMapList = function (mapId) {
        var ary = [];
        ary.push("\u5F53\u524D\u5730\u56FE\uFF1A" + mapId);
        this.mapData.replaceAll(ary);
    };
    TopBarView.prototype.initHSlider = function () {
        this.scaleSlider.maximum = 100;
        this.scaleSlider.value = 100;
        this.scaleSlider.pendingValue = 100;
        this.lbScale.text = "\u7F29\u653E\uFF1A" + Math.floor(this.scaleSlider.pendingValue) + "%";
        this.sizeSlider.maximum = 4;
        this.sizeSlider.value = 0;
        this.sizeSlider.pendingValue = 0;
        this.lbSize.text = "\u7B14\u5237\uFF1A" + this.sizeSlider.pendingValue;
    };
    TopBarView.prototype.switchToggle = function () {
        var type = this.BtnSwitch.selected;
        this.lbRect.fillColor = type ? 0xff0000 : 0xffffff;
        this.dispatchEventWith('OnSwitchToggle', true, type, true);
    };
    TopBarView.prototype.onMapSave = function () {
        this.dispatchEventWith('OnMapSave', true);
    };
    TopBarView.prototype.loadMapSuccess = function () {
        this.lbName.text = MapProxy.ins().mapData.path;
    };
    TopBarView.prototype.onHSliderChange = function () {
        var val = Math.floor(this.scaleSlider.pendingValue);
        this.lbScale.text = "\u7F29\u653E\uFF1A" + val + "%";
        this.dispatchEventWith('OnHSliderChange', true, val, true);
    };
    TopBarView.prototype.onSizeSliderChange = function () {
        var val = Math.floor(this.sizeSlider.pendingValue);
        this.lbSize.text = "\u7B14\u5237\uFF1A" + val;
        this.ins.brush = val;
    };
    TopBarView.prototype.onClickCheckBox = function () {
        this.dispatchEventWith('onClickCheckBox', true, this.showMask.selected, true);
    };
    return TopBarView;
}(BaseView));
__reflect(TopBarView.prototype, "TopBarView");
//# sourceMappingURL=TopBarView.js.map