//* You can run this file to test your code.

const Label = new mp.core.Label("texttexttexttexttexttext", new mp.Vector3(-431.88, 1146.86, 327), {
    los: false,
    font: 1,
    drawDistance: 100,
}, {
    key: 0x42,
    coords: {x: -431.88, y: 1146.86, z: 327, width: 5, height: 5, dimension: 0},
    callback: () => {
        console.log("Pulsooow");
    }
})

mp.events.addCommand('TestLabel', player => {
    Label.draw()
    player.position =  new mp.Vector3(-431.88, 1146.86, 327)
});