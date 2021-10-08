package;

import js.Syntax;
import js.html.DivElement;
import js.lib.Promise;
import js.Browser.*;
import Neutralino;
import Neutralino.NeutralinoComputerRAMResult;
import hxasync.AsyncMacroUtils.*;

class Main {
	public function new() {
		trace('Main');

		Syntax.code("Neutralino.init();");

		var info:DivElement = cast document.getElementById("info");
		info.innerHTML = NeutralinoGlobal.NL_TEST;

		var usage = Neutralino.computer.getRamUsage().then(function(res:NeutralinoComputerRAMResult) {
			trace("Your ram size: " + (res.ram.total / 1000000) + "GB");
			trace("x");
			this.foo(res);

			// var info:DivElement = cast document.getElementById("info");
			// var info:DivElement = cast document.getElementById("info");
			// info.innerHTML = ("Your ram size: " + (res.ram.total / 1000000) + "GB");
		});
		// info.innerHTML = '$usage';

		// await(Neutralino.filesystem.createDirectory({
		// 	path: './hxnewDirectory',
		// }));
		Neutralino.filesystem.createDirectory({
			path: './hxnewDirectory',
		});

		setupKey();
		Neutralino.window.focus();
		Neutralino.events.on("windowClose", onWindowClose);

		// await(Neutralino.window.focus());

		// Syntax.code('await Neutralino.window.focus();');
	}

	function onWindowClose() {
		Neutralino.app.exit();
	}

	function setupKey() {
		// setup listen to keys
		window.onkeydown = onKeyDown;
		// window.onkeyup = onKeyUp;
	}

	// function onKeyUp(e:js.html.KeyboardEvent) {
	// 	// trace(e);
	// 	if (e.key == "Meta") {
	// 		hightlightBtn(false);
	// 	}
	// }

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
		trace('foo');

		var ram:DivElement = document.createDivElement();
		ram.innerHTML = '<code>"Your ram size: ${(res.ram.total / 1000000)} GB</code>';
		document.body.appendChild(ram);
	}

	static public function main() {
		var app = new Main();
	}
}
