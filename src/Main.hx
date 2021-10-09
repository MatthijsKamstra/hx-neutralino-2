package;

import js.html.Event;
import haxe.Json;
import js.Syntax;
import js.html.DivElement;
import js.lib.Promise;
import js.Browser.*;
import Neutralino;
import Neutralino.NeutralinoComputerRAMResult;
import Neutralino.FileReadResult;
import hxasync.AsyncMacroUtils.*;
import haxe.Json as JSON;

@:build(hxasync.AsyncMacro.build())
class Main {
	public function new() {
		trace('Main');

		document.addEventListener("DOMContentLoaded", function(event) {
			trace("VanillaJs DOM ready");
			init();
		});
	}

	function init() {
		Syntax.code("Neutralino.init();");

		window.onkeydown = onKeyDown;
		window.onresize = onResize;
		window.focus();
		Neutralino.window.focus();
		checkFocus();

		Neutralino.events.on("windowClose", onWindowClose);
		Neutralino.events.on('trayMenuItemClicked', onTrayMenuItemClicked);

		log('log, ${Date.now()}');
		warn('warn, ${Date.now()}');
		error('error, ${Date.now()}');

		setTray();
		showInfo();

		setButtons();

		createFile();
		readFile();
		deleteFile();
		createFolder();
		readFolder();
		deleteFolder();
		setSettings();
		getSettings();
		//
		getSettingZ();
		sayhello();
		showDialog();
	}

	@async function showDialog() {
		var response = @await Neutralino.os.showDialogOpen({
			title: 'Select a folder',
			isDirectoryMode: true
		});
		console.log('You\'ve selected: ${untyped response.selectedEntry}');
	}

	@async function sayhello() {
		// var k = NeutralinoGlobal.NL_OS == 'Windows' ? 'USERNAME' : 'USER';
		// var response = '';
		// warn(k);
		// trace(k);
		// try {
		// 	response =  @await Neutralino.os.getEnvar({key: k}).value;
		// 	trace(response);
		// } catch (e) {
		// 	console.error(e);
		// }
		// error(k);
		// document.getElementById('name').innerText = 'Hello ${response}';

		var response = @await Neutralino.os.getEnvar({
			key: 'USER'
		});
		console.log('USER = ${Json.stringify(response)}');
		console.log('USER = ${untyped response.value}');
		document.getElementById('name').innerText = 'Hello ${untyped response.value}';
	}

	function setButtons() {
		trace('setButtons');
		var btn = document.getElementById('js-btn-notification');

		btn.onclick = @async (e:Event) -> {
			e.preventDefault();
			trace('click');
			@await Neutralino.os.showNotification({
				summary: 'Hello world',
				body: 'It works!. Have a nice day'
			});
		}
	}

	function setTray() {
		trace('setTray');
		if (NeutralinoGlobal.NL_MODE != "window") {
			console.log("INFO: Tray menu is only available in the window mode.");
			return;
		}

		var tray = {
			icon: "/resources/icons/trayIcon.png",
			menuItems: [
				{id: "VERSION", text: "Get version"},
				{id: "SEP", text: "-"},
				{id: "QUIT", text: "Quit"}
			]
		};
		Neutralino.os.setTray(tray);
	};

	function showInfo() {
		trace('showInfo');

		document.getElementById('info')
			.innerHTML = '<div class="border">
            ${NeutralinoGlobal.NL_APPID} is running on port ${NeutralinoGlobal.NL_PORT}  inside ${NeutralinoGlobal.NL_OS}
            <br/><br/>
            <span>server: v${NeutralinoGlobal.NL_VERSION} . client: v${NeutralinoGlobal.NL_CVERSION}</span>
            </div>';
	};

	@async function setSettings() {
		trace('setSettings');
		@await
		Neutralino.storage.putData({
			bucket: 'userDetails',
			data: JSON.stringify({
				username: 'TestValue'
			})
		});
	}

	@async function getSettings() {
		trace('getSettings');
		var response = @await Neutralino.storage.getData({
			bucket: 'userDetails'
		});
		console.log('getSettings > Data: ${untyped response.data}');
	}

	@async function log(msg) {
		@await
		Neutralino.debug.log({
			type: 'INFO',
			message: msg
		});
	}

	@async function warn(msg) {
		@await
		Neutralino.debug.log({
			type: 'WARN',
			message: msg
		});
	}

	@async function error(msg) {
		@await
		Neutralino.debug.log({
			type: 'ERROR',
			message: msg
		});
	}

	@async function createFolder() {
		trace('createFolder');
		@await Neutralino.filesystem.createDirectory({
			path: './hxnewDirectory',
		});
	}

	@async function deleteFolder() {
		trace('deleteFolder');
		@await Neutralino.filesystem.removeDirectory({
			path: './deleteFolder',
		});
	}

	@async function readFolder() {
		trace('readFolder');
		var response = @await
			Neutralino.filesystem.readDirectory({
				path: NeutralinoGlobal.NL_PATH
			});
		console.log('Content: ', untyped response.entries);
	}

	@async function deleteFile() {
		trace('deleteFile');
		var response = @await Neutralino.filesystem.removeFile({
			filename: './delete.txt'
		});
		console.log('${response}');
	}

	@async function createFile() {
		trace('createFile');
		@await
		Neutralino.filesystem.writeFile({
			fileName: './myFile.txt',
			data: 'Sample content: ${Date.now().getTime()}'
		});
	}

	@async function readFile() {
		trace('readFile');
		var response = @await Neutralino.filesystem.readFile({
			filename: './myFile.txt'
		});
		console.log(Json.stringify(response));
		console.log('Content: ${untyped response.data}');
	}

	function checkFocus() {
		trace('checkFocus');
		var div:DivElement = document.createDivElement();
		div.innerHTML = '<code>focus: ${document.hasFocus()}</code>';
		document.body.appendChild(div);
	}

	function onWindowClose() {
		Neutralino.app.exit();
	}

	function onTrayMenuItemClicked(event) {
		console.log('Event data: ${event.detail}');
		switch (untyped event.detail.id) {
			case "VERSION":
				Neutralino.os.showMessageBox({
					type: NeutralinoMessageType.INFO,
					title: "Version information",
					content: 'Neutralinojs server: v${NeutralinoGlobal.NL_VERSION} | Neutralinojs client: v${NeutralinoGlobal.NL_CVERSION}'
				});

			case "QUIT":
				Neutralino.app.exit();
		}
	}

	// function onKeyUp(e:js.html.KeyboardEvent) {
	// 	// trace(e);
	// 	if (e.key == "Meta") {
	// 		hightlightBtn(false);
	// 	}
	// }

	function onResize(e) {
		// trace(Json.stringify(e));

		var json = {
			width: window.innerWidth,
			height: window.innerHeight,
		};
		Neutralino.filesystem.writeFile({
			fileName: './settings.json',
			data: Json.stringify(json)
		});
	}

	@async function getSettingZ() {
		trace('getsettings');
		var response = @await Neutralino.filesystem.readFile({
			filename: './settings.json'
		});
		console.log('Content: ${untyped (response.data)}');
		trace('/getsettings');
	};

	function onKeyDown(e:js.html.KeyboardEvent) {
		console.log(e);
		console.log('ctrl: ' + e.ctrlKey);
		console.log('meta: ' + e.metaKey);

		var info:DivElement = cast document.getElementById("key");
		info.innerHTML = 'ctrl: ' + e.ctrlKey + ' meta: ' + e.metaKey;

		// with command key
		if (e.metaKey == true) {
			switch (e.key) {
				case "q":
					// trace("close answer");
					Neutralino.app.exit();

				default:
					// trace("case '" + e.key + "': trace ('" + e.key + "');");
			}
		}
		if (e.metaKey == false) {
			switch (e.key) {
				case "ArrowUp":
				// trace("close answer");
				// onCollapseQ();
				case "ArrowDown":
				// trace("open answer");
				// onOpenQ();
				// case "ArrowLeft":
				// 	trace("choose good");
				// case "ArrowRight":
				// 	trace("choose wrong");
				default:
					// trace("case '" + e.key + "': trace ('" + e.key + "');");
			}
		}

		// if (e.metaKey == true && e.key == 'r') {
		// 	console.log('[cmd + r] = reload page');
		// 	// reload
		// 	location.reload();
		// }
	}

	@async function outputRamUsage() {
		trace('outputRamUsagezzz');
		var usage = @await Neutralino.computer.getRamUsage().then(function(res:NeutralinoComputerRAMResult) {
			trace("---> Your ram size: " + (res.ram.total / 1000000) + "GB");

			// var info:DivElement = cast document.getElementById("info");
			// var info:DivElement = cast document.getElementById("info");
			// info.innerHTML = ("Your ram size: " + (res.ram.total / 1000000) + "GB");
		});

		var ram:DivElement = document.createDivElement();
		ram.innerHTML = '<code>Your ram size: ${(untyped usage.res.ram.total / 1000000)} GB</code>';
		document.body.appendChild(ram);
	}

	static public function main() {
		var app = new Main();
	}
}
