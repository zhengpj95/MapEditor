/**
 * 地图
 */
class MapProxy extends BaseProxy {
	public mapId: number = 10020;
	public mapData: IMapData = null;
	public mapUrl: string = "";
	public brush: number = 0; //笔刷
	public mapList: any[] = [];

	public static ins: () => MapProxy;

	public constructor() {
		super();
		MessageManager.ins().addEventListener(1001 + "", this.postMapList, this);
	}

	public saveMapInfo(): void {
		console.log(this.mapData);
		// 保持信息 todo
		let mapCtrl = window["MapCtrl"];
		if (mapCtrl && mapCtrl["writeMapInfo"]) {
			mapCtrl["writeMapInfo"](this.mapData);
		}
	}

	public getMapList(): void {
		let mapCtrl = window["MapCtrl"];
		if (mapCtrl && mapCtrl["getMapList"]) {
			let data = mapCtrl["getMapList"]();
			console.log("加载地图列表：", data);
			this.postMapList({
				msgId: 1001,
				data,
			});
		}
	}

	public postMapList(msg: any): void {
		if (!msg) {
			return;
		}
		this.mapList = msg["data"];
		this.mapId = +this.mapList[0];
		MessageManager.ins().triggerEventListener("postMapList", this.mapList[0]);
	}
}

class MapData {
	public width = 0;
	public heigh = 0;
	public cellWidth = 0;
	public cellHeigh = 0;
	public sliceWidth = 0;
	public sliceHeight = 0;
	public blocks: number[] = [];
	public path: string = "";

	public rows: number = 0;
	public cols: number = 0;
}

interface IMapData {
	blocks: number[];
	cellHeight: number;
	cellWidth: number;
	height: number;
	width: number;
	sliceWidth: number;
	sliceHeight: number;
	path: string;
}
