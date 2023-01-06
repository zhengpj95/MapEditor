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
var SceneMap = (function (_super) {
    __extends(SceneMap, _super);
    function SceneMap() {
        var _this = _super.call(this) || this;
        _this.bmpMap = {};
        _this.touchEnabled = true;
        return _this;
    }
    SceneMap.prototype.updateBmp = function () {
        var data = MapProxy.ins().mapData;
        if (!data) {
            return;
        }
        var rows = Math.floor(data.height / data.sliceHeight);
        var cols = Math.floor(data.width / data.sliceWidth);
        var initX = 10;
        var initY = 10;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                var cell = new MapBmp();
                cell.setIdx(i, j, MapProxy.ins().mapId);
                cell.width = data.sliceWidth;
                cell.height = data.sliceHeight;
                cell.x = initX + j * data.sliceHeight;
                cell.y = initY + i * data.sliceWidth;
                cell.name = i + "_" + j;
                this.addChild(cell);
            }
        }
    };
    return SceneMap;
}(egret.Sprite));
__reflect(SceneMap.prototype, "SceneMap");
//# sourceMappingURL=SceneMap.js.map