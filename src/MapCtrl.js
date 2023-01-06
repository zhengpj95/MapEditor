const fs = require("fs");
const path = require("path");

const HtmlEgret = "html_egret";

class MapCtrl {
	getMapList() {
		let mapRoot = path.join(__dirname, "../" + HtmlEgret + "/resource/map");
		let url = path.join(mapRoot);
		let result = fs.readdirSync(url) || [];
		return result;
	}

	writeMapInfo(data) {
		if (!data || !data["path"]) {
			return;
		}
		let jsonUrl = path.join(__dirname, "../" + HtmlEgret, data["path"], "info.json");
		if (!fs.existsSync(jsonUrl)) {
			console.log(`${jsonUrl} 不存在`);
			return;
		}
		// console.log(data);
		fs.writeFile(jsonUrl, JSON.stringify(data), (err) => {
			if (err) {
				console.log(`写入错误`);
			} else {
				console.log(`写入成功`);
			}
		});
	}
}

module.exports = MapCtrl;
