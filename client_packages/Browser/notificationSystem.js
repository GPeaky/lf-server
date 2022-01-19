const player = mp.players.local
const browser = mp.browsers.new('package://Cef/NotificationSystem/index.html')

mp.events.add('core:notify', (title, text) => browser.call('core:notify', title, text))