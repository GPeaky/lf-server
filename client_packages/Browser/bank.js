const player =  mp.players.local
const browser = mp.browsers.new('package://Cef/TestRender/index.html'); 
let currentClientCount = 0
let totalScreenshot = 0

const uploadToCEF = async (url) => {
    return new Promise(resolve => {
        browser.call('getBase64cb', url)
        mp.events.add('receiveBase64', (base64) => {
            mp.events.remove('receiveBase64')
            resolve(base64)
        })
    })
}

// currentClientCount = 0
// 60 - 5 + 5

const margin = 60
const fps = 24.66

const init = async() => {
    await mp.utils.wait(2500)
    while (true) {
        await mp.utils.wait(1000 / fps)
        mp.gui.takeScreenshot(`${currentClientCount}.jpg`, 0, 0, 0);
        if (currentClientCount < 60) {
            currentClientCount++
        } else {
            console.log('resetting')
            currentClientCount = 0
        }
        if (totalScreenshot < 7) {
            totalScreenshot++
        } else {
            if (currentClientCount >= 5) {
                await uploadToCEF(`http://screenshots/${currentClientCount - 5}.jpg`)
            } else {
                await uploadToCEF(`http://screenshots/${(margin - 4 + currentClientCount)}.jpg`)
            }
        }
    }
}

init()