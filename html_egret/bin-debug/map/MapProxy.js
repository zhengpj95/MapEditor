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
 * 地图
 */
var MapProxy = (function (_super) {
    __extends(MapProxy, _super);
    function MapProxy() {
        var _this = _super.call(this) || this;
        _this.mapId = 10020;
        _this.mapData = null;
        _this.mapUrl = "";
        _this.brush = 0; //笔刷
        _this.mapList = [];
        MessageManager.ins().addEventListener(1001 + "", _this.postMapList, _this);
        return _this;
    }
    MapProxy.prototype.saveMapInfo = function () {
        console.log(this.mapData);
        // 保持信息 todo
        var mapCtrl = window["MapCtrl"];
        if (mapCtrl && mapCtrl["writeMapInfo"]) {
            mapCtrl["writeMapInfo"](this.mapData);
        }
    };
    MapProxy.prototype.getMapList = function () {
        var mapCtrl = window["MapCtrl"];
        if (mapCtrl && mapCtrl["getMapList"]) {
            var data = mapCtrl["getMapList"]();
            console.log("加载地图列表：", data);
            this.postMapList({
                msgId: 1001,
                data: data,
            });
        }
    };
    MapProxy.prototype.postMapList = function (msg) {
        if (!msg) {
            return;
        }
        this.mapList = msg["data"];
        this.mapId = +this.mapList[0];
        MessageManager.ins().triggerEventListener("postMapList", this.mapList[0]);
    };
    return MapProxy;
}(BaseProxy));
__reflect(MapProxy.prototype, "MapProxy");
var MapData = (function () {
    function MapData() {
        this.width = 0;
        this.heigh = 0;
        this.cellWidth = 0;
        this.cellHeigh = 0;
        this.sliceWidth = 0;
        this.sliceHeight = 0;
        this.blocks = [];
        this.path = "";
        this.rows = 0;
        this.cols = 0;
    }
    return MapData;
}());
__reflect(MapData.prototype, "MapData");
//# sourceMappingURL=MapProxy.js.map