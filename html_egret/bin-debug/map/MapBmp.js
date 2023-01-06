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
var MapBmp = (function (_super) {
    __extends(MapBmp, _super);
    function MapBmp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cellUrl = "";
        return _this;
    }
    MapBmp.prototype.setIdx = function (row, col, mapid) {
        var _this = this;
        var url = "./resource/map/" + mapid + "/" + row + "_" + col + ".jpg";
        if (this.cellUrl == url) {
            return;
        }
        this.cellUrl = url;
        var loader = new egret.ImageLoader();
        loader.crossOrigin = "anonymous";
        loader.addEventListener(egret.Event.COMPLETE, function (e) {
            var loader = e.currentTarget;
            var data = loader.data;
            // console.log(`loader.data -- `, data);
            var texture = new egret.Texture();
            texture._setBitmapData(data);
            _this.onLoaded(texture, url);
        }, this);
        loader.load(url);
    };
    MapBmp.prototype.onLoaded = function (data, url) {
        if (this.cellUrl != url) {
            return;
        }
        this.texture = data;
    };
    return MapBmp;
}(egret.Bitmap));
__reflect(MapBmp.prototype, "MapBmp");
//# sourceMappingURL=MapBmp.js.map