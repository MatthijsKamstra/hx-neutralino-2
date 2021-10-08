(function ($global) { "use strict";
class Main {
	constructor() {
		console.log("src/Main.hx:16:","Main");
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			console.log("src/Main.hx:19:","VanillaJs DOM ready");
			_gthis.init();
		});
	}
	init() {
		Neutralino.init();
		window.document.getElementById("info").innerHTML = window.NL_TEST;
		Neutralino.filesystem.createDirectory({ path : "./hxnewDirectory"});
		this.getSettings();
		window.onkeydown = $bind(this,this.onKeyDown);
		window.onresize = $bind(this,this.onResize);
		window.focus();
		Neutralino.window.focus();
		this.checkFocus();
		Neutralino.events.on("windowClose",$bind(this,this.onWindowClose));
		if(window.document.hasFocus()) {
			this.checkFocus();
		}
		let _gthis = this;
		Neutralino.computer.getRamUsage().then(function(res) {
			console.log("src/Main.hx:54:","---> Your ram size: " + res.ram.total / 1000000 + "GB");
			_gthis.foo(res);
		});
		this.bar();
		console.log("src/Main.hx:63:","readfile");
		console.log("src/Main.hx:70:",Neutralino.filesystem.readFile({ filename : "./settings.json"}).then(function(response) {
			console.log("src/Main.hx:67:","----> Content: " + response.data);
			_gthis.bar();
		}));
		console.log("src/Main.hx:71:","/readfile");
	}
	bar() {
		console.log("src/Main.hx:77:",">>>>>>>>>>>> bar");
	}
	checkFocus() {
		console.log("src/Main.hx:81:","checkFocus");
		let div = window.document.createElement("div");
		div.innerHTML = "<code>focus: " + Std.string(window.document.hasFocus()) + "</code>";
		window.document.body.appendChild(div);
	}
	onWindowClose() {
		Neutralino.app.exit();
	}
	onResize(e) {
		let json = { width : window.innerWidth, height : window.innerHeight};
		Neutralino.filesystem.writeFile({ fileName : "./settings.json", data : JSON.stringify(json)});
	}
	async getSettings() {
		console.log("src/Main.hx:112:","getsettings");
		let response = await Neutralino.filesystem.readFile({ filename : "./settings.json"});
		$global.console.log("Content: " + response.data);
		console.log("src/Main.hx:117:","/getsettings");
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
	foo(res) {
		console.log("src/Main.hx:164:","foozzz");
		let ram = window.document.createElement("div");
		ram.innerHTML = "<code>\"Your ram size: " + res.ram.total / 1000000 + " GB</code>";
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
}
js_Boot.__toStr = ({ }).toString;
Main.__meta__ = { fields : { getSettings : { async : null}}};
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
