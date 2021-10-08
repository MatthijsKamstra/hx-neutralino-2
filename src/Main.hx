package;

import A.*;
import js.lib.Promise;
import js.Browser.*;

class Main {
	public function new() {
		trace('Main');
		await(Neutralino.filesystem.createDirectory({
			path: './newDirectory',
		}));
	}

	static public function main() {
		var app = new Main();
	}
}
