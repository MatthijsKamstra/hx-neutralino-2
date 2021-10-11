# hx-neutralino-2

I have tried neutralino before in combination with Haxe.

It looks like I was too early to try it... but lets revisit!

- https://neutralino.js.org/
- https://haxe.org/

I transpile haxe to javascript

Tested on osx

## Neutralino

first install

- resource: https://neutralino.js.org/docs/getting-started/your-first-neutralinojs-app

install globally and create a neutralino app.

```
npm install -g @neutralinojs/neu
neu create myapp
cd myapp
neu run
```

Get repo update (get correct binaries)

```
cd myapp
neu update
neu run
```

## libs

Haxe libs I used are:

- [https://github.com/Orange-hx/hxneu] haxe externs for neutralino
- [https://github.com/botsman/hxasync] macro for `async` and `await` (JavaScript)

**GitHub - Orange-hx/hxneu: Haxe externs for Neutralino.js!**

[https://github.com/Orange-hx/hxneu]

1. install `haxelib install hxneu`
2. add to build.hxml `-lib hxneu`
3. add to class `import Neutralino.*;`

**GitHub - botsman/hxasync: This library allows you to add "async" and "await" keywords in Python and JavaScript code almost the same way you would do it in the native code.**

[https://github.com/botsman/hxasync]

1. install `haxelib install hxasync`
2. add to build.hxml `-lib hxasync`
