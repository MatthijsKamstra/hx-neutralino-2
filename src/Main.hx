package;

import haxe.Json;
import js.Syntax;
import js.html.DivElement;
import js.lib.Promise;
import js.Browser.*;
import Neutralino;
import Neutralino.NeutralinoComputerRAMResult;
import Neutralino.FileReadResult;
import hxasync.AsyncMacroUtils.*;

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

		var info:DivElement = cast document.getElementById("info");
		info.innerHTML = NeutralinoGlobal.NL_TEST;

		// info.innerHTML = '$usage';

		// await(Neutralino.filesystem.createDirectory({
		// 	path: './hxnewDirectory',
		// }));
		Neutralino.filesystem.createDirectory({
			path: './hxnewDirectory',
		});

		getSettings();

		window.onkeydown = onKeyDown;
		window.onresize = onResize;
		window.focus();
		Neutralino.window.focus();
		checkFocus();

		Neutralino.events.on("windowClose", onWindowClose);

		if (document.hasFocus()) {
			checkFocus();
		}

		var usage = Neutralino.computer.getRamUsage().then(function(res:NeutralinoComputerRAMResult) {
			trace("---> Your ram size: " + (res.ram.total / 1000000) + "GB");
			this.foo(res);

			// var info:DivElement = cast document.getElementById("info");
			// var info:DivElement = cast document.getElementById("info");
			// info.innerHTML = ("Your ram size: " + (res.ram.total / 1000000) + "GB");
		});

		bar();
		trace('readfile');
		var r = Neutralino.filesystem.readFile({
			filename: './settings.json'
		}).then(function(response:FileReadResult) {
			trace('----> Content: ${response.data}');
			this.bar();
		});
		trace(r);
		trace('/readfile'); // await(Neutralino.window.focus());

		// Syntax.code('await Neutralino.window.focus();');
	}

	function bar() {
		trace('>>>>>>>>>>>> bar');
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

	@async function getSettings() {
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

	function foo(res:NeutralinoComputerRAMResult) {
		trace('foozzz');

		var ram:DivElement = document.createDivElement();
		ram.innerHTML = '<code>"Your ram size: ${(res.ram.total / 1000000)} GB</code>';
		document.body.appendChild(ram);
	}

	static public function main() {
		var app = new Main();
	}
}
