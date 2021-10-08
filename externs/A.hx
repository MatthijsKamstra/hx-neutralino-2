package;

import js.lib.Promise;
import haxe.Http;

class A {
	// A.wait()
	public static inline function await<M, T:Promise<M>>(t:T):M {
		return js.Syntax.code("await {0}", t);
	}

	// A.sync()
	public static inline function async(f:Void->Void):Void {
		js.Syntax.code("async {0}", f)();
	}
}
