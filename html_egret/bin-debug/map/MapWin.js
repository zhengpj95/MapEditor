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
var MapWin = (function (_super) {
    __extends(MapWin, _super);
    function MapWin() {
        var _this = _super.call(this) || this;
        _this.toggleState = true; //true表示障碍
        _this.name = "map_win";
        var rect = new eui.Rect();
        rect.fillColor = 0x009900;
        rect.alpha = 0.5;
        rect.percentHeight = 100;
        rect.percentWidth = 100;
        rect.visible = true;
        _this.rect = rect;
        _this.addChild(rect);
        _this.topBarView = new TopBarView();
        _this.addChild(_this.topBarView);
        _this.ins = MapProxy.ins();
        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startToLoadMap, this);
        _this.addEventListener("OnHSliderChange", _this.onHSliderChange, _this);
        _this.addEventListener("OnSwitchToggle", _this.onSwitchToggle, _this);
        _this.addEventListener("OnMapSave", _this.onMapSave, _this);
        _this.addEventListener("onClickCheckBox", _this.onShowMask, _this);
        MessageManager.ins().addEventListener("postMapList", _this.startToLoadMap, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
        _this.sceneMap = new SceneMap();
        _this.sceneMap.y = 140;
        _this.sceneMap.x = 0;
        _this.addChild(_this.sceneMap);
        _this.sceneMask = new SceneMask();
        _this.sceneMask.y = 140;
        _this.sceneMask.x = 0;
        _this.addChild(_this.sceneMask);
        return _this;
    }
    /* 加载地图 */
    MapWin.prototype.startToLoadMap = function () {
        var _this = this;
        console.log("start to load map......");
        this.sceneMap.removeChildren();
        var mapId = this.ins.mapId;
        var mapUrl = "resource/map/" + mapId + "/";
        var infoJsonUrl = mapUrl + "info.json";
        var l = RES.getVirtualUrl(infoJsonUrl);
        RES.getResByUrl(l, function (data, url) {
            _this.loadMapSuccess(data, url);
        }, this, "json");
    };
    /* 加载地图成功 */
    MapWin.prototype.loadMapSuccess = function (data, url) {
        this.ins.mapData = data;
        this.ins.mapUrl = url;
        console.log(data, url);
        // 展示地图
        this.sceneMap.updateBmp();
        this.sceneMask.updateMask();
        // this.topBarView.loadMapSuccess();
    };
    MapWin.prototype.onHSliderChange = function (e) {
        var scale = (e.data || 1) / 100;
        this.sceneMap.scaleX = this.sceneMap.scaleY = scale;
        this.sceneMask.scaleX = this.sceneMask.scaleY = scale;
        // console.log(this.sceneMap.width * scale, this.sceneMap.height * scale, this.sceneMask.width, this.sceneMask.height);
    };
    MapWin.prototype.onSwitchToggle = function (e) {
        this.toggleState = !!e.data;
    };
    MapWin.prototype.onMapSave = function () {
        this.ins.saveMapInfo();
    };
    MapWin.prototype.onShowMask = function (e) {
        this.sceneMask.visible = !!e.data;
    };
    MapWin.prototype.updateCellStatue = function (stageX, stageY) {
        if (!this.checkPointInMap(stageX, stageY)) {
            console.log("\u70B9\u51FB\u5904\u4E0D\u5728\u5730\u56FE\u8303\u56F4\u5185");
            return;
        }
        var realPoint = this.getRealPoint(stageX, stageY);
        var mapData = this.ins.mapData;
        var row = Math.floor(realPoint.y / (mapData.cellHeight * this.sceneMask.scaleY));
        var col = Math.floor(realPoint.x / (mapData.cellWidth * this.sceneMask.scaleX));
        var brush = this.ins.brush; //笔刷
        var cellState = this.toggleState ? 0 : 1;
        var blocks = this.ins.mapData.blocks;
        for (var i = row - brush; i <= row + brush; i++) {
            for (var j = col - brush; j <= col + brush; j++) {
                if (blocks[i] == null || blocks[i][j] == null || blocks[i][j] == cellState) {
                    continue;
                }
                blocks[i][j] = cellState;
                this.sceneMask.updateMask();
            }
        }
    };
    /* 点击处是否在 map 范围内 */
    MapWin.prototype.checkPointInMap = function (pointX, pointY) {
        var map = this.sceneMap;
        var startX = map.x;
        var startY = map.y;
        var scale = map.scaleX;
        var width = map.width * scale;
        var height = map.height * scale;
        return startX <= pointX && pointX <= startX + width && startY <= pointY && pointY <= startY + height;
    };
    MapWin.prototype.getRealPoint = function (stageX, stageY) {
        var point = new egret.Point();
        point.x = stageX - 10;
        point.y = stageY - 150;
        return point;
    };
    MapWin.prototype.onTouchBegin = function (e) {
        if (!this.checkPointInMap(e.stageX, e.stageY)) {
            return;
        }
        console.log("---onTouchBegin---");
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    MapWin.prototype.onTouchMove = function (e) {
        console.log("onTouchMove --- " + e.stageX + " - " + e.stageY);
        this.updateCellStatue(e.stageX, e.stageY);
    };
    MapWin.prototype.onTouchEnd = function (e) {
        console.log("---onTouchEnd---");
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    return MapWin;
}(eui.UILayer));
__reflect(MapWin.prototype, "MapWin");
//# sourceMappingURL=MapWin.js.map