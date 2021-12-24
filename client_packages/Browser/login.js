const loginBrowser = mp.browsers.new('package://Cef/Login/index.html');
// loginBrowser.active = false;

mp.events.add('getInfo', (email, passwd) => {
    mp.events.callRemote('submitLogin', email, passwd)
    mp.console.logInfo(`${email} ${passwd}`)
})

mp.events.add('login:disable', () => {
    mp.gui.cursor.show(false, false)
    loginBrowser.active = false;
})

mp.events.add('login:enable', () => {
    mp.gui.cursor.show(true, true)
    loginBrowser.active = true;
})