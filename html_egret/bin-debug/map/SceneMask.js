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
var SceneMask = (function (_super) {
    __extends(SceneMask, _super);
    function SceneMask() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        return _this;
    }
    SceneMask.prototype.updateMask = function () {
        // console.log(`------------------updateMask`);
        var data = MapProxy.ins().mapData;
        if (!data) {
            return;
        }
        this.graphics.clear();
        var rows = Math.floor(data.height / data.cellHeight);
        var cols = Math.floor(data.width / data.cellWidth);
        var initX = 10;
        var initY = 10;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                var isBlock = this.getCellState(i, j) == 0;
                var color = isBlock ? 0xff0000 : 0xffffff;
                var alpha = isBlock ? 0.5 : 0;
                this.graphics.beginFill(color, alpha);
                this.graphics.drawRect(initX + j * data.cellWidth + 1, initY + i * data.cellHeight + 1, data.cellWidth - 2, data.cellHeight - 2);
            }
        }
    };
    SceneMask.prototype.getCellState = function (row, col) {
        var blocks = MapProxy.ins().mapData.blocks;
        return blocks[row][col];
    };
    return SceneMask;
}(egret.Sprite));
__reflect(SceneMask.prototype, "SceneMask");
//# sourceMappingURL=SceneMask.js.map