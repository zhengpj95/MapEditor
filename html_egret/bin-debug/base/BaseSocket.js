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
var BaseSocket = (function (_super) {
    __extends(BaseSocket, _super);
    function BaseSocket() {
        return _super.call(this) || this;
    }
    BaseSocket.prototype.connect = function () {
        this.ws = new egret.WebSocket();
        this.ws.type = egret.WebSocket.TYPE_STRING;
        this.ws.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocektReceive, this);
        this.ws.addEventListener(egret.Event.CONNECT, this.onSocketConnect, this);
        this.ws.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.ws.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        this.ws.connect(BaseSocket.Host, BaseSocket.Port);
        console.log("Websocket: " + BaseSocket.Host + ":" + BaseSocket.Port);
    };
    BaseSocket.prototype.onSocektReceive = function () {
        var data = JSON.parse(this.ws.readUTF());
        console.log("socket \u63A5\u6536\u6570\u636E --- ", data);
        if (data && data['msgId'] && data['msgId'] == 1001) {
            MessageManager.ins().triggerEventListener(data['msgId'] + '', data);
        }
    };
    BaseSocket.prototype.onSocketConnect = function () {
        console.log("socket \u8FDE\u63A5\u6210\u529F");
        var obj = {
            name: 'zpj',
            age: 22
        };
        this.send(obj);
    };
    BaseSocket.prototype.onSocketClose = function () {
        console.error("socket \u8FDE\u63A5\u5173\u95ED");
    };
    BaseSocket.prototype.onSocketError = function () {
        console.error("socket \u8FDE\u63A5\u9519\u8BEF");
    };
    BaseSocket.prototype.send = function (data) {
        console.log('send data : ', typeof data);
        this.ws.writeUTF(JSON.stringify(data));
    };
    BaseSocket.Host = "127.0.0.1";
    BaseSocket.Port = 8082;
    return BaseSocket;
}(SingletonClass));
__reflect(BaseSocket.prototype, "BaseSocket");
//# sourceMappingURL=BaseSocket.js.map