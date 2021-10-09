(function ($global) { "use strict";
class Main {
	constructor() {
		console.log("src/Main.hx:17:","Main");
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			console.log("src/Main.hx:20:","VanillaJs DOM ready");
			_gthis.init();
		});
	}
	init() {
		Neutralino.init();
		window.onkeydown = $bind(this,this.onKeyDown);
		window.onresize = $bind(this,this.onResize);
		window.focus();
		Neutralino.window.focus();
		this.checkFocus();
		Neutralino.events.on("windowClose",$bind(this,this.onWindowClose));
		Neutralino.events.on("trayMenuItemClicked",$bind(this,this.onTrayMenuItemClicked));
		this.setTray();
		this.showInfo();
		this.createFile();
		this.readFile();
		this.deleteFile();
		this.createFolder();
		this.readFolder();
		this.deleteFolder();
		this.setSettings();
		this.getSettings();
		this.getSettingZ();
		this.sayhello();
		this.log("hi, " + Std.string(new Date()));
	}
	async sayhello() {
		let response = await Neutralino.os.getEnvar({ key : "USER"});
		$global.console.log("USER = " + JSON.stringify(response));
		$global.console.log("USER = " + response.value);
	}
	setTray() {
		console.log("src/Main.hx:77:","setTray");
		if(window.NL_MODE != "window") {
			$global.console.log("INFO: Tray menu is only available in the window mode.");
			return;
		}
		Neutralino.os.setTray({ icon : "/resources/icons/trayIcon.png", menuItems : [{ id : "VERSION", text : "Get version"},{ id : "SEP", text : "-"},{ id : "QUIT", text : "Quit"}]});
	}
	showInfo() {
		console.log("src/Main.hx:95:","showInfo");
		let tmp = "<div class=\"border\">\n            " + window.NL_APPID + " is running on port " + (window.NL_PORT == null ? "null" : Std.string(UInt.toFloat(window.NL_PORT))) + "  inside " + window.NL_OS + "\n            <br/><br/>\n            <span>server: v" + window.NL_VERSION + " . client: v" + window.NL_CVERSION;
		window.document.getElementById("info").innerHTML = tmp + "</span>\n            </div>";
	}
	async setSettings() {
		console.log("src/Main.hx:106:","setSettings");
		await Neutralino.storage.putData({ bucket : "userDetails", data : JSON.stringify({ username : "TestValue"})});
	}
	async getSettings() {
		console.log("src/Main.hx:117:","getSettings");
		let response = await Neutralino.storage.getData({ bucket : "userDetails"});
		$global.console.log("getSettings > Data: " + response.data);
	}
	async log(msg) {
		await Neutralino.debug.log({ type : "INFO", message : msg});
	}
	warn(msg) {
		Neutralino.debug.log({ type : "WARN", message : msg});
	}
	error(msg) {
		Neutralino.debug.log({ type : "ERROR", message : msg});
	}
	async createFolder() {
		console.log("src/Main.hx:147:","createFolder");
		await Neutralino.filesystem.createDirectory({ path : "./hxnewDirectory"});
	}
	async deleteFolder() {
		console.log("src/Main.hx:154:","deleteFolder");
		await Neutralino.filesystem.removeDirectory({ path : "./deleteFolder"});
	}
	async readFolder() {
		console.log("src/Main.hx:161:","readFolder");
		let response = await Neutralino.filesystem.readDirectory({ path : window.NL_PATH});
		$global.console.log("Content: ",response.entries);
	}
	async deleteFile() {
		console.log("src/Main.hx:170:","deleteFile");
		let response = await Neutralino.filesystem.removeFile({ filename : "./delete.txt"});
		$global.console.log("" + Std.string(response));
	}
	async createFile() {
		console.log("src/Main.hx:178:","createFile");
		await Neutralino.filesystem.writeFile({ fileName : "./myFile.txt", data : "Sample content: " + new Date().getTime()});
	}
	async readFile() {
		console.log("src/Main.hx:187:","readFile");
		let response = await Neutralino.filesystem.readFile({ filename : "./myFile.txt"});
		$global.console.log(JSON.stringify(response));
		$global.console.log("Content: " + response.data);
	}
	checkFocus() {
		console.log("src/Main.hx:196:","checkFocus");
		let div = window.document.createElement("div");
		div.innerHTML = "<code>focus: " + Std.string(window.document.hasFocus()) + "</code>";
		window.document.body.appendChild(div);
	}
	onWindowClose() {
		Neutralino.app.exit();
	}
	onTrayMenuItemClicked(event) {
		$global.console.log("Event data: " + event.detail);
		switch(event.detail.id) {
		case "QUIT":
			Neutralino.app.exit();
			break;
		case "VERSION":
			Neutralino.os.showMessageBox({ type : "INFO", title : "Version information", content : "Neutralinojs server: v" + window.NL_VERSION + " | Neutralinojs client: v" + window.NL_CVERSION});
			break;
		}
	}
	onResize(e) {
		let json = { width : window.innerWidth, height : window.innerHeight};
		Neutralino.filesystem.writeFile({ fileName : "./settings.json", data : JSON.stringify(json)});
	}
	async getSettingZ() {
		console.log("src/Main.hx:242:","getsettings");
		let response = await Neutralino.filesystem.readFile({ filename : "./settings.json"});
		$global.console.log("Content: " + response.data);
		console.log("src/Main.hx:247:","/getsettings");
	}
	onKeyDown(e) {
		$global.console.log(e);
		$global.console.log("ctrl: " + (e.ctrlKey == null ? "null" : "" + e.ctrlKey));
		$global.console.log("meta: " + (e.metaKey == null ? "null" : "" + e.metaKey));
		window.document.getElementById("key").innerHTML = "ctrl: " + (e.ctrlKey == null ? "null" : "" + e.ctrlKey) + " meta: " + (e.metaKey == null ? "null" : "" + e.metaKey);
		if(e.metaKey == true) {
			if(e.key == "q") {
				Neutralino.app.exit();
			}
		}
	}
	async outputRamUsage() {
		console.log("src/Main.hx:294:","outputRamUsagezzz");
		let usage = await Neutralino.computer.getRamUsage().then(function(res) {
			console.log("src/Main.hx:296:","---> Your ram size: " + res.ram.total / 1000000 + "GB");
		});
		let ram = window.document.createElement("div");
		ram.innerHTML = "<code>Your ram size: " + usage.res.ram.total / 1000000 + " GB</code>";
		window.document.body.appendChild(ram);
	}
	static main() {
		new Main();
	}
}
Main.__name__ = true;
Math.__name__ = true;
class Std {
	static string(s) {
		return js_Boot.__string_rec(s,"");
	}
}
Std.__name__ = true;
class UInt {
	static toFloat(this1) {
		if(this1 < 0) {
			return 4294967296.0 + this1;
		} else {
			return this1 + 0.0;
		}
	}
}
class haxe_iterators_ArrayIterator {
	constructor(array) {
		this.current = 0;
		this.array = array;
	}
	hasNext() {
		return this.current < this.array.length;
	}
	next() {
		return this.array[this.current++];
	}
}
haxe_iterators_ArrayIterator.__name__ = true;
class hxasync_NoReturn {
	static _new(value) {
		return null;
	}
}
class hxasync_AsyncMacroUtils {
}
hxasync_AsyncMacroUtils.__name__ = true;
class js_Boot {
	static __string_rec(o,s) {
		if(o == null) {
			return "null";
		}
		if(s.length >= 5) {
			return "<...>";
		}
		let t = typeof(o);
		if(t == "function" && (o.__name__ || o.__ename__)) {
			t = "object";
		}
		switch(t) {
		case "function":
			return "<function>";
		case "object":
			if(((o) instanceof Array)) {
				let str = "[";
				s += "\t";
				let _g = 0;
				let _g1 = o.length;
				while(_g < _g1) {
					let i = _g++;
					str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
				}
				str += "]";
				return str;
			}
			let tostr;
			try {
				tostr = o.toString;
			} catch( _g ) {
				return "???";
			}
			if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
				let s2 = o.toString();
				if(s2 != "[object Object]") {
					return s2;
				}
			}
			let str = "{\n";
			s += "\t";
			let hasp = o.hasOwnProperty != null;
			let k = null;
			for( k in o ) {
			if(hasp && !o.hasOwnProperty(k)) {
				continue;
			}
			if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
				continue;
			}
			if(str.length != 2) {
				str += ", \n";
			}
			str += s + k + " : " + js_Boot.__string_rec(o[k],s);
			}
			s = s.substring(1);
			str += "\n" + s + "}";
			return str;
		case "string":
			return o;
		default:
			return String(o);
		}
	}
}
js_Boot.__name__ = true;
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
{
	String.__name__ = true;
	Array.__name__ = true;
	Date.__name__ = "Date";
}
js_Boot.__toStr = ({ }).toString;
Main.__meta__ = { fields : { sayhello : { async : null}, setSettings : { async : null}, getSettings : { async : null}, log : { async : null}, createFolder : { async : null}, deleteFolder : { async : null}, readFolder : { async : null}, deleteFile : { async : null}, createFile : { async : null}, readFile : { async : null}, getSettingZ : { async : null}, outputRamUsage : { async : null}}};
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
