// window.addEventListener("DOMContentLoaded", () => {
// 	const replaceText = (selector, text) => {
// 		const element = document.getElementById(selector);
// 		if (element) element.innerText = text;
// 	};

// 	for (const type of ["chrome", "node", "electron"]) {
// 		replaceText(`${type}-version`, process.versions[type]);
// 	}
// });

const path = require("path");
const fs = require("fs");

const MapCtrl = require("./MapCtrl.js");
window.MapCtrl = new MapCtrl();
