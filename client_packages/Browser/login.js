const loginBrowser = mp.browsers.new('package://Cef/Login/index.html');

const Camera = require('./Browser/camera');
let cam = new Camera('loginCam', new mp.Vector3(24.48141, -255.5137, 141.269), new mp.Vector3(-51.10479, -680.2582, 140.7251));

cam.startMoving(50.0)

mp.events.add({
    'getInfo': (email, passwd) => {
        mp.events.callRemote('submitLogin', email, passwd)
        mp.console.logInfo(`${email} ${passwd}`)
    },

    'login:disable': () => {
        mp.gui.cursor.show(false, false)
        loginBrowser.active = false;

        if(cam !== null) {
            cam.delete();
            cam = null;
        }
    },

    'login:enable': () => {
        mp.gui.cursor.show(true, true)
        loginBrowser.active = true;
    }
})
