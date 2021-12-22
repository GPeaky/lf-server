const browser = mp.browsers.new('package://Login/build/index.html');
browser.active = true;

setTimeout(() => {
    mp.gui.chat.show(false)
    mp.gui.chat.activate(false)
}, 500);

mp.keys.bind(0x7B, true, () => {
    let state = !mp.gui.cursor.visible
    mp.gui.cursor.show(state, state)
})