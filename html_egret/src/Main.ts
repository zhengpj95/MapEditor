/**
 * 入口文件
 */
class Main extends eui.UILayer {
	protected createChildren(): void {
		super.createChildren();

		egret.lifecycle.addLifecycleListener((context) => {
			// custom lifecycle plugin
		});

		// egret.lifecycle.onPause = () => {
		// 	egret.ticker.pause();
		// };

		// egret.lifecycle.onResume = () => {
		// 	egret.ticker.resume();
		// };

		//inject the custom material parser
		//注入自定义的素材解析器
		let assetAdapter = new AssetAdapter();
		egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
		egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

		this.stage.addEventListener(egret.Event.RESIZE, this._onResize, this);

		this.runGame().catch((e) => {
			console.log(e);
		});
	}

	private _onResize(e: egret.Event): void {
		console.log(`resize --- `, this.stage.stageWidth, this.stage.stageHeight);
	}

	private async runGame() {
		await this.loadResource();
		this.createGameScene();
		// const result = await RES.getResAsync("description_json");
		// this.startAnimation(result);
		await platform.login();
		const userInfo = await platform.getUserInfo();
		console.log(userInfo);

		// BaseSocket.ins().connect();
	}

	private async loadResource() {
		try {
			const loadingView = new LoadingUI();
			this.stage.addChild(loadingView);
			await RES.loadConfig("resource/default.res.json", "resource/");
			await this.loadTheme();
			await RES.loadGroup("preload", 0, loadingView);
			this.stage.removeChild(loadingView);
		} catch (e) {
			console.error(e);
		}
	}

	private loadTheme() {
		return new Promise((resolve, reject) => {
			// load skin theme configuration file, you can manually modify the file. And replace the default skin.
			//加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
			let theme = new eui.Theme("resource/default.thm.json", this.stage);
			theme.addEventListener(
				eui.UIEvent.COMPLETE,
				() => {
					resolve(1);
				},
				this
			);
		});
	}

	private textfield: egret.TextField;
	/**
	 * 创建场景界面
	 * Create scene interface
	 */
	protected createGameScene(): void {
		let button = new eui.Button();
		button.label = "Click!";
		button.horizontalCenter = 0;
		button.verticalCenter = 0;
		this.addChild(button);
		button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
	}

	/**
	 * 点击按钮
	 * Click the button
	 */
	private onButtonClick(e: egret.TouchEvent) {
		let panel = new MapWin();
		panel.horizontalCenter = 0;
		panel.verticalCenter = 0;
		this.stage.addChild(panel);
	}
}
