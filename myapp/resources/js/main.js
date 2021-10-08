let getUsername = async () => {
    const key = NL_OS == 'Windows' ? 'USERNAME' : 'USER';
    let value = '';

    try {
        value = (await Neutralino.os.getEnvar({ key })).value;
    }
    catch (e) {
        console.error(e);
    }
    document.getElementById('name').innerText = `Hello ${value}`;


    await Neutralino.filesystem.createDirectory({
        path: './newDirectory',
    });

    await Neutralino.filesystem.writeFile({
        fileName: './myFile.txt',
        data: 'Sample content'
    });


    let response = await Neutralino.filesystem.readFile({
        fileName: './myFile.txt'
    });
    console.log(`Content: ${response.data}`);

    // let rawBin = new ArrayBuffer(1);
    // let view = new Uint8Array(rawBin);
    // view[0] = 64; // Saves ASCII '@' to the binary file
    // await Neutralino.filesystem.writeBinaryFile({
    //     fileName: './myFile.bin',
    //     data: rawBin
    // });

    // let response = await Neutralino.filesystem.readBinaryFile({
    //     fileName: './myFile.bin'
    // });
    // let view = new Uint8Array(response.data);
    // console.log('Binary content: ', view);

}

Neutralino.init();
// Neutralino.events.on("windowClose", Neutralino.app.exit());
getUsername();

