const loginBrowser = mp.browsers.new('package://Cef/Login/index.html');
// loginBrowser.active = false;

mp.events.add('getInfo', (email, passwd) => {
    mp.console.logInfo(`${email} ${passwd}`)
})

mp.keys.bind(0x7B, true, () => {
    const state = !mp.gui.cursor.visible
    mp.gui.cursor.show(state, state)
})
